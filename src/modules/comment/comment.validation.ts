import z from "zod";
import { generalfields } from "../../middlewares/validation.middleware";
import { filevalidation } from "../../utils/multer/cloud.multer";



export const createcommentschema={
    params:z.strictObject({
        postid:generalfields.id,
        
    }),
    body:z.strictObject({
       content:z.string().min(3).max(50000).optional(),
       attachments:z.array(generalfields.file(filevalidation.images)).max(3).optional(),
       tags:z.array(generalfields.id).max(10).optional()
    }).superRefine((data,ctx) => {
        if (!data.attachments?.length&&!data.content){
            ctx.addIssue({
                code:"custom",
                path:["content"],
                message:"atleast one attachment or content is required"
            })
        }
        if (data.tags?.length&&data.tags.length !==[... new Set(data.tags)].length){
            ctx.addIssue({
                code:"custom",
                path:["tags"],
                message:"tags must be unique"
            })
        }
    })
}