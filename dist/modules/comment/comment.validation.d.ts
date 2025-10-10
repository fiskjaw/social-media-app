import z from "zod";
export declare const createcommentschema: {
    params: z.ZodObject<{
        postid: z.ZodString;
    }, z.core.$strict>;
    body: z.ZodObject<{
        content: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            fieldname: z.ZodString;
            originalname: z.ZodString;
            encoding: z.ZodString;
            mimetype: z.ZodString;
            size: z.ZodNumber;
            buffer: z.ZodOptional<z.ZodAny>;
            path: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>;
};
//# sourceMappingURL=comment.validation.d.ts.map