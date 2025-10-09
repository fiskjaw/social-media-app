import type { Response, Request, NextFunction } from "express";
import { ZodType } from "zod";
import z from "zod";
type Reqtypekey = keyof Request;
type schemaType = Partial<Record<Reqtypekey, ZodType>>;
export declare const validation: (schema: schemaType) => (req: Request, res: Response, next: NextFunction) => NextFunction;
export declare const generalfields: {
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    confirmpassword: z.ZodString;
    otp: z.ZodString;
    file: (mimetype: string[]) => z.ZodObject<{
        fieldname: z.ZodString;
        originalname: z.ZodString;
        encoding: z.ZodString;
        mimetype: z.ZodString;
        size: z.ZodNumber;
        buffer: z.ZodOptional<z.ZodAny>;
        path: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    id: z.ZodString;
};
export {};
//# sourceMappingURL=validation.middleware.d.ts.map