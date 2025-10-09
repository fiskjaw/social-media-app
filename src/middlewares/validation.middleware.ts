import type{ Response,Request,NextFunction } from "express";
import {  ZodError, ZodType } from "zod";
import { badRequestException } from "../utils/response/error.response";
import z from "zod";
import { Types } from "mongoose";

type Reqtypekey= keyof Request;
type schemaType = Partial<Record<Reqtypekey, ZodType>>;
export const validation = (schema:schemaType) => {
    return (req:Request,res:Response,next:NextFunction): NextFunction => {
    const validationErrors:Array<{
        key:Reqtypekey;
        issues:Array<{message:string;path:(string|number|symbol)[]}>
    }>=[]

    for (const key of Object.keys(schema)as Reqtypekey[]) {
        
        if(!schema[key]){
            continue;
        }
        if(req.file){
            req.body.attachments=req.file
        }
        if(req.files){
            req.body.attachments=req.files
        }
        const validationResult = schema[key].safeParse(req[key]);
        if (!validationResult.success) {
            const errors =validationResult.error as ZodError;
            validationErrors.push({
                key,
                issues:errors.issues.map((issue)=>{
                return {message:issue.message,path:issue.path}
            }),
        });
        
        }
        if (validationErrors.length > 0) {
            throw new badRequestException("validation Error", { cause: validationErrors });
        }
    }

    

    return next() as unknown as NextFunction;
};
}

export  const generalfields ={
     username:z.string().min(2).max(100),
    email:z.email(),
    password:z.string().min(6).max(100),
    confirmpassword:z.string().min(6).max(100),
    otp:z.string().regex(/^\d{6}$/),
    file:function (mimetype:string[]){
       return z.strictObject({
        fieldname:z.string(),
        originalname:z.string(),
        encoding:z.string(),
        mimetype:z.string(),
        size:z.number(),
        buffer:z.any().optional(),
        path:z.string().optional(),

    }).refine ((data)=>{
        return data.buffer||data.path
    },{
        error:"file is required",
    })} ,
    
    id:z.string().refine((data)=>{
      return Types.ObjectId.isValid(data)       
    },{
        error:"invalid id"
    }),

}
    
    
    

