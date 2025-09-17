"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalhandler = exports.NotFoundException = exports.badRequestException = exports.ApplicationException = void 0;
class ApplicationException extends Error {
    statuscode;
    constructor(message, statuscode, options) {
        super(message, options);
        this.statuscode = statuscode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationException = ApplicationException;
class badRequestException extends ApplicationException {
    constructor(message, options) {
        super(message, 400, options);
    }
}
exports.badRequestException = badRequestException;
class NotFoundException extends ApplicationException {
    constructor(message, options) {
        super(message, 404, options);
    }
}
exports.NotFoundException = NotFoundException;
const globalhandler = (err, req, res, next) => {
    return res.status(err.statuscode).json({ message: err.message || "Something went wrong", stack: process.env.mode === "dev" ? err.stack : undefined, cause: err.cause });
};
exports.globalhandler = globalhandler;
//# sourceMappingURL=error.response.js.map