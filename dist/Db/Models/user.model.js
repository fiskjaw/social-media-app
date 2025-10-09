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
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "USER" }],
    freezedby: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    freezedAt: { type: Date },
    restoredby: { type: mongoose_1.Schema.Types.ObjectId, ref: "USER" },
    restoredAt: { type: Date },
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
/*userschema.pre("validate",async function(this:HUSER&{wasNew:boolean},next){
  this.wasNew = this.isNew;
 console.log("pre validate hook ",this.wasNew);
 if (this.isModified("password")) this.password = await generatehash(this.password);
 
  next();
})*/
/*userschema.pre("findOne",function(next){
  console.log({this:this,query:this.getQuery()});
  const query =this.getQuery();
 this.setQuery({...query,freezeAt:{$exists:true}})
  next();
})*/
// userschema.pre("save",async function(this:HUSER&{wasNew:boolean},next){
//     if (this.wasNew) this.password = await generatehash(this.password);
//     next();
//   })
/*userschema.pre("updateOne",async function(next){
  console.log({this:this});
  const query =this.getquery();
  const query =this.getUpdate() as UpdateQuery<HUSER>;
  if (update.freezeAt){
    const tokenmodel = new TokenRepository(Tokenmodel);
    await tokenmodel.deleteMany({filter:{userid:query._id}});
  }
  
})*/
/*userschema.pre(["deleteOne", "findOneAndDelete"],async function (next){
  const query = this.getQuery();

  const tokenmodel=new TokenRepository(Tokenmodel);
await tokenmodel.deleteMany({filter:{userid:query._id}});

})*/
/*userschema.pre("insertMany",async function(next,docs){
  
  for (const doc of docs) {
    
    doc.password = await generatehash(doc.password);
  }
  next();
})*/
exports.userschema.pre("save", async function (next) {
    this.wasNew = this.isNew;
    if (this.isModified("password")) {
        this.password = await (0, hash_1.generatehash)(this.password);
    }
    ;
    if (this.isModified("confirmemailotp")) {
        this.confirmemailPlainotp = this.confirmemailotp;
        this.confirmemailotp = await (0, hash_1.generatehash)(this.confirmemailotp);
    }
    ;
    next();
});
exports.userschema.post("save", async function (doc, next) {
    const that = this;
    if (that.wasNew && that.confirmemailPlainotp)
        email_event_1.emailevent.emit("confirmemail", { to: that.email, username: that.username, otp: that.confirmemailPlainotp });
});
exports.userschema.pre(["find", "findOne"], async function (next) {
    const query = this.getQuery();
    if (query.paranoid === false) {
        this.setQuery({ ...query });
    }
    else {
        this.setQuery({ ...query, freezedAt: { $exists: false } });
    }
    next();
});
exports.Usermodel = mongoose_1.models.USER || (0, mongoose_1.model)("USER", exports.userschema);
//# sourceMappingURL=user.model.js.map