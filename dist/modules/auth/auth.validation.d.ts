import z from "zod";
export declare const loginschema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strict>;
};
export declare const signupschema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
        username: z.ZodString;
        confirmpassword: z.ZodString;
        firstname: z.ZodString;
        lastname: z.ZodString;
    }, z.core.$strict>;
};
export declare const confirmemailschema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        otp: z.ZodString;
    }, z.core.$strict>;
};
//# sourceMappingURL=auth.validation.d.ts.map