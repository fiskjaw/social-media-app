import { model, models, Schema, Types } from "mongoose";
import { HydratedDocument } from "mongoose";


export enum allowcommentEnum{
    ALLOW="ALLOW",
    DENY="DENY"
}
export enum availabilityEnum {
  PUBLIC = "PUBLIC",
  ONLY = "ONLY",
  FRIENDS = "FRIENDS"
}
export enum actionEnum{
LIKE="LIKE",
UNLIKE="UNLIKE"
}
export interface IPost{
   content?:string,
   attachments?:string[],
   allowcomment?:allowcommentEnum,
   availability?:availabilityEnum,
   tags?:Types.ObjectId[],
   likes?:Types.ObjectId[],
   createdby:Types.ObjectId,
   freezedby?:Types.ObjectId
   freezedAt?:Date
   restoredby?:Types.ObjectId
   restoredAt?:Date,
   createdat:Date
   updatedAt?:Date
   assetspostFolderId?:string

    
}
export const postschema= new Schema<IPost>({
content:{type:String,minLength:3,maxLength:10000,required:function(){return !this.attachments?.length}, },
attachments:[String],
allowcomment:{type:String,enum:Object.values(allowcommentEnum),default:allowcommentEnum.ALLOW},
availability:{type:String,enum:Object.values(availabilityEnum),default:availabilityEnum.PUBLIC},
tags:{type:[Schema.Types.ObjectId],ref:"USER"},
likes:{type:[Schema.Types.ObjectId],ref:"USER"},
createdby:{type:Schema.Types.ObjectId,required:true,ref:"USER"},
freezedby:{type:Schema.Types.ObjectId,ref:"USER"},
freezedAt:{type:Date},
restoredby:{type:Schema.Types.ObjectId,ref:"USER"},
restoredAt:{type:Date},
createdat:{type:Date,default:Date.now()},
updatedAt:{type:Date},
assetspostFolderId:String

},
    {timestamps:true});


 
    export const Postmodel =models.post||model<IPost>("post",postschema);
    export type HPOST=HydratedDocument<IPost>;