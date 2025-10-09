import { Schema, Types } from "mongoose";
import { HydratedDocument } from "mongoose";
export declare enum allowcommentEnum {
    ALLOW = "ALLOW",
    DENY = "DENY"
}
export declare enum availabilityEnum {
    PUBLIC = "PUBLIC",
    ONLY = "ONLY",
    FRIENDS = "FRIENDS"
}
export declare enum actionEnum {
    LIKE = "LIKE",
    UNLIKE = "UNLIKE"
}
export interface IPost {
    content?: string;
    attachments?: string[];
    allowcomment?: allowcommentEnum;
    availability?: availabilityEnum;
    tags?: Types.ObjectId[];
    likes?: Types.ObjectId[];
    createdby: Types.ObjectId;
    freezedby?: Types.ObjectId;
    freezedAt?: Date;
    restoredby?: Types.ObjectId;
    restoredAt?: Date;
    createdat: Date;
    updatedAt?: Date;
    assetspostFolderId?: string;
}
export declare const postschema: Schema<IPost, import("mongoose").Model<IPost, any, any, any, import("mongoose").Document<unknown, any, IPost, any, {}> & IPost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPost>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IPost> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Postmodel: import("mongoose").Model<any, {}, {}, {}, any, any> | import("mongoose").Model<IPost, {}, {}, {}, import("mongoose").Document<unknown, {}, IPost, {}, {}> & IPost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export type Htoken = HydratedDocument<IPost>;
//# sourceMappingURL=post.model.d.ts.map