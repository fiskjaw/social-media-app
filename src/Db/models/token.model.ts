import { model, models, Schema,Types } from "mongoose";
import { HydratedDocument } from "mongoose";



export interface IToken{
    jti:string,
    expiresin:number,
    userid:Types.ObjectId;
}
export const tokenschema= new Schema<IToken>({

jti:{type:String,required:true,unique:true},
expiresin:{type:Number,required:true},
userid:{type:Schema.Types.ObjectId,required:true,ref:"USER"},

},
    {timestamps:true});

 
    export const Tokenmodel =models.Token||model<IToken>("2oken",tokenschema);
    export type Htoken=HydratedDocument<IToken>;