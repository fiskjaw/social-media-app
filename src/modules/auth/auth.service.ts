import type { NextFunction, Request, Response } from "express";
import {  NotFoundException } from "../../utils/response/error.response";
import { ISignupDTO } from "./auth.dto";
//import { ISignupDTO } from "./auth.dto";

//import { json } from "zod";

class authenticationservice{
    signup=async(req:Request,res:Response,next:NextFunction)
    :Promise<Response>=>{
    const {username,email,password}:ISignupDTO=req.body;
    console.log({username,email,password});
    
    return res.status(201).json({message:"User created successfully"});
    }
    login=(req:Request,res:Response,next:NextFunction):Response=>{
        throw new NotFoundException("error logging in",{cause:"user not found"})
    }
}
export default new authenticationservice();