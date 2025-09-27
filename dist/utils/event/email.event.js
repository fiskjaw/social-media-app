"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailevent = void 0;
const events_1 = require("events");
const send_email_1 = require("../email/send.email");
exports.emailevent = new events_1.EventEmitter();
exports.emailevent.on("confirmemail", async (data) => {
    try {
        await (0, send_email_1.sendEmail)({
            to: data.to,
            subject: "confirm email",
            html: `
        <h1>Hello ${data.username}</h1>
        <p>Your OTP is: <b>${data.otp}</b></p>
      `,
        });
        console.log("email sent", data.to);
    }
    catch (error) {
        console.log("fail to send email", error);
    }
});
//# sourceMappingURL=email.event.js.map