"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenmodel = exports.tokenschema = void 0;
const mongoose_1 = require("mongoose");
exports.tokenschema = new mongoose_1.Schema({
    jti: { type: String, required: true, unique: true },
    expiresin: { type: Number, required: true },
    userid: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "USER" },
}, { timestamps: true });
exports.Tokenmodel = mongoose_1.models.Token || (0, mongoose_1.model)("2oken", exports.tokenschema);
//# sourceMappingURL=token.model.js.map