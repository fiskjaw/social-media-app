"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../../utils/security/token");
const token_repositories_1 = require("../../Db/repositories/token.repositories");
const token_model_1 = require("../../Db/models/token.model");
const user_repositories_1 = require("../../Db/repositories/user.repositories");
const user_model_1 = require("../../Db/models/user.model");
const token_2 = require("../../utils/security/token");
const token_3 = require("../../utils/security/token");
class Userservice {
    _usermodel = new user_repositories_1.UserRepository(user_model_1.Usermodel);
    _tokenmodel = new token_repositories_1.TokenRepository(token_model_1.Tokenmodel);
    constructor() { }
    getprofile = async (req, res, next) => {
        return res.status(200).json({ message: "login successful", decoded: req.decoded, user: req.user });
    };
    logout = async (req, res) => {
        const { flag } = req.body;
        let statuscode = 200;
        let update = {};
        switch (flag) {
            case token_1.logoutEnum.all:
                update.changecredentialstime = new Date();
                break;
            case token_1.logoutEnum.only:
                await (0, token_3.createrevoketoken)(req.decoded);
                await this._tokenmodel.create({ data: [{ jti: req.decoded?.jti, expiresin: req.decoded?.iat + Number(process.env.REFRESH_EXPIRY_IN), userid: req.decoded?._id }], options: { validateBeforeSave: true } });
                statuscode = 204;
                break;
            default:
                break;
        }
        await this._usermodel.updateOne({ filter: { _id: req.decoded?._id }, update });
        return res.status(statuscode).json({ message: "logout successful", decoded: req.decoded, user: req.user });
    };
    refreshtoken = async (req, res) => {
        const credentials = await (0, token_2.createlogincredentials)(req.user);
        await (0, token_3.createrevoketoken)(req.decoded);
        return res.status(201).json({ message: "refresh token successful", data: credentials });
    };
}
exports.default = new Userservice();
//# sourceMappingURL=users.service.js.map