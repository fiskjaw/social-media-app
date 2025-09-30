"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../../utils/security/token");
const users_service_1 = __importDefault(require("./users.service"));
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const user_authorization_1 = require("./user.authorization");
const router = (0, express_1.Router)();
router.get("/profile", (0, authentication_middleware_1.authentication)(user_authorization_1.endpoint.profile), users_service_1.default.getprofile);
router.post("/logout", (0, authentication_middleware_1.authentication)(user_authorization_1.endpoint.logout), users_service_1.default.logout);
router.post("/refresh", (0, authentication_middleware_1.authentication)(user_authorization_1.endpoint.refresh, token_1.TokenEnum.REFRESH), users_service_1.default.refreshtoken);
exports.default = router;
//# sourceMappingURL=users.controller.js.map