"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Userservice {
    constructor() { }
    getprofile = async (req, res, next) => {
        console.log("req.user", req.user);
        console.log("req.decoded", req.decoded);
        return res.status(200).json({ message: "done", user: req.user, decoded: req.decoded });
    };
}
exports.default = new Userservice();
//# sourceMappingURL=users.service.js.map