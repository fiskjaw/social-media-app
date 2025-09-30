"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createrevoketoken = exports.decodedtoken = exports.createlogincredentials = exports.getsignatures = exports.getsignature = exports.verifytoken = exports.generatetoken = exports.logoutEnum = exports.TokenEnum = exports.signaturelevelenum = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = require("../../Db/models/user.model");
const error_response_1 = require("../response/error.response");
const user_repositories_1 = require("../../Db/repositories/user.repositories");
const jsonwebtoken_2 = require("jsonwebtoken");
const user_model_2 = require("../../Db/models/user.model");
const error_response_2 = require("../response/error.response");
const uuid_1 = require("uuid");
const token_repositories_1 = require("../../Db/repositories/token.repositories");
const token_model_1 = require("../../Db/models/token.model");
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
var logoutEnum;
(function (logoutEnum) {
    logoutEnum["only"] = "Only";
    logoutEnum["all"] = "All";
})(logoutEnum || (exports.logoutEnum = logoutEnum = {}));
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
    const jwtid = (0, uuid_1.v4)();
    const accesstoken = await (0, exports.generatetoken)({ payload: { _id: user._id }, Secret: signatures.access_signature, options: { expiresIn: Number(process.env.ACCESS_EXPIRY_IN), jwtid } });
    const refreshtoken = await (0, exports.generatetoken)({ payload: { _id: user._id }, Secret: signatures.refresh_signature, options: { expiresIn: Number(process.env.REFRESH_EXPIRY_IN), jwtid } });
    return { accesstoken, refreshtoken };
};
exports.createlogincredentials = createlogincredentials;
const decodedtoken = async ({ authorization, tokentype = TokenEnum.ACCESS, }) => {
    const usermodel = new user_repositories_1.UserRepository(user_model_2.Usermodel);
    const tokenmodel = new token_repositories_1.TokenRepository(token_model_1.Tokenmodel);
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
    console.log(decoded);
    if (!decoded._id || !decoded.iat) {
        throw new error_response_1.UnAuthorizedException("Invalid token payload");
    }
    if (await tokenmodel.findOne({ filter: { jti: decoded.jti } }))
        throw new error_response_1.UnAuthorizedException("invalid token");
    const user = await usermodel.findOne({
        filter: { _id: decoded._id },
    });
    if (!user)
        throw new error_response_2.NotFoundException("User not found with this token");
    if (user.changecredentialstime?.getTime() || 0 > decoded.iat * 1000)
        throw new error_response_1.UnAuthorizedException("token expired");
    return { user, decoded };
};
exports.decodedtoken = decodedtoken;
const createrevoketoken = async (decoded) => {
    const tokenmodel = new token_repositories_1.TokenRepository(token_model_1.Tokenmodel);
    const [results] = await tokenmodel.create({ data: [{ jti: decoded.jti, expiresin: decoded.iat + Number(process.env.REFRESH_EXPIRY_IN), userid: decoded._id }],
        options: { validateBeforeSave: true } }) || [];
    if (!results)
        throw new error_response_1.UnAuthorizedException("invalid token");
};
exports.createrevoketoken = createrevoketoken;
//# sourceMappingURL=token.js.map