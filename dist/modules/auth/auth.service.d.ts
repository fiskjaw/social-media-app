import type { NextFunction, Request, Response } from "express";
declare class authenticationservice {
    private _usermodel;
    constructor();
    signup: (req: Request, res: Response) => Promise<Response>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
    confirmemail: (req: Request, res: Response) => Promise<Response>;
    profileimage: (req: Request, res: Response) => Promise<Response>;
    coverimages: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: authenticationservice;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map