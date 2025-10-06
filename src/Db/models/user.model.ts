import { model, models, Schema,Types } from "mongoose";
import { HydratedDocument } from "mongoose";
import { badRequestException } from "../../utils/response/error.response";
import { generatehash } from "../../utils/security/hash";
import { emailevent } from "../../utils/event/email.event";

export enum GenderEnum{ 
    MALE="male",
    FEMALE="female",
    
}
export enum RoleEnum{ 
    USER="user",
    ADMIN="admin",

}

export interface IUser{
_id:Types.ObjectId;
firstname:string;
lastname:string;
username?:string;
email:string;
password:string;
createdAt:Date;
confirmemailotp?:string;
updatedAt?:Date;
resetpasswordotp?:string;
changecredentialstime?:string;
 phone?:string;
 address?:string;
 confirmedAt?:Date;
 slug?:string;

 gender:GenderEnum;
 role:RoleEnum;





}
export const userschema= new Schema<IUser>({
firstname:{type:String,required:true,minLength:3,maxLength:100},
lastname:{type:String,required:true,minLength:3,maxLength:100},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},confirmemailotp:{type:String},
createdAt:{type:Date,default:Date.now()},
resetpasswordotp:{type:String},
changecredentialstime:{type:String},
slug:{type:String,required:true,minLength:3,maxLength:100},
phone:{type:String},
address:{type:String},
gender:{type:String,enum:Object.values(GenderEnum),default:GenderEnum.MALE},
role:{type:String,enum:Object.values(RoleEnum),default:RoleEnum.USER},


},
    {timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});

 userschema.virtual("username")
  .set(function(value: string) {
    if (!value) return; // don’t set anything if value is undefined
    const [firstname, lastname] = value.split(" ")||[];
   
    this.set({ firstname, lastname,slug:value.replaceAll(/\s+/g, "-") });
  })
  .get(function() {
    return `${this.firstname ?? ""} ${this.lastname ?? ""}`;
  });

  userschema.pre("validate",async function(this:HUSER&{wasNew:boolean},next){
    this.wasNew = this.isNew;
   console.log("pre validate hook ",this.wasNew);
   if (this.isModified("password")) this.password = await generatehash(this.password);
   
    next();
  })
 
userschema.post("save",async function(doc,next){
 const that= this as HUSER&{wasNew:boolean};

 if (that.wasNew) emailevent.emit("confirmemail",{to:that.email,otp:123456});
})
userschema.post("save", function(doc,next){
  console.log("pre save hook 2",this);
  emailevent.emit("confirmemail",{to:this.email,otp:123456});
 
  
})




    export const Usermodel =models.USER||model<IUser>("USER",userschema);
    export type HUSER=HydratedDocument<IUser>;