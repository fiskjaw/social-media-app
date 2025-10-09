"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postmodel = exports.postschema = exports.actionEnum = exports.availabilityEnum = exports.allowcommentEnum = void 0;
const mongoose_1 = require("mongoose");
var allowcommentEnum;
(function (allowcommentEnum) {
    allowcommentEnum["ALLOW"] = "ALLOW";
    allowcommentEnum["DENY"] = "DENY";
})(allowcommentEnum || (exports.allowcommentEnum = allowcommentEnum = {}));
var availabilityEnum;
(function (availabilityEnum) {
    availabilityEnum["PUBLIC"] = "PUBLIC";
    availabilityEnum["ONLY"] = "ONLY";
    availabilityEnum["FRIENDS"] = "FRIENDS";
})(availabilityEnum || (exports.availabilityEnum = availabilityEnum = {}));
var actionEnum;
(function (actionEnum) {
    actionEnum["LIKE"] = "LIKE";
    actionEnum["UNLIKE"] = "UNLIKE";
})(actionEnum || (exports.actionEnum = actionEnum = {}));
exports.postschema = new mongoose_1.Schema({
    content: { type: String, minLength: 3, maxLength: 10000, required: function () { return !this.attachments?.length; }, },
    attachments: [String],
    allowcomment: { type: String, enum: Object.values(allowcommentEnum), default: allowcommentEnum.ALLOW },
    availability: { type: String, enum: Object.values(availabilityEnum), default: availabilityEnum.PUBLIC },
    tags: { type: [mongoose_1.Schema.Types.ObjectId], ref: "USER" },
    likes: { type: [mongoose_1.Schema.Types.ObjectId], ref: "USER" },
    createdby: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
    freezedby: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    freezedAt: { type: Date },
    restoredby: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    restoredAt: { type: Date },
    createdat: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    assetspostFolderId: String
}, { timestamps: true });
exports.postschema.pre(["find", "findOne", "updateOne"], async function (next) {
    const query = this.getQuery();
    if (query.paranoid === false) {
        this.setQuery({ ...query });
    }
    else {
        this.setQuery({ ...query, freezedAt: { $exists: false } });
    }
    next();
});
exports.Postmodel = mongoose_1.models.post || (0, mongoose_1.model)("post", exports.postschema);
//# sourceMappingURL=post.model.js.map