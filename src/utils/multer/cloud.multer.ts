import { Request } from "express";
import multer from "multer";
import os from "node:os";
import {v4 as uuid} from "uuid";
import { Multer } from "multer";
import { badRequestException } from "../response/error.response";




export enum storageEnum{
    MEMORY="MEMORY",
    DISK="DISK"
}

export const filevalidation ={
    images :["image/jpeg","image/png","image/jpg"],
    pdf:["application/pdf"],
    videos:["video/mp4","video/mov","video/quicktime"]
}

export const cloudfileupload =  ({validation=[],storageapproach=storageEnum.MEMORY,maxsize=2}:{validation?:string[],storageapproach:storageEnum,maxsize?:number}):Multer=>{


    const storage = storageapproach===storageEnum.MEMORY?multer.memoryStorage():
    multer.diskStorage({destination:os.tmpdir(),
        filename:(req:Request,
            file:Express.Multer.File,cb)=>{
                cb(null,`${uuid()}-${file.originalname}`)}});
    
function fileFilter(req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback){

    if(!validation.includes(file.mimetype)){
        return cb(new badRequestException("invalid file type"))
    }
   return cb(null,true)
    
}
    return multer({ fileFilter,limits:{fileSize:maxsize*1024*1024},storage });
}