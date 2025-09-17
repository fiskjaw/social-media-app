import z from "zod";
import { generalfields } from "../../middlewares/validation.middleware";

export const signupschema={
    body:z.strictObject({
       username:generalfields.username,
       email:generalfields.email,
       password:generalfields.password,
       confirmpassword:generalfields.confirmpassword
    }).superRefine((data,ctx) =>{
        if (data.password!==data.confirmpassword){
             ctx.addIssue({
           code:"custom",
         path:["confirmpassword"],
         message:"password mismatch"
        })
             }
if (data.username.split(" ").length !=2){
    ctx.addIssue({
        code:"custom",
        path:["username"],
        message:"username must be two words"
    })
}
    })
}