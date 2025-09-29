import z from "zod";
import { generalfields } from "../../middlewares/validation.middleware";

export const loginschema={
    body:z.strictObject({
    
       email:generalfields.email,
       password:generalfields.password,
      
    })
}
export const signupschema={
    body:loginschema.body
    .extend({
       username:generalfields.username,
       confirmpassword:generalfields.confirmpassword,
       firstname:generalfields.username,
       lastname:generalfields.username
    }).superRefine((data,ctx) =>{
        if (data.password!==data.confirmpassword){
             ctx.addIssue({
           code:"custom",
         path:["confirmpassword"],
         message:"password mismatch"
        })
             }

    })
}

export const confirmemailschema={
    body:z.strictObject({
    
       email:generalfields.email,
      otp:generalfields.otp,
      
    })
}