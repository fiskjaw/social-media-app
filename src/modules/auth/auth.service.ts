import type { NextFunction, Request, Response } from "express";
import {  NotFoundException } from "../../utils/response/error.response";
import { ISignupDTO } from "./auth.dto";
import { IUser, Usermodel } from "../../Db/models/user.model";
import { Model } from "mongoose";
//import { ISignupDTO } from "./auth.dto";

//import { json } from "zod";

class authenticationservice{
    private _usermodel: Model<IUser> = Usermodel;
    constructor(){
        
    }
    signup=async(req:Request,res:Response)
    :Promise<Response>=>{
    const {username,email,password}:ISignupDTO=req.body;
    const [user]:IUser[] = await this._usermodel.create([{username,email,password}],{validateBeforeSave: true});
    
    return res.status(201).json({message:"User created successfully",user});
    }
    login=(req:Request,res:Response,next:NextFunction):Response=>{
        throw new NotFoundException("error logging in",{cause:"user not found"})
    }
}
export default new authenticationservice();