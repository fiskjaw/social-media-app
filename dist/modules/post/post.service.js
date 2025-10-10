"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postavailability = void 0;
const post_model_1 = require("../../Db/models/post.model");
const user_repositories_1 = require("../../Db/repositories/user.repositories");
const user_model_1 = require("../../Db/models/user.model");
const post_repositories_1 = require("../../Db/repositories/post.repositories");
const uuid_1 = require("uuid");
const error_response_1 = require("../../utils/response/error.response");
const s3_config_1 = require("../../utils/multer/s3.config");
const postavailability = (req) => {
    return [{ availability: post_model_1.availabilityEnum.PUBLIC },
        { availability: post_model_1.availabilityEnum.ONLY, createdby: req.user?._id },
        { availability: post_model_1.availabilityEnum.FRIENDS, createdby: { $in: [...(req.user?.friends || []), req.user?._id] } },
        { availability: post_model_1.availabilityEnum.ONLY, tags: { $in: req.user?._id } },
    ];
};
exports.postavailability = postavailability;
class postService {
    _usermodel = new user_repositories_1.UserRepository(user_model_1.Usermodel);
    _postmodel = new post_repositories_1.PostRepository(post_model_1.Postmodel);
    constructor() { }
    createPost = async (req, res) => {
        if (req.body.tags?.length && (await this._usermodel.find({ filter: { _id: { $in: req.body.tags } } })).length !== req.body.tags.length) {
            throw new error_response_1.NotFoundException("Invalid tags");
        }
        let assetspostFolderId = (0, uuid_1.v4)();
        let attachments = [];
        if (req.files?.length) {
            attachments = await (0, s3_config_1.uploadfiles)({
                files: req.files,
                path: `/users/${req.user?._id}/post/${assetspostFolderId}`
            });
        }
        const [post] = await this._postmodel.create({ data: [{ ...req.body, attachments, assetspostFolderId, createdby: req.user?._id }], options: { validateBeforeSave: true } }) || [];
        if (!post) {
            if (attachments.length) {
                await (0, s3_config_1.deletefiles)({ urls: attachments });
            }
            throw new error_response_1.badRequestException("Post not created");
        }
        return res.status(201).json({ message: "Post created successfully", post });
    };
    LikeUnlikepost = async (req, res) => {
        const { postid } = req.params;
        const { action } = req.query;
        let update = {
            $addToSet: { likes: req.user?._id }
        };
        if (action === post_model_1.actionEnum.UNLIKE) {
            update = { $pull: { likes: req.user?._id } };
        }
        const post = await this._postmodel.findOneAndUpdate({
            filter: { _id: postid, $or: (0, exports.postavailability)(req) },
            update,
        });
        if (!post)
            throw new error_response_1.NotFoundException("Post not found");
        return res.status(200).json({ message: "Post liked successfully", post });
    };
    Updatepost = async (req, res) => {
        const { postid } = req.params;
        const post = await this._postmodel.findOne({
            filter: { _id: postid, createdby: req.user?._id },
        });
        if (!post)
            throw new error_response_1.NotFoundException("Post not found");
        if (req.body.tags?.length && (await this._usermodel.find({ filter: { _id: { $in: req.body.tags } } })).length !== req.body.tags.length) {
            throw new error_response_1.NotFoundException("Invalid tags");
        }
        let assetspostFolderId = (0, uuid_1.v4)();
        let attachments = [];
        if (req.files?.length) {
            attachments = await (0, s3_config_1.uploadfiles)({
                files: req.files,
                path: `/users/${post.createdby}/post/${assetspostFolderId}`
            });
        }
        const { tags = [], removeattachments = [], removetags = [] } = req.body;
        const updatepost = await this._postmodel.updateOne({
            filter: { _id: postid },
            update: [{ $set: { content: req.body.content,
                        allowcomment: req.body.allowcomment || post.allowcomment,
                        availability: req.body.availability || post.availability,
                        attachments: {
                            $setUnion: [
                                {
                                    $setDifference: ["$attachments", removeattachments ?? []],
                                }, attachments ?? []
                            ]
                        },
                        tags: {
                            $setUnion: [
                                { $setDifference: ["$tags", removetags ?? []] },
                                tags ?? []
                            ]
                        },
                        assetspostFolderId, } }],
        });
        if (!updatepost.modifiedCount) {
            if (attachments?.length) {
                await (0, s3_config_1.deletefiles)({ urls: attachments });
                throw new error_response_1.badRequestException("Post not updated");
            }
            else {
                if (req.body.removeattachments?.length) {
                    await (0, s3_config_1.deletefiles)({ urls: req.body.removeattachments });
                }
                throw new error_response_1.badRequestException("Post not updated");
            }
        }
        return res.status(200).json({ message: "Post updated successfully", });
    };
    getposts = async (req, res) => {
        let { page, size } = req.query;
        const posts = await this._postmodel.paginate({ filter: { $or: (0, exports.postavailability)(req) }, page, size });
        return res.status(200).json({ message: "Posts fetched successfully", posts });
    };
}
exports.default = new postService();
//# sourceMappingURL=post.service.js.map