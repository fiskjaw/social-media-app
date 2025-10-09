import z from "zod";
import { actionEnum, allowcommentEnum, availabilityEnum } from "../../Db/models/post.model";
export declare const createpostschema: {
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
        allowcomment: z.ZodDefault<z.ZodEnum<typeof allowcommentEnum>>;
        availability: z.ZodDefault<z.ZodEnum<typeof availabilityEnum>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        likes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>;
};
export declare const likeUnlikeschema: {
    params: z.ZodObject<{
        postId: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{
        action: z.ZodDefault<z.ZodEnum<typeof actionEnum>>;
    }, z.core.$strict>;
};
//# sourceMappingURL=post.validation.d.ts.map