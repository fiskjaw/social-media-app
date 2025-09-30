import { Request,Response,NextFunction } from "express";
import { ILogoutDTO } from "./user.dto";
import { logoutEnum } from "../../utils/security/token";
import { UpdateQuery } from "mongoose";
import { IUser } from "../../Db/models/user.model";
import { TokenRepository } from "../../Db/repositories/token.repositories";
import { Tokenmodel } from "../../Db/models/token.model";
import { UserRepository } from "../../Db/repositories/user.repositories";
import { Usermodel } from "../../Db/models/user.model";
import { HUSER } from "../../Db/models/user.model";
import { createlogincredentials } from "../../utils/security/token";
import { createrevoketoken } from "../../utils/security/token";
import { JwtPayload } from "jsonwebtoken";
class Userservice{
    private _usermodel=new UserRepository(Usermodel);
    private _tokenmodel=new TokenRepository (Tokenmodel);
    constructor(){}


    getprofile = async (req:Request,res:Response,next:NextFunction)=>{
return res.status(200).json({message:"login successful",decoded:req.decoded,user:req.user});}

 logout = async (req:Request,res:Response)=>{
const {flag}:ILogoutDTO= req.body;
let statuscode =200;
let update:UpdateQuery<IUser>={};
switch (flag) {
    case logoutEnum.all:
        update.changecredentialstime=new Date();
        
        break;
     case logoutEnum.only:
      await createrevoketoken(req.decoded as JwtPayload);
    await this._tokenmodel.create({data:[{jti:req.decoded?.jti as string,expiresin:(req.decoded?.iat as number)+Number(process.env.REFRESH_EXPIRY_IN),userid:req.decoded?._id}],options:{validateBeforeSave:true}});
    statuscode=204;
break;
    
    default:
        break;
}


await this._usermodel.updateOne({filter:{_id:req.decoded?._id},update});


return res.status(statuscode).json({message:"logout successful",decoded:req.decoded,user:req.user});}

refreshtoken =async (req:Request,res:Response):Promise<Response>=>{
    
    
    const credentials = await createlogincredentials(req.user as HUSER);
     await createrevoketoken(req.decoded as JwtPayload);
    return res.status(201).json({message:"refresh token successful",data:credentials});


}








}
export default new Userservice();