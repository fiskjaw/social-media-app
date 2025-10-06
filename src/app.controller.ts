import express from "express";
import path from "node:path"
import type {  Express ,   Request,  Response} from "express";
import {createGetpresignedurl, deletefile, getfile} from "./utils/multer/s3.config";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit,{type RateLimitRequestHandler} from "express-rate-limit";
import helmet from "helmet";
dotenv.config ({path:path.resolve("config/.env.dev")});
import authRouter from "./modules/auth/auth.controller";
import { badRequestException, globalhandler } from "./utils/response/error.response";
import userRouter from "./modules/users/users.controller";
import connectDB from "./Db/connection";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { Usermodel } from "./Db/models/user.model";

const createS3writestreampipe=promisify(pipeline);


const limiter:RateLimitRequestHandler =rateLimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        status:429,
        message:"Too many requests from this IP, please try again "
    }
})
export const bootstrap =async ():Promise<void> =>{
    const app:Express = express();
    const port:number = Number(process.env.port);
   

    app.use(cors(),helmet(),express.json());
    app.use(limiter);
   await connectDB();
   app.get("/upload/presigned/*path"),async (req:Request,res:Response)=>{
  const {downloadname,download}=req.query as  {downloadname?:string,download?:string};

  const {path}=req.params as unknown as {path:string[]};
  const Key =path.join("/");
  const Url = await createGetpresignedurl({Key,downloadname:downloadname as string,download:download as string});

  return res.status(200).json({Url});
}
app.get("/upload/*path",async (req:Request,res:Response)=>{
    const {downloadname}=req.query as unknown as {downloadname:string}
    
    const {path}=req.params as unknown as {path:string[]};

   const Key =path.join("/");
   const s3Response= await getfile({Key})
if (!s3Response?.Body) throw new badRequestException("File not found");

res.setHeader("Content-type",`${s3Response.ContentType}`||"application/octet-stream");
 if (downloadname) res.setHeader("Content-Disposition",`attachment; filename=${downloadname}`);``

   return await createS3writestreampipe(s3Response.Body as NodeJS.ReadableStream, res);
})
app.get("/test-s3"),async (req:Request,res:Response)=>{
const {Key} =req.query as {Key:string};
const Resutls = await deletefile({Key: Key as string});

return res.status(200).json({message:"File deleted successfully",Resutls});
}
app.get("/test-files",async (req:Request,res:Response)=>{
   const urls: string[] = req.query.urls as string[]; // Assuming the URLs are passed as a query parameter

  try {
    const deletePromises = urls.map(async (url) => {
      await deletefile({ Bucket: process.env.AWS_BUCKET_NAME as string, Key: url });
    });

    await Promise.all(deletePromises);

    return res.status(200).json({ message: "Files deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete files", error });
  }
});



   
    app.use("/api/auth",authRouter);
    app.use("/api/user",userRouter);

    app.get("/",(req:Request,res:Response)=>{
       return res.status(200).json({message:"hello social media app"});  
    })
    app.get("/user",(req:Request,res:Response)=>{
       return res.status(200).json({message:"hello ts express"});
    })



    try {
        const user =new Usermodel({username: "test test",
        email: `${Date.now()}@gmail.com`,password:"123456"});
        
        await user.save({validateBeforeSave:true});
    } catch (error) {
        console.log(error);
        
    }
    app.use(globalhandler);

    
    app.listen (port,()=>{
        console.log(`Server is running on port ${port}`);
        
    })
}