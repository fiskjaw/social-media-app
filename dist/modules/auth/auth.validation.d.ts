import z from "zod";
export declare const signupschema: {
    body: z.ZodObject<{
        username: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        confirmpassword: z.ZodString;
        firstname: z.ZodString;
        lastname: z.ZodString;
    }, z.core.$strict>;
};
//# sourceMappingURL=auth.validation.d.ts.map