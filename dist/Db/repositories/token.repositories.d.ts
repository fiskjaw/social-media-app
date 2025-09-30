import { IToken } from "../models/token.model";
import { DatabaseRepository } from "./database.repositories";
import { Model } from "mongoose";
export declare class TokenRepository extends DatabaseRepository<IToken> {
    protected readonly model: Model<IToken>;
    constructor(model: Model<IToken>);
}
//# sourceMappingURL=token.repositories.d.ts.map