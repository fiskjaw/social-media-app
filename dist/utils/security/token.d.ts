import { Secret, SignOptions } from "jsonwebtoken";
export declare const generatetoken: ({ payload, Secret, options, }: {
    payload: object;
    Secret?: Secret;
    options?: SignOptions;
}) => Promise<string>;
//# sourceMappingURL=token.d.ts.map