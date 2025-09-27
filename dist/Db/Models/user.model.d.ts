import { Schema, Types } from "mongoose";
export declare enum GenderEnum {
    MALE = "male",
    FEMALE = "female"
}
export declare enum RoleEnum {
    USER = "user",
    ADMIN = "admin"
}
export interface IUser {
    _id: Types.ObjectId;
    firstname?: string;
    lastname?: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    confirmemailotp?: string;
    updatedAt?: Date;
    resetpasswordotp?: string;
    changecredentialstime?: string;
    phone?: string;
    address?: string;
    confirmedAt?: Date;
    gender: GenderEnum;
    role: RoleEnum;
}
export declare const userschema: Schema<IUser, import("mongoose").Model<IUser, any, any, any, import("mongoose").Document<unknown, any, IUser, any, {}> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IUser, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IUser>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IUser> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const Usermodel: import("mongoose").Model<any, {}, {}, {}, any, any> | import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map