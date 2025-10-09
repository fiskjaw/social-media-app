"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeUnlikeschema = exports.createpostschema = void 0;
const zod_1 = __importDefault(require("zod"));
const post_model_1 = require("../../Db/models/post.model");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const cloud_multer_1 = require("../../utils/multer/cloud.multer");
exports.createpostschema = {
    body: zod_1.default.strictObject({
        content: zod_1.default.string().min(1).max(1000).optional(),
        attachments: zod_1.default.array(validation_middleware_1.generalfields.file(cloud_multer_1.filevalidation.images)).max(3).optional(),
        allowcomment: zod_1.default.enum(post_model_1.allowcommentEnum).default(post_model_1.allowcommentEnum.ALLOW),
        availability: zod_1.default.enum(post_model_1.availabilityEnum).default(post_model_1.availabilityEnum.PUBLIC),
        tags: zod_1.default.array(validation_middleware_1.generalfields.id).max(5).optional(),
        likes: zod_1.default.array(zod_1.default.string()).optional()
    }).superRefine((data, ctx) => {
        if (!data.attachments?.length && !data.content) {
            ctx.addIssue({
                code: "custom",
                path: ["attachments"],
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
exports.likeUnlikeschema = {
    params: zod_1.default.strictObject({
        postId: validation_middleware_1.generalfields.id
    }),
    query: zod_1.default.strictObject({
        action: zod_1.default.enum(post_model_1.actionEnum).default(post_model_1.actionEnum.LIKE)
    })
};
//# sourceMappingURL=post.validation.js.map