import { Chatservice } from "./chat.service";
import { IAuthSocket } from "../gateway/gateway.dto";


export class chatEvent{
    private _chatService=new Chatservice();
    constructor(){}



    sayhi=(socket:IAuthSocket)=>{
      return  socket.on("sayhi",(message,callback)=>{
        this._chatService
      });
    }


    sendmessage =(socket:IAuthSocket)=>{
      return socket.on("sendmessage",(data:{content:string,sendto:string})=>{
        this._chatService.sendmessage({...data,socket})
      })
    }
}