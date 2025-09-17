import type { NextFunction, Request, Response } from "express";
declare class authenticationservice {
    signup: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
    login: (req: Request, res: Response, next: NextFunction) => Response;
}
declare const _default: authenticationservice;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map