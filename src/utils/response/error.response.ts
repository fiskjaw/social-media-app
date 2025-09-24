import type { NextFunction, Request, Response } from "express";



export interface IError extends Error {
    statuscode?: number

}
export class ApplicationException extends Error {
    constructor(message: string, public statuscode: number, options?: ErrorOptions) {
        super(message, options);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class badRequestException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 400, options);
    }
}
export class conflictException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 409, options);
    }
}
export class NotFoundException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 404, options);
    }
}

export const globalhandler = (err:IError,req:Request,res:Response,next:NextFunction) => {
   
    const status = err.statuscode && Number.isInteger(err.statuscode)
    ? err.statuscode
    : 500;
    res.status(status).json({
    success: false,
    message: err.message || "Something went wrong", stack: process.env.mode === "dev" ? err.stack : undefined, cause: err.cause });
}