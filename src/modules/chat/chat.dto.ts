
import { IAuthSocket } from "../gateway/gateway.dto"
import { getchatschema } from "./chat.validation"
import z from "zod"



export interface ISayhidto{
    message:string
    callback:any
    socket:IAuthSocket
}
export interface ISendmessagedto{
    content:string
    sendto:string
    socket:IAuthSocket
}

export type IGetchatdto=z.infer<typeof getchatschema.params>;