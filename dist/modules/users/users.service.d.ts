import { Request, Response, NextFunction } from "express";
declare class Userservice {
    private _usermodel;
    private _tokenmodel;
    constructor();
    getprofile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    refreshtoken: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: Userservice;
export default _default;
//# sourceMappingURL=users.service.d.ts.map