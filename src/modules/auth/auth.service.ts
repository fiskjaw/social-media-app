import type { NextFunction, Request, Response } from "express";
import {  NotFoundException } from "../../utils/response/error.response";
import { ISignupDTO } from "./auth.dto";
import {Usermodel} from "../../Db/models/user.model";
import {UserRepository } from "../../Db/repositories/user.repositories";
import { generateotp } from "../../utils/generateotp";
import { emailevent } from "../../utils/event/email.event";
import { conflictException } from "../../utils/response/error.response";
import { badRequestException } from "../../utils/response/error.response";

import { comparehash, generatehash } from "../../utils/security/hash";
import { createlogincredentials } from "../../utils/security/token";


class authenticationservice{
    private _usermodel= new UserRepository(Usermodel);
    constructor(){}
signup=async(req:Request,res:Response):Promise<Response>=>{
    const {username,email,password}:ISignupDTO=req.body;
    const checkuser =await this._usermodel.findOne({filter:{email},options:{lean:true}});
   
    
    
    if (checkuser) throw new conflictException("user already exist");
const otp =generateotp();
    const user=(await this._usermodel.createuser({data:[{username,email,password:await generatehash(password),confirmemailotp:await generatehash(otp.toString())}],options:{validateBeforeSave:true},}));
    emailevent.emit("confirmemail",{to:email,username,otp});
   
    return res.status(201).json({message:"User created successfully",user,decoded:user});
    }
 login=async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
      const {email,password}=req.body;
      const user =await this._usermodel.findOne({filter:{email}});
      if (!user) throw new NotFoundException("User not found");
      if(!comparehash(password,user.password)) throw new badRequestException("Invalid password");
    
     const logincredential= await createlogincredentials(user)
      return res.status(200).json({message:"Login successful",refresh_token:logincredential.refreshtoken,accesstoken:logincredential.accesstoken});
    }
confirmemail = async (req: Request, res: Response): Promise<Response> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new badRequestException("Email and OTP are required");
  }

  const user = await this._usermodel.findOne({
    filter: { email, confirmemailotp: { $exists: true }, confirmedAt: { $exists: false } },
  });

  if (!user) throw new NotFoundException("User not found");

  // Ensure otp is a string and await the compare
  const isMatch = await comparehash(otp.toString(), user.confirmemailotp);

  if (!isMatch) throw new badRequestException("Invalid OTP");

  await this._usermodel.updateOne({
    filter: { email },
    update: {
      confirmedAt: Date.now(),
      $unset: { confirmemailotp: 1 },
    },
  });

  return res.status(200).json({
    message: "Email confirmed successfully",
    user,decoded:user
  });
};



}
export default new authenticationservice();