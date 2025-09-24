"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../../utils/response/error.response");
const user_model_1 = require("../../Db/models/user.model");
//import { ISignupDTO } from "./auth.dto";
//import { json } from "zod";
class authenticationservice {
    _usermodel = user_model_1.Usermodel;
    constructor() {
    }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        const [user] = await this._usermodel.create([{ username, email, password }]);
        return res.status(201).json({ message: "User created successfully", user });
    };
    login = (req, res, next) => {
        throw new error_response_1.NotFoundException("error logging in", { cause: "user not found" });
    };
}
exports.default = new authenticationservice();
//# sourceMappingURL=auth.service.js.map