import { model, models, Schema, Types } from "mongoose";
import { HydratedDocument } from "mongoose";



export interface IComment{
   content?:string,
   attachments?:string[],
   postid?:Types.ObjectId,
   tags?:Types.ObjectId[],
   likes?:Types.ObjectId[],
   createdby:Types.ObjectId,
   freezedby?:Types.ObjectId
   freezedAt?:Date
   restoredby?:Types.ObjectId
   restoredAt?:Date,
   createdat:Date,
   updatedAt?:Date,
   assetspostFolderId?:string,
   commentid?:Types.ObjectId


    
}
export const commentschema= new Schema<IComment>({
content:{type:String,minLength:3,maxLength:10000,required:function(){return !this.attachments?.length}, },
attachments:[String],
tags:{type:[Schema.Types.ObjectId],ref:"USER"},
likes:{type:[Schema.Types.ObjectId],ref:"USER"},
createdby:{type:Schema.Types.ObjectId,required:true,ref:"USER"},
postid:{type:Schema.Types.ObjectId,required:true,ref:"POST"},
freezedby:{type:Schema.Types.ObjectId,ref:"USER"},
freezedAt:{type:Date},
restoredby:{type:Schema.Types.ObjectId,ref:"USER"},
restoredAt:{type:Date},
createdat:{type:Date,default:Date.now()},
updatedAt:{type:Date},
assetspostFolderId:String,
commentid:{type:Schema.Types.ObjectId,ref:"USER",required:true}

},
    {timestamps:true});


 
    export const Commentmodel =models.post||model<IComment>("post",commentschema);
    export type Hcomment=HydratedDocument<IComment>;