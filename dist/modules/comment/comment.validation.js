"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createcommentschema = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const cloud_multer_1 = require("../../utils/multer/cloud.multer");
exports.createcommentschema = {
    params: zod_1.default.strictObject({
        postid: validation_middleware_1.generalfields.id,
    }),
    body: zod_1.default.strictObject({
        content: zod_1.default.string().min(3).max(50000).optional(),
        attachments: zod_1.default.array(validation_middleware_1.generalfields.file(cloud_multer_1.filevalidation.images)).max(3).optional(),
        tags: zod_1.default.array(validation_middleware_1.generalfields.id).max(10).optional()
    }).superRefine((data, ctx) => {
        if (!data.attachments?.length && !data.content) {
            ctx.addIssue({
                code: "custom",
                path: ["content"],
                message: "atleast one attachment or content is required"
            });
        }
        if (data.tags?.length && data.tags.length !== [...new Set(data.tags)].length) {
            ctx.addIssue({
                code: "custom",
                path: ["tags"],
                message: "tags must be unique"
            });
        }
    })
};
//# sourceMappingURL=comment.validation.js.map