import type { NextFunction, Request, Response } from "express";
import {  NotFoundException } from "../../utils/response/error.response";
import { ISignupDTO } from "./auth.dto";
import {Usermodel} from "../../Db/models/user.model";
import {UserRepository } from "../../Db/repositories/user.repositories";
//import { ISignupDTO } from "./auth.dto";
import { conflictException } from "../../utils/response/error.response";
//import { json } from "zod";
import { generatehash } from "../../utils/security/hash";
import { sendEmail } from "../../utils/email/send.email";
class authenticationservice{
    private _usermodel= new UserRepository(Usermodel);
    constructor(){}
    signup=async(req:Request,res:Response)
    :Promise<Response>=>{
    const {username,email,password}:ISignupDTO=req.body;
    const checkuser =await this._usermodel.findOne({filter:{email},options:{lean:true}});
   
    
    
    if (checkuser) throw new conflictException("user already exist");

    const user=(await this._usermodel.createuser({data:[{username,email,password:await generatehash(password)}],options:{validateBeforeSave:true},}));
    await sendEmail({to:email,html:"khaled waleed "})
   
    return res.status(201).json({message:"User created successfully",user});
    }
    login=(req:Request,res:Response,next:NextFunction):Response=>{
        throw new NotFoundException("error logging in",{cause:"user not found"})
    }
}
export default new authenticationservice();