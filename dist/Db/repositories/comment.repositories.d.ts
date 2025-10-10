import { IComment } from "../models/comment.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";
export declare class CommentRepository extends DatabaseRepository<IComment> {
    protected readonly model: Model<IComment>;
    constructor(model: Model<IComment>);
}
//# sourceMappingURL=comment.repositories.d.ts.map