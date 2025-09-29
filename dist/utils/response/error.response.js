"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalhandler = exports.ForbiddenException = exports.UnAuthorizedException = exports.NotFoundException = exports.conflictException = exports.badRequestException = exports.ApplicationException = void 0;
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
class conflictException extends ApplicationException {
    constructor(message, options) {
        super(message, 409, options);
    }
}
exports.conflictException = conflictException;
class NotFoundException extends ApplicationException {
    constructor(message, options) {
        super(message, 404, options);
    }
}
exports.NotFoundException = NotFoundException;
class UnAuthorizedException extends ApplicationException {
    constructor(message, options) {
        super(message, 401, options);
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
class ForbiddenException extends ApplicationException {
    constructor(message, options) {
        super(message, 403, options);
    }
}
exports.ForbiddenException = ForbiddenException;
const globalhandler = (err, req, res, next) => {
    const status = err.statuscode && Number.isInteger(err.statuscode)
        ? err.statuscode
        : 500;
    res.status(status).json({
        success: false,
        message: err.message || "Something went wrong", stack: process.env.mode === "dev" ? err.stack : undefined, cause: err.cause
    });
};
exports.globalhandler = globalhandler;
//# sourceMappingURL=error.response.js.map