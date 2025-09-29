import { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { HUSER, RoleEnum } from "../../Db/models/user.model";
export declare enum signaturelevelenum {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare enum TokenEnum {
    ACCESS = "ACCESS",
    REFRESH = "REFRESH"
}
export declare const generatetoken: ({ payload, Secret, options, }: {
    payload: object;
    Secret?: Secret;
    options?: SignOptions;
}) => Promise<string>;
export declare const verifytoken: ({ token, Secret, }: {
    token: string;
    Secret?: Secret;
}) => Promise<JwtPayload>;
export declare const getsignature: (role?: RoleEnum) => Promise<signaturelevelenum>;
export declare const getsignatures: (signaturelevel?: signaturelevelenum) => Promise<{
    access_signature: string;
    refresh_signature: string;
}>;
export declare const createlogincredentials: (user: HUSER) => Promise<{
    accesstoken: string;
    refreshtoken: string;
}>;
export declare const decodedtoken: ({ authorization, tokentype, }: {
    authorization: string;
    tokentype?: TokenEnum;
}) => Promise<{
    user: any;
    decoded: JwtPayload;
}>;
//# sourceMappingURL=token.d.ts.map