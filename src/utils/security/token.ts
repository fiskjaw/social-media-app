import {Secret,sign,SignOptions} from "jsonwebtoken";



export const generatetoken = async({
    payload,
    Secret=process.env.ACCESS_USER_SIGNATURE as string,
    options={expiresIn:Number(process.env.ACCESS_TOKEN_EXPIRY) },
}:{payload:object;Secret?:Secret;options?:SignOptions}):
Promise<string>=>{
    return await sign(payload,Secret,options)}
