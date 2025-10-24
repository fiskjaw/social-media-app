import { chatEvent } from "./chat.event";
import { IAuthSocket } from "../gateway/gateway.dto";



export class Chatgateway{
    private _chatEvent=new chatEvent
    constructor(){}

    register =(socket:IAuthSocket)=>{
       this._chatEvent.sayhi(socket)
    }
}