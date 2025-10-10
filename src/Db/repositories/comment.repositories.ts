import { IComment } from "../models/comment.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";





export class CommentRepository extends DatabaseRepository<IComment>{

    constructor(protected override readonly model:Model<IComment>){super(model)}

    
}