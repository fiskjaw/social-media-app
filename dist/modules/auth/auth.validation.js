"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmemailschema = exports.signupschema = exports.loginschema = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
exports.loginschema = {
    body: zod_1.default.strictObject({
        email: validation_middleware_1.generalfields.email,
        password: validation_middleware_1.generalfields.password,
    })
};
exports.signupschema = {
    body: exports.loginschema.body
        .extend({
        username: validation_middleware_1.generalfields.username,
        confirmpassword: validation_middleware_1.generalfields.confirmpassword,
        firstname: validation_middleware_1.generalfields.username,
        lastname: validation_middleware_1.generalfields.username
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmpassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmpassword"],
                message: "password mismatch"
            });
        }
    })
};
exports.confirmemailschema = {
    body: zod_1.default.strictObject({
        email: validation_middleware_1.generalfields.email,
        otp: validation_middleware_1.generalfields.otp,
    })
};
//# sourceMappingURL=auth.validation.js.map