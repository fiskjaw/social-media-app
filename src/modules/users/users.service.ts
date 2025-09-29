import { Request,Response,NextFunction } from "express";




class Userservice{
    constructor(){}


    getprofile = async (req:Request,res:Response,next:NextFunction)=>{
        console.log("req.user",req.user);
        console.log("req.decoded",req.decoded);
        
return res.status(200).json({message:"done",user:req.user,decoded:req.decoded});

    }
}
export default new Userservice();