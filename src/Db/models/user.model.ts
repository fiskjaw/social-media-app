import { model, models, Schema,Types } from "mongoose";

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
email:string;
password:string;
createdAt:Date;
confirmemailotp?:string;
updatedAt?:Date;
resetpasswordotp?:string;
changecredentialstime?:string;
 phone?:string;
 address?:string;

 gender:GenderEnum;
 role:RoleEnum;





}
export const userschema= new Schema<IUser>({
firstname:{type:String,required:true,maxlength:100,minlength:2},
lastname:{type:String,required:true,maxlength:100,minlength:2},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},confirmemailotp:{type:String},
createdAt:{type:Date,default:Date.now()},
resetpasswordotp:{type:String},
changecredentialstime:{type:String},
phone:{type:String},
address:{type:String},
gender:{type:String,enum:Object.values(GenderEnum),default:GenderEnum.MALE},
role:{type:String,enum:Object.values(RoleEnum),default:RoleEnum.USER},


},
    {timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});

    userschema.virtual("fullname").set(function(value:string){
        const [firstname,lastname]=value.split(" ")||[];
        this.set({firstname,lastname});
    }).get(function(){
        return `${this.firstname} ${this.lastname}`;
    })
    export const Usermodel =models.USER||model<IUser>("USER",userschema);