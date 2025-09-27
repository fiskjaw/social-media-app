"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatetoken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generatetoken = async ({ payload, Secret = process.env.ACCESS_USER_SIGNATURE, options = { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY) }, }) => {
    return await (0, jsonwebtoken_1.sign)(payload, Secret, options);
};
exports.generatetoken = generatetoken;
//# sourceMappingURL=token.js.map