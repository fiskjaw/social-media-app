import { IUser } from "../models/user.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";
import { HydratedDocument } from "mongoose";
import { CreateOptions } from "mongoose";
export declare class UserRepository extends DatabaseRepository<IUser> {
    protected readonly model: Model<IUser>;
    constructor(model: Model<IUser>);
    createuser({ data, options, }: {
        data: Partial<IUser>[];
        options?: CreateOptions;
    }): Promise<HydratedDocument<IUser>>;
}
//# sourceMappingURL=user.repositories.d.ts.map