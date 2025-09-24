import { IUser } from "../models/user.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";
import { badRequestException } from "../../utils/response/error.response";
import { HydratedDocument } from "mongoose";

import { CreateOptions } from "mongoose";




export class UserRepository extends DatabaseRepository<IUser>{
    constructor(protected override readonly model:Model<IUser>){super(model)}

    async createuser({data,options,}:{data: Partial<IUser>[],options?:CreateOptions}):Promise<HydratedDocument<IUser>>{
    const [user]=(await this.create({data,options})||[]);
    if(!user) throw new badRequestException("user not created");
    return user;
   
    
}
}