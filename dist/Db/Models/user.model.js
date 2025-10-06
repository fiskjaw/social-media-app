"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermodel = exports.userschema = exports.RoleEnum = exports.GenderEnum = void 0;
const mongoose_1 = require("mongoose");
const hash_1 = require("../../utils/security/hash");
const email_event_1 = require("../../utils/event/email.event");
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
    firstname: { type: String, required: true, minLength: 3, maxLength: 100 },
    lastname: { type: String, required: true, minLength: 3, maxLength: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, confirmemailotp: { type: String },
    createdAt: { type: Date, default: Date.now() },
    resetpasswordotp: { type: String },
    changecredentialstime: { type: String },
    slug: { type: String, required: true, minLength: 3, maxLength: 100 },
    phone: { type: String },
    address: { type: String },
    gender: { type: String, enum: Object.values(GenderEnum), default: GenderEnum.MALE },
    role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userschema.virtual("username")
    .set(function (value) {
    if (!value)
        return; // don’t set anything if value is undefined
    const [firstname, lastname] = value.split(" ") || [];
    this.set({ firstname, lastname, slug: value.replaceAll(/\s+/g, "-") });
})
    .get(function () {
    return `${this.firstname ?? ""} ${this.lastname ?? ""}`;
});
exports.userschema.pre("validate", async function (next) {
    this.wasNew = this.isNew;
    console.log("pre validate hook ", this.wasNew);
    if (this.isModified("password"))
        this.password = await (0, hash_1.generatehash)(this.password);
    next();
});
exports.userschema.post("save", async function (doc, next) {
    const that = this;
    if (that.wasNew)
        email_event_1.emailevent.emit("confirmemail", { to: that.email, otp: 123456 });
});
exports.userschema.post("save", function (doc, next) {
    console.log("pre save hook 2", this);
    email_event_1.emailevent.emit("confirmemail", { to: this.email, otp: 123456 });
});
exports.Usermodel = mongoose_1.models.USER || (0, mongoose_1.model)("USER", exports.userschema);
//# sourceMappingURL=user.model.js.map