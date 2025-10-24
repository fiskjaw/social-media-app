import { IChat } from "../models/chat.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";





export class ChatRepository extends DatabaseRepository<IChat>{

    constructor(protected override readonly model:Model<IChat>){super(model)}

    
}