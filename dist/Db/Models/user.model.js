"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermodel = exports.userschema = exports.RoleEnum = exports.GenderEnum = void 0;
const mongoose_1 = require("mongoose");
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "user";
    RoleEnum["ADMIN"] = "admin";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
exports.userschema = new mongoose_1.Schema({
    username: { type: String, required: true, maxlength: 100, minlength: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, confirmemailotp: { type: String },
    createdAt: { type: Date, default: Date.now() },
    resetpasswordotp: { type: String },
    changecredentialstime: { type: String },
    phone: { type: String },
    address: { type: String },
    gender: { type: String, enum: Object.values(GenderEnum), default: GenderEnum.MALE },
    role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userschema.virtual("fullname")
    .set(function (value) {
    if (!value)
        return; // don’t set anything if value is undefined
    const [firstname, ...rest] = value.trim().split(" ");
    const lastname = rest.join(" ");
    this.set({ firstname, lastname });
})
    .get(function () {
    return `${this.firstname ?? ""} ${this.lastname ?? ""}`.trim();
});
exports.Usermodel = mongoose_1.models.USER || (0, mongoose_1.model)("USER", exports.userschema);
//# sourceMappingURL=user.model.js.map