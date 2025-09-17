"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalfields = exports.validation = void 0;
const error_response_1 = require("../utils/response/error.response");
const zod_1 = __importDefault(require("zod"));
const validation = (schema) => {
    return (req, res, next) => {
        const validationErrors = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            const validationResult = schema[key].safeParse(req[key]);
            if (!validationResult.success) {
                const errors = validationResult.error;
                validationErrors.push({
                    key,
                    issues: errors.issues.map((issue) => {
                        return { message: issue.message, path: issue.path };
                    }),
                });
            }
            if (validationErrors.length > 0) {
                throw new error_response_1.badRequestException("validation Error", { cause: validationErrors });
            }
        }
        return next();
    };
};
exports.validation = validation;
exports.generalfields = {
    username: zod_1.default.string().min(2).max(100),
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6).max(100),
    confirmpassword: zod_1.default.string().min(6).max(100),
};
//# sourceMappingURL=validation.middleware.js.map