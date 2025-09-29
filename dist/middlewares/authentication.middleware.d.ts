import type { NextFunction, Request, Response } from "express";
import { RoleEnum } from "../Db/models/user.model";
import { TokenEnum } from "../utils/security/token";
export declare const authentication: (accessroles?: RoleEnum[], tokentype?: TokenEnum) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authentication.middleware.d.ts.map