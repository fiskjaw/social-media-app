"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("./post.service"));
const express_1 = require("express");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const post_authorization_1 = require("./post.authorization");
const token_1 = require("../../utils/security/token");
const cloud_multer_1 = require("../../utils/multer/cloud.multer");
const validators = __importStar(require("./post.validation"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const router = (0, express_1.Router)();
router.post("/createpost", (0, authentication_middleware_1.authentication)(post_authorization_1.endpoint.createpost, token_1.TokenEnum.ACCESS), (0, cloud_multer_1.cloudfileupload)({ validation: cloud_multer_1.filevalidation.images }).array("attachments", 3), (0, validation_middleware_1.validation)(validators.createpostschema), post_service_1.default.createPost);
router.post("/:postid/like", (0, authentication_middleware_1.authentication)(post_authorization_1.endpoint.createpost, token_1.TokenEnum.ACCESS), (0, cloud_multer_1.cloudfileupload)({ validation: cloud_multer_1.filevalidation.images }).array("attachments", 3), (0, validation_middleware_1.validation)(validators.createpostschema), post_service_1.default.createPost);
router.patch("/:postid/like", (0, authentication_middleware_1.authentication)(post_authorization_1.endpoint.like, token_1.TokenEnum.ACCESS), (0, cloud_multer_1.cloudfileupload)({ validation: cloud_multer_1.filevalidation.images }).array("attachments", 3), (0, validation_middleware_1.validation)(validators.likeUnlikeschema), post_service_1.default.LikeUnlikepost);
router.patch("/:postid", (0, authentication_middleware_1.authentication)(post_authorization_1.endpoint.like, token_1.TokenEnum.ACCESS), (0, cloud_multer_1.cloudfileupload)({ validation: cloud_multer_1.filevalidation.images }).array("attachments", 3), (0, validation_middleware_1.validation)(validators.Updatepostschema), post_service_1.default.Updatepost);
router.get("/", (0, authentication_middleware_1.authentication)(post_authorization_1.endpoint.getpost, token_1.TokenEnum.ACCESS), post_service_1.default.getposts);
router.use("/:postid/comment", comment_controller_1.default);
exports.default = router;
//# sourceMappingURL=post.controller.js.map