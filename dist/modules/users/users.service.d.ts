import { Request, Response, NextFunction } from "express";
declare class Userservice {
    constructor();
    getprofile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: Userservice;
export default _default;
//# sourceMappingURL=users.service.d.ts.map