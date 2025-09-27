import Mail from "nodemailer/lib/mailer";
import { EventEmitter } from "events";
import { sendEmail} from "../email/send.email";






export const emailevent = new EventEmitter();

interface IEmail extends Mail.Options{
    otp:number;
    username:string;
}

emailevent.on("confirmemail",async(data:IEmail)=>{
try {
await sendEmail({
    to:data.to,
    subject:"confirm email",
    html: `
        <h1>Hello ${data.username}</h1>
        <p>Your OTP is: <b>${data.otp}</b></p>
      `,
})
 
 console.log("email sent",data.to);
 
} catch (error) {
    console.log("fail to send email",error);
}



})