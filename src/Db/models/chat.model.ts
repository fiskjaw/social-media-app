import { model, models, Schema, Types } from "mongoose";
import { HydratedDocument } from "mongoose";

export interface IMessage{
    content:string
    createdat?:Date
    createdby:Types.ObjectId
    updatedAt?:Date
    
}

export interface IChat{
//ovo
    participants:Types.ObjectId[],
    messages:IMessage[]


//ovm-->group
   groupid?:string
   groupimage?:string
   roomid?:string
   //common
    createdat:Date
    createdby:Types.ObjectId
    updatedAt?:Date
    
}
export const Messageschema= new Schema<IMessage>({
    content:{type:String,required:true,maxLength:500000,minLength:2},
    createdby:{type:Schema.Types.ObjectId,required:true,ref:"USER"},
    createdat:{type:Date,default:Date.now()},
    updatedAt:{type:Date}
},{timestamps:true});

export const Chatschema= new Schema<IChat>({
    participants:[{type:Schema.Types.ObjectId,required:true,ref:"USER"}],
    groupid:{type:String},
    groupimage:{type:String},
    roomid:{type:String,required:function(){return this.roomid;}},
    messages:[Messageschema],
    createdby:{type:Schema.Types.ObjectId,required:true,ref:"USER"},
    createdat:{type:Date,default:Date.now()},
    updatedAt:{type:Date}
},{timestamps:true});



 
export const Chatmodel =models.chat||model<IChat>("post",Chatschema);
export type HChat=HydratedDocument<IChat>;