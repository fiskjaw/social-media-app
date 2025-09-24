import {hash,compare} from "bcrypt";



export const generatehash =async(
    plaintext:string,
    saltRound:number=Number(process.env.saltRound as string)
):Promise<string>=>{return await hash(plaintext,saltRound)};

export const comparehash =async(
    plaintext:string,
    hash:string
):Promise<boolean>=>{return await compare(plaintext,hash)};