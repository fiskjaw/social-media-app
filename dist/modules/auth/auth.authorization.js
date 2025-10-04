"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoint = void 0;
const user_model_1 = require("../../Db/models/user.model");
exports.endpoint = {
    image: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
};
//# sourceMappingURL=auth.authorization.js.map