import z from "zod";
import { actionEnum, allowcommentEnum, availabilityEnum } from "../../Db/models/post.model";
import { generalfields } from "../../middlewares/validation.middleware";
import { filevalidation } from "../../utils/multer/cloud.multer";






export const createpostschema ={
    body:z.strictObject({
        content:z.string().min(1).max(1000).optional(),
        attachments:z.array(generalfields.file(filevalidation.images)).max(3).optional(), 
        allowcomment:z.enum(allowcommentEnum).default(allowcommentEnum.ALLOW),
        availability:z.enum(availabilityEnum).default(availabilityEnum.PUBLIC),
        tags:z.array(generalfields.id).max(5).optional(),
        likes:z.array(z.string()).optional()
    }).superRefine((data,ctx) => {
        if (!data.attachments?.length&&!data.content){
            ctx.addIssue({
                code:"custom",
                path:["attachments"],
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




export const likeUnlikeschema ={
    params:z.strictObject({
         postId:generalfields.id
        
    }),
    query:z.strictObject({
        action:z.enum(actionEnum).default(actionEnum.LIKE)
    })
       
    
}