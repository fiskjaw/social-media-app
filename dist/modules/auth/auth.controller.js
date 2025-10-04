"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const cloud_multer_1 = require("../../utils/multer/cloud.multer");
const token_1 = require("../../utils/security/token");
const auth_authorization_1 = require("./auth.authorization");
router.post("/signup", (0, validation_middleware_1.validation)(auth_validation_1.signupschema), auth_service_1.default.signup);
router.patch("/confirmemail", (0, validation_middleware_1.validation)(auth_validation_1.confirmemailschema), auth_service_1.default.confirmemail);
router.get("/login", (0, validation_middleware_1.validation)(auth_validation_1.loginschema), auth_service_1.default.login);
router.patch("/profile-image", (0, authentication_middleware_1.authentication)(auth_authorization_1.endpoint.image, token_1.TokenEnum.ACCESS), (0, cloud_multer_1.cloudfileupload)({ storageapproach: cloud_multer_1.storageEnum.MEMORY, validation: cloud_multer_1.filevalidation.images, maxsize: 2 }).single("attachment"), auth_service_1.default.profileimage);
router.patch("/profile-cover-image", (0, authentication_middleware_1.authentication)(auth_authorization_1.endpoint.image, token_1.TokenEnum.ACCESS), (0, cloud_multer_1.cloudfileupload)({ storageapproach: cloud_multer_1.storageEnum.MEMORY, validation: cloud_multer_1.filevalidation.images, maxsize: 2 }).array("attachments", 5), auth_service_1.default.coverimages);
exports.default = router;
//# sourceMappingURL=auth.controller.js.map