"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
// Create a test account or replace with real credentials.
const sendEmail = async (data) => {
    const transporter = (0, nodemailer_1.createTransport)({
        service: "gmail",
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    });
    const info = await transporter.sendMail({
        ...data,
        from: `"khaled waleed" <${process.env.email}>`,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=send.email.js.map