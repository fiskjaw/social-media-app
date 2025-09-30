import { Schema, Types } from "mongoose";
import { HydratedDocument } from "mongoose";
export interface IToken {
    jti: string;
    expiresin: number;
    userid: Types.ObjectId;
}
export declare const tokenschema: Schema<IToken, import("mongoose").Model<IToken, any, any, any, import("mongoose").Document<unknown, any, IToken, any, {}> & IToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IToken>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IToken> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Tokenmodel: import("mongoose").Model<any, {}, {}, {}, any, any> | import("mongoose").Model<IToken, {}, {}, {}, import("mongoose").Document<unknown, {}, IToken, {}, {}> & IToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export type Htoken = HydratedDocument<IToken>;
//# sourceMappingURL=token.model.d.ts.map