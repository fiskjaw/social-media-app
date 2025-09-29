"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const error_response_1 = require("../utils/response/error.response");
const token_1 = require("../utils/security/token");
const token_2 = require("../utils/security/token");
const authentication = (accessroles = [], tokentype = token_2.TokenEnum.ACCESS) => {
    return async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return next(new error_response_1.UnAuthorizedException("Missing authorization header"));
            }
            const { user, decoded } = await (0, token_1.decodedtoken)({
                authorization: req.headers.authorization,
                tokentype,
            });
            // Only check roles if roles were provided
            if (accessroles.length > 0 && !accessroles.includes(user.role)) {
                return next(new error_response_1.ForbiddenException("Unauthorized access"));
            }
            req.user = user;
            req.decoded = decoded;
            return next();
        }
        catch (err) {
            return next(err);
        }
    };
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.middleware.js.map