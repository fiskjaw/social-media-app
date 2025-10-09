"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoint = void 0;
const user_model_1 = require("../../Db/models/user.model");
exports.endpoint = {
    createpost: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    deletepost: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    like: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    unlike: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    comment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    deletecomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    likecomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    unlikecomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    replycomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    deletereplycomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    likereplycomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    unlikereplycomment: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    share: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    deleteshare: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    likepost: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
    unlikepost: [user_model_1.RoleEnum.USER, user_model_1.RoleEnum.ADMIN],
};
//# sourceMappingURL=post.authorization.js.map