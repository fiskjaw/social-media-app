"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparehash = exports.generatehash = void 0;
const bcrypt_1 = require("bcrypt");
const generatehash = async (plaintext, saltRound = Number(process.env.saltRound)) => { return await (0, bcrypt_1.hash)(plaintext, saltRound); };
exports.generatehash = generatehash;
const comparehash = async (plaintext, hash) => { return await (0, bcrypt_1.compare)(plaintext, hash); };
exports.comparehash = comparehash;
//# sourceMappingURL=hash.js.map