import {JwtPayload, Secret,sign,SignOptions} from "jsonwebtoken";
import { HUSER, RoleEnum } from "../../Db/models/user.model";
import { UnAuthorizedException } from "../response/error.response";
import { UserRepository } from "../../Db/repositories/user.repositories";
import { verify } from "jsonwebtoken";
import { Usermodel } from "../../Db/models/user.model";
import { NotFoundException } from "../response/error.response";
import {v4 as uuid} from "uuid";
import { TokenRepository } from "../../Db/repositories/token.repositories";
import { Tokenmodel } from "../../Db/models/token.model";

export enum signaturelevelenum{
    USER="USER",
    ADMIN="ADMIN"
}
export enum TokenEnum{
        ACCESS="ACCESS",
        REFRESH="REFRESH"
}

export enum logoutEnum{
        only="Only",
        all="All"
}
export const generatetoken = async({
    payload,
    Secret=process.env.ACCESS_USER_SIGNATURE as string,
    options={expiresIn:Number(process.env.ACCESS_TOKEN_EXPIRY) },
}:{payload:object;Secret?:Secret;options?:SignOptions}):
Promise<string>=>{
    return await sign(payload,Secret,options)};


export const verifytoken = async({
    token,
    Secret=process.env.ACCESS_USER_SIGNATURE as string,
     }:{token:string;Secret?:Secret;}):
Promise<JwtPayload>=>{
    return (await verify(token,Secret)) as JwtPayload;};


    
    export const getsignature=async (role:RoleEnum=RoleEnum.USER)=>{
       let signaturelevel:signaturelevelenum=signaturelevelenum.USER;
       switch(role){
           case RoleEnum.USER:
               signaturelevel=signaturelevelenum.USER;
               break;
           case RoleEnum.ADMIN:
               signaturelevel=signaturelevelenum.ADMIN;
               default:
               break;
       }
       return signaturelevel;
    }
    export const getsignatures=async (signaturelevel:signaturelevelenum=signaturelevelenum.USER)=>{
        let signatures:{access_signature:string,refresh_signature:string}={access_signature:"",refresh_signature:""}
        switch(signaturelevel){
            case signaturelevelenum.USER:
                signatures.access_signature=process.env.ACCESS_USER_SIGNATURE as string;
                signatures.refresh_signature=process.env.REFRESH_USER_SIGNATURE as string;
                break;
            case signaturelevelenum.ADMIN:
                signatures.access_signature=process.env.ACCESS_ADMIN_SIGNATURE as string;
                signatures.refresh_signature=process.env.REFRESH_ADMIN_SIGNATURE as string;
                default:
                break;
        }
        return signatures;
    }


    export const createlogincredentials=async(user:HUSER)=>{

        const signaturelevel=await getsignature(user.role);
        const signatures=await getsignatures(signaturelevel);
        const jwtid=uuid();
        const accesstoken=await generatetoken({payload:{_id:user._id},Secret:signatures.access_signature,options:{expiresIn:Number(process.env.ACCESS_EXPIRY_IN),jwtid}})
        const refreshtoken=await generatetoken({payload:{_id:user._id},Secret:signatures.refresh_signature,options:{expiresIn:Number(process.env.REFRESH_EXPIRY_IN),jwtid}})
        return {accesstoken,refreshtoken}
    }

export const decodedtoken = async ({
  authorization,
  tokentype = TokenEnum.ACCESS,
}: {
  authorization: string;
  tokentype?: TokenEnum;
}) => {
  const usermodel = new UserRepository(Usermodel);
  const tokenmodel = new TokenRepository(Tokenmodel);
  // Split the header into role and token
  const [role, token] = authorization.split(" ");
  if (!role || !token) {
    throw new UnAuthorizedException(
      "Invalid token format, expected: ROLE <token>"
    );
  }

  // Check role against your enum
  if (!(role in signaturelevelenum)) {
    throw new UnAuthorizedException("Invalid role in authorization header");
  }

  const signatures = await getsignatures(role as signaturelevelenum);

  const secret =
    tokentype === TokenEnum.REFRESH
      ? signatures.refresh_signature
      : signatures.access_signature;

  const decoded = await verifytoken({ token, Secret: secret });

 
  if (!decoded._id || !decoded.iat) {
    throw new UnAuthorizedException("Invalid token payload");
  }
  
  if (await tokenmodel.findOne({filter:{jti:decoded.jti}})) throw new UnAuthorizedException("invalid token");
  const user = await usermodel.findOne({
    filter: { _id: decoded._id },
   
  });

  if (!user) throw new NotFoundException("User not found with this token");

  if (user.changecredentialstime?.getTime()||0>decoded.iat*1000)
  throw new UnAuthorizedException("token expired");
    
  
  return { user, decoded };

  
};
  
    export const createrevoketoken=async(decoded:JwtPayload)=>{
const tokenmodel = new TokenRepository(Tokenmodel);
const [results]=await tokenmodel.create({data:[{jti:decoded.jti as string,expiresin:(decoded.iat as number)+Number(process.env.REFRESH_EXPIRY_IN),userid:decoded._id}],
options:{validateBeforeSave:true}})||[];

if(!results) throw new UnAuthorizedException("invalid token");

    }