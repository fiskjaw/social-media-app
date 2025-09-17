"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../../utils/response/error.response");
//import { ISignupDTO } from "./auth.dto";
//import { json } from "zod";
class authenticationservice {
    signup = async (req, res, next) => {
        const { username, email, password } = req.body;
        console.log({ username, email, password });
        return res.status(201).json({ message: "User created successfully" });
    };
    login = (req, res, next) => {
        throw new error_response_1.NotFoundException("error logging in", { cause: "user not found" });
    };
}
exports.default = new authenticationservice();
//# sourceMappingURL=auth.service.js.map