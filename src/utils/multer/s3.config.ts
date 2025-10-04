import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { storageEnum } from "./cloud.multer";
import {v4 as uuid} from "uuid";
import { createReadStream } from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import { badRequestException } from "../response/error.response";






export const s3config =()=>{
    return new S3Client({
region:process.env.REGION as string,
credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },


    });
}

export const uploadfile =async({storageapproach=storageEnum.MEMORY,Bucket=process.env.AWS_BUCKET_NAME as string,ACL="private",path="general",file}:
    {storageapproach?:storageEnum,Bucket?:string,ACL?:ObjectCannedACL,path?:string,file:Express.Multer.File}):Promise<string>=>{

        const command =new PutObjectCommand({
           
            Bucket,
            ACL,
            Key:`${process.env.APPLICATION_NAME}/${path}/${uuid()}-${file.originalname}`,
            Body:storageapproach===storageEnum.MEMORY?file.buffer:createReadStream(file.path),
            ContentType:file.mimetype
        })
   
        await s3config().send(command);
    if (!command?.input?.Key) throw new Error("Error uploading file");

    return command.input.Key;
}

export const uploadlargefile =async({storageapproach=storageEnum.MEMORY,Bucket=process.env.AWS_BUCKET_NAME as string,ACL="private",path="general",file}:
    {storageapproach?:storageEnum,Bucket?:string,ACL?:ObjectCannedACL,path?:string,file:Express.Multer.File}):Promise<string>=>{
const upload = new Upload({client:s3config(),
    params:
    {Bucket
        ,Key:`${process.env.APPLICATION_NAME}/${path}/${uuid()}-${file.originalname}`,
        ContentType:file.mimetype,
        ACL,
        Body:storageapproach===storageEnum.MEMORY?file.buffer:createReadStream(file.path)

    },
    partSize:2*1024*1024
});

upload.on("httpUploadProgress", (progress) => {
    console.log("Upload Progress", progress);
  });
  
const {Key}=await upload.done();
if (!Key) throw new badRequestException("Error uploading file");
return Key
  

     
}

export const uploadfiles=async({storageapproach=storageEnum.MEMORY,Bucket=process.env.AWS_BUCKET_NAME as string,ACL="private",path="general",files}:
    {storageapproach?:storageEnum,Bucket?:string,ACL?:ObjectCannedACL,path?:string,files:Express.Multer.File[]}):Promise<string[]>=>{
        let urls:string[]=[];
        for (const file of files) {
           
            
          const key = await uploadfile({storageapproach,Bucket,ACL,path,file});
          urls.push(key);
        }
        return urls;
      };