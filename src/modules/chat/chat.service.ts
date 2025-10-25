import { Request,Response } from "express";
import { IGetchatdto, ISayhidto } from "./chat.dto";
import { ChatRepository } from "../../Db/repositories/chat.repositories";
import { Chatmodel } from "../../Db/models/chat.model";
import { Usermodel } from "../../Db/models/user.model";
import { UserRepository } from "../../Db/repositories/user.repositories";
import { Types } from "mongoose";
import { NotFoundException } from "../../utils/response/error.response";
import { ISendmessagedto } from "./chat.dto";
import { string } from "zod";
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
    
sendmessage=async({content,socket,sendto}:ISendmessagedto)=>{
    try {
        const createdby=socket.credentials?.user._id as Types.ObjectId;
        console.log({content,createdby,sendto});
        //check if user exist
        const user = await this._usermodel.findOne({
            filter:{
                _id:Types.ObjectId.createFromHexString(sendto),
                friends:{$in:[createdby]}
            }
        })
        if(!user) throw new NotFoundException("user not found")
        // check for previous chat
        const chat = await this._chatmodel.findOneAndUpdate({
            filter:{
            participants:{
                    $all:[Types.ObjectId.createFromHexString(sendto)
                    ,createdby as Types.ObjectId]
            },
            group:{$exists:false}
        },
        update:{
            $addToSet:{messages:{content,createdby}}
        }
        })
        //if chat is not found 
        if (!chat){
            const [newchat] = await this._chatmodel.create({
                data:[{
                   createdby,
                   messages:[{content,createdby}],
                   participants:[createdby,Types.ObjectId.createFromHexString(sendto)]
                }]
            })||[];
             if (!newchat){
            throw new NotFoundException("fail to send message")
        }
            socket.emit("message_sent",newchat)
        }
       
        
    } catch (error) {
        socket.emit("custom_error",error)
    }
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