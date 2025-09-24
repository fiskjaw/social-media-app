"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../../utils/response/error.response");
const user_model_1 = require("../../Db/models/user.model");
const user_repositories_1 = require("../../Db/repositories/user.repositories");
//import { ISignupDTO } from "./auth.dto";
const error_response_2 = require("../../utils/response/error.response");
//import { json } from "zod";
const hash_1 = require("../../utils/security/hash");
const send_email_1 = require("../../utils/email/send.email");
class authenticationservice {
    _usermodel = new user_repositories_1.UserRepository(user_model_1.Usermodel);
    constructor() { }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        const checkuser = await this._usermodel.findOne({ filter: { email }, options: { lean: true } });
        if (checkuser)
            throw new error_response_2.conflictException("user already exist");
        const user = (await this._usermodel.createuser({ data: [{ username, email, password: await (0, hash_1.generatehash)(password) }], options: { validateBeforeSave: true }, }));
        await (0, send_email_1.sendEmail)({ to: email, html: "khaled waleed " });
        return res.status(201).json({ message: "User created successfully", user });
    };
    login = (req, res, next) => {
        throw new error_response_1.NotFoundException("error logging in", { cause: "user not found" });
    };
}
exports.default = new authenticationservice();
//# sourceMappingURL=auth.service.js.map