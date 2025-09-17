import type { NextFunction, Request, Response } from "express";




export interface IError extends Error {
    statuscode: number

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
export class NotFoundException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 404, options);
    }
}

export const globalhandler = (err:IError,req:Request,res:Response,next:NextFunction) => {
   
    return res.status(err.statuscode).json({ message: err.message || "Something went wrong", stack: process.env.mode === "dev" ? err.stack : undefined, cause: err.cause });
}