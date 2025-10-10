"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repositories_1 = require("../../Db/repositories/user.repositories");
const post_repositories_1 = require("../../Db/repositories/post.repositories");
const user_model_1 = require("../../Db/models/user.model");
const post_model_1 = require("../../Db/models/post.model");
const comment_repositories_1 = require("../../Db/repositories/comment.repositories");
const comment_model_1 = require("../../Db/models/comment.model");
const post_service_1 = require("../post/post.service");
const error_response_1 = require("../../utils/response/error.response");
const error_response_2 = require("../../utils/response/error.response");
const s3_config_1 = require("../../utils/multer/s3.config");
const s3_config_2 = require("../../utils/multer/s3.config");
class commentService {
    _usermodel = new user_repositories_1.UserRepository(user_model_1.Usermodel);
    _postmodel = new post_repositories_1.PostRepository(post_model_1.Postmodel);
    _commentmodel = new comment_repositories_1.CommentRepository(comment_model_1.Commentmodel);
    constructor() { }
    createcomment = async (req, res) => {
        const { postid } = req.params;
        const { post } = await this._postmodel.findOne({ filter: { _id: postid, allowcomment: post_model_1.allowcommentEnum.ALLOW, $or: (0, post_service_1.postavailability)(req) } }) || {};
        if (!post)
            throw new error_response_1.NotFoundException("Post not found or comment is disabled");
        if (req.body.tags?.length && (await this._usermodel.find({ filter: { _id: { $in: req.body.tags } } })).length !== req.body.tags.length) {
            throw new error_response_1.NotFoundException("Invalid tags");
        }
        let attachments = [];
        if (req.files?.length) {
            attachments = await (0, s3_config_1.uploadfiles)({
                files: req.files,
                path: `/users/${post.createdby}/post/${post.assetspostFolderId}`
            });
        }
        const [comment] = await this._postmodel.create({ data: [{ ...req.body, attachments, postid, createdby: req.user?._id }], options: { validateBeforeSave: true } }) || [];
        if (!comment) {
            if (attachments.length) {
                await (0, s3_config_2.deletefiles)({ urls: attachments });
            }
            throw new error_response_2.badRequestException("Post not created");
        }
        return res.status(200).json({ message: "comment created successfully" });
    };
}
exports.default = new commentService();
//# sourceMappingURL=comment.service.js.map