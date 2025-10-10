"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commentmodel = exports.commentschema = void 0;
const mongoose_1 = require("mongoose");
exports.commentschema = new mongoose_1.Schema({
    content: { type: String, minLength: 3, maxLength: 10000, required: function () { return !this.attachments?.length; }, },
    attachments: [String],
    tags: { type: [mongoose_1.Schema.Types.ObjectId], ref: "USER" },
    likes: { type: [mongoose_1.Schema.Types.ObjectId], ref: "USER" },
    createdby: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
    postid: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "POST" },
    freezedby: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    freezedAt: { type: Date },
    restoredby: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    restoredAt: { type: Date },
    createdat: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    assetspostFolderId: String,
    commentid: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER", required: true }
}, { timestamps: true });
exports.Commentmodel = mongoose_1.models.post || (0, mongoose_1.model)("post", exports.commentschema);
//# sourceMappingURL=comment.model.js.map