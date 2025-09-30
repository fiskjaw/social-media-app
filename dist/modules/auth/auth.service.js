"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../../utils/response/error.response");
const user_model_1 = require("../../Db/models/user.model");
const user_repositories_1 = require("../../Db/repositories/user.repositories");
const generateotp_1 = require("../../utils/generateotp");
const email_event_1 = require("../../utils/event/email.event");
const error_response_2 = require("../../utils/response/error.response");
const error_response_3 = require("../../utils/response/error.response");
const hash_1 = require("../../utils/security/hash");
const token_1 = require("../../utils/security/token");
class authenticationservice {
    _usermodel = new user_repositories_1.UserRepository(user_model_1.Usermodel);
    constructor() { }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        const checkuser = await this._usermodel.findOne({ filter: { email }, options: { lean: true } });
        if (checkuser)
            throw new error_response_2.conflictException("user already exist");
        const otp = (0, generateotp_1.generateotp)();
        const user = (await this._usermodel.createuser({ data: [{ username, email, password: await (0, hash_1.generatehash)(password), confirmemailotp: await (0, hash_1.generatehash)(otp.toString()) }], options: { validateBeforeSave: true }, }));
        email_event_1.emailevent.emit("confirmemail", { to: email, username, otp });
        return res.status(201).json({ message: "User created successfully", user, decoded: user });
    };
    login = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await this._usermodel.findOne({ filter: { email } });
        if (!user)
            throw new error_response_1.NotFoundException("User not found");
        if (!(0, hash_1.comparehash)(password, user.password))
            throw new error_response_3.badRequestException("Invalid password");
        const logincredential = await (0, token_1.createlogincredentials)(user);
        return res.status(200).json({ message: "Login successful", credentials: logincredential });
    };
    confirmemail = async (req, res) => {
        const { email, otp } = req.body;
        if (!email || !otp) {
            throw new error_response_3.badRequestException("Email and OTP are required");
        }
        const user = await this._usermodel.findOne({
            filter: { email, confirmemailotp: { $exists: true }, confirmedAt: { $exists: false } },
        });
        if (!user)
            throw new error_response_1.NotFoundException("User not found");
        // Ensure otp is a string and await the compare
        const isMatch = await (0, hash_1.comparehash)(otp.toString(), user.confirmemailotp);
        if (!isMatch)
            throw new error_response_3.badRequestException("Invalid OTP");
        await this._usermodel.updateOne({
            filter: { email },
            update: {
                confirmedAt: Date.now(),
                $unset: { confirmemailotp: 1 },
            },
        });
        return res.status(200).json({
            message: "Email confirmed successfully",
            user, decoded: user
        });
    };
}
exports.default = new authenticationservice();
//# sourceMappingURL=auth.service.js.map