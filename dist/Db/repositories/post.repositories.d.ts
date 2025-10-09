import { IPost } from "../models/post.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";
export declare class PostRepository extends DatabaseRepository<IPost> {
    protected readonly model: Model<IPost>;
    constructor(model: Model<IPost>);
}
//# sourceMappingURL=post.repositories.d.ts.map