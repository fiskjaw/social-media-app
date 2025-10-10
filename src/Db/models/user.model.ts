import { model, models, Schema,Types} from "mongoose";
import { HydratedDocument } from "mongoose";

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
freezedby?:Types.ObjectId
freezedAt?:Date
restoredby?:Types.ObjectId
restoredAt?:Date,
 gender:GenderEnum;
 role:RoleEnum;
friends?:Types.ObjectId[];




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
friends:[{type:Schema.Types.ObjectId,ref:"USER"}],
freezedby:{type:Schema.Types.ObjectId,ref:"USER"},
freezedAt:{type:Date},
restoredby:{type:Schema.Types.ObjectId,ref:"USER"},
restoredAt:{type:Date},


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


userschema.pre("save",async function(this:HUSER&{wasNew:boolean;confirmemailPlainotp?:string},next){
  this.wasNew = this.isNew;
  if (this.isModified("password")){
     this.password = await generatehash(this.password )
    };
  if (this.isModified("confirmemailotp")){
    this.confirmemailPlainotp = this.confirmemailotp as string
     this.confirmemailotp = await generatehash(this.confirmemailotp as string) 
    };

  next();
})
userschema.post("save",async function(doc,next){
  const that = this as HUSER&{wasNew:boolean;confirmemailPlainotp?:string};

  if (that.wasNew && that.confirmemailPlainotp) emailevent.emit("confirmemail",{to:that.email,username:that.username,otp:that.confirmemailPlainotp});
})




    export const Usermodel =models.USER||model<IUser>("USER",userschema);
    export type HUSER=HydratedDocument<IUser>;
