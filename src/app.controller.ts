import express from "express";
import path from "node:path"
import type {  Express ,   Request,  Response} from "express";

import dotenv from "dotenv";
import cors from "cors";
import rateLimit,{type RateLimitRequestHandler} from "express-rate-limit";
import helmet from "helmet";
dotenv.config ({path:path.resolve("config/.env.dev")});
import authRouter from "./modules/auth/auth.controller";
import { globalhandler } from "./utils/response/error.response";

import connectDB from "./Db/connection";


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
    app.use("/api/auth",authRouter);

    app.get("/",(req:Request,res:Response)=>{
       return res.status(200).json({message:"hello social media app"});
    })
    app.get("/users",(req:Request,res:Response)=>{
       return res.status(200).json({message:"hello ts express"});
    })
    app.use(globalhandler);

    
    app.listen (port,()=>{
        console.log(`Server is running on port ${port}`);
        
    })
}