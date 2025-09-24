import type { NextFunction, Request, Response } from "express";
export interface IError extends Error {
    statuscode?: number;
}
export declare class ApplicationException extends Error {
    statuscode: number;
    constructor(message: string, statuscode: number, options?: ErrorOptions);
}
export declare class badRequestException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions);
}
export declare class conflictException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions);
}
export declare class NotFoundException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions);
}
export declare const globalhandler: (err: IError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=error.response.d.ts.map