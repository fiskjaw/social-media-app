"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupschema = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
exports.signupschema = {
    body: zod_1.default.strictObject({
        username: validation_middleware_1.generalfields.username,
        email: validation_middleware_1.generalfields.email,
        password: validation_middleware_1.generalfields.password,
        confirmpassword: validation_middleware_1.generalfields.confirmpassword
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmpassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmpassword"],
                message: "password mismatch"
            });
        }
        if (data.username.split(" ").length != 2) {
            ctx.addIssue({
                code: "custom",
                path: ["username"],
                message: "username must be two words"
            });
        }
    })
};
//# sourceMappingURL=auth.validation.js.map