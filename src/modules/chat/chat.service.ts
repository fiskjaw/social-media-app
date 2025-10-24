import { Request,Response } from "express";
import { IGetchatdto, ISayhidto } from "./chat.dto";
import { ChatRepository } from "../../Db/repositories/chat.repositories";
import { Chatmodel } from "../../Db/models/chat.model";
import { Usermodel } from "../../Db/models/user.model";
import { UserRepository } from "../../Db/repositories/user.repositories";
import { Types } from "mongoose";
import { NotFoundException } from "../../utils/response/error.response";
export class Chatservice{
    private _chatmodel=new ChatRepository(Chatmodel)
    private _usermodel = new UserRepository(Usermodel)
    constructor (){}

 getchat=async (req:Request,res:Response)=>{
    const {userid} =req.params as IGetchatdto
    const chat = await this._chatmodel.findOne({
        filter:{
            participants:{
                $all:[Types.ObjectId.createFromHexString(userid),req.user?._id as Types.ObjectId]
            },
            group:{$exists:false}
        },
        options:{populate:"participants"}
    })
    if (!chat){
        throw new NotFoundException("fail to find chat")
    }

    return res.status(200).json({message:" done",data:{chat}});
 }
    




    sayhi=({message,socket,callback}:ISayhidto)=>{
        try {
            console.log(message);

            callback? callback("i recieved your message"):undefined
        }
        catch(error){
            socket.emit("custom_error",error)
        }


    }
}
export default new Chatservice;