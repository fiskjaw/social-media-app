import { createTransport , Transporter} from "nodemailer";
import Mail from "nodemailer/lib/mailer"

import SMTPTransport from "nodemailer/lib/smtp-transport"
// Create a test account or replace with real credentials.
export const sendEmail = async(data:Mail.Options):Promise<void>=>{

    const transporter:Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> = createTransport({
       service:"gmail",
       auth: {
         user: process.env.email,
         pass: process.env.pass
       }
     });

const info = await transporter.sendMail({
    ...data,
    from: `"khaled waleed" <${process.env.email}>`,
})
}
