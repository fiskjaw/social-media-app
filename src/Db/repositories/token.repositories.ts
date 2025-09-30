import { IToken } from "../models/token.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";




export class TokenRepository extends DatabaseRepository<IToken>{
    constructor(protected override readonly model:Model<IToken>){super(model)}

    
}