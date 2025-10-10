import { Schema, Types } from "mongoose";
import { HydratedDocument } from "mongoose";
export interface IComment {
    content?: string;
    attachments?: string[];
    postid?: Types.ObjectId;
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
    commentid?: Types.ObjectId;
}
export declare const commentschema: Schema<IComment, import("mongoose").Model<IComment, any, any, any, import("mongoose").Document<unknown, any, IComment, any, {}> & IComment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IComment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IComment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IComment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Commentmodel: import("mongoose").Model<any, {}, {}, {}, any, any> | import("mongoose").Model<IComment, {}, {}, {}, import("mongoose").Document<unknown, {}, IComment, {}, {}> & IComment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export type Hcomment = HydratedDocument<IComment>;
//# sourceMappingURL=comment.model.d.ts.map