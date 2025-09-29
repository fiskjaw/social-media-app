"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedtoken = exports.createlogincredentials = exports.getsignatures = exports.getsignature = exports.verifytoken = exports.generatetoken = exports.TokenEnum = exports.signaturelevelenum = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = require("../../Db/models/user.model");
const error_response_1 = require("../response/error.response");
const user_repositories_1 = require("../../Db/repositories/user.repositories");
const jsonwebtoken_2 = require("jsonwebtoken");
const user_model_2 = require("../../Db/models/user.model");
const error_response_2 = require("../response/error.response");
var signaturelevelenum;
(function (signaturelevelenum) {
    signaturelevelenum["USER"] = "USER";
    signaturelevelenum["ADMIN"] = "ADMIN";
})(signaturelevelenum || (exports.signaturelevelenum = signaturelevelenum = {}));
var TokenEnum;
(function (TokenEnum) {
    TokenEnum["ACCESS"] = "ACCESS";
    TokenEnum["REFRESH"] = "REFRESH";
})(TokenEnum || (exports.TokenEnum = TokenEnum = {}));
const generatetoken = async ({ payload, Secret = process.env.ACCESS_USER_SIGNATURE, options = { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY) }, }) => {
    return await (0, jsonwebtoken_1.sign)(payload, Secret, options);
};
exports.generatetoken = generatetoken;
const verifytoken = async ({ token, Secret = process.env.ACCESS_USER_SIGNATURE, }) => {
    return (await (0, jsonwebtoken_2.verify)(token, Secret));
};
exports.verifytoken = verifytoken;
const getsignature = async (role = user_model_1.RoleEnum.USER) => {
    let signaturelevel = signaturelevelenum.USER;
    switch (role) {
        case user_model_1.RoleEnum.USER:
            signaturelevel = signaturelevelenum.USER;
            break;
        case user_model_1.RoleEnum.ADMIN:
            signaturelevel = signaturelevelenum.ADMIN;
        default:
            break;
    }
    return signaturelevel;
};
exports.getsignature = getsignature;
const getsignatures = async (signaturelevel = signaturelevelenum.USER) => {
    let signatures = { access_signature: "", refresh_signature: "" };
    switch (signaturelevel) {
        case signaturelevelenum.USER:
            signatures.access_signature = process.env.ACCESS_USER_SIGNATURE;
            signatures.refresh_signature = process.env.REFRESH_USER_SIGNATURE;
            break;
        case signaturelevelenum.ADMIN:
            signatures.access_signature = process.env.ACCESS_ADMIN_SIGNATURE;
            signatures.refresh_signature = process.env.REFRESH_ADMIN_SIGNATURE;
        default:
            break;
    }
    return signatures;
};
exports.getsignatures = getsignatures;
const createlogincredentials = async (user) => {
    const signaturelevel = await (0, exports.getsignature)(user.role);
    const signatures = await (0, exports.getsignatures)(signaturelevel);
    const accesstoken = await (0, exports.generatetoken)({ payload: { _di: user._id }, Secret: signatures.access_signature, options: { expiresIn: Number(process.env.ACCESS_EXPIRY_IN) } });
    const refreshtoken = await (0, exports.generatetoken)({ payload: { _id: user._id }, Secret: signatures.refresh_signature, options: { expiresIn: Number(process.env.REFRESH_EXPIRY_IN) } });
    return { accesstoken, refreshtoken };
};
exports.createlogincredentials = createlogincredentials;
const decodedtoken = async ({ authorization, tokentype = TokenEnum.ACCESS, }) => {
    const usermodel = new user_repositories_1.UserRepository(user_model_2.Usermodel);
    // Split the header into role and token
    const [role, token] = authorization.split(" ");
    if (!role || !token) {
        throw new error_response_1.UnAuthorizedException("Invalid token format, expected: ROLE <token>");
    }
    // Check role against your enum
    if (!(role in signaturelevelenum)) {
        throw new error_response_1.UnAuthorizedException("Invalid role in authorization header");
    }
    const signatures = await (0, exports.getsignatures)(role);
    const secret = tokentype === TokenEnum.REFRESH
        ? signatures.refresh_signature
        : signatures.access_signature;
    const decoded = await (0, exports.verifytoken)({ token, Secret: secret });
    if (!decoded._id || !decoded.iat) {
        throw new error_response_1.UnAuthorizedException("Invalid token payload");
    }
    const user = await usermodel.findOne({
        filter: { _id: decoded._id },
        options: { lean: true },
    });
    if (!user)
        throw new error_response_2.NotFoundException("User not found with this token");
    return { user, decoded };
};
exports.decodedtoken = decodedtoken;
//# sourceMappingURL=token.js.map