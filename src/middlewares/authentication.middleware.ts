import type { NextFunction, Request, Response } from "express";
import { ForbiddenException, UnAuthorizedException } from "../utils/response/error.response";
import { decodedtoken } from "../utils/security/token";
import { RoleEnum } from "../Db/models/user.model";
import { TokenEnum } from "../utils/security/token";



export const authentication = (
  accessroles: RoleEnum[] = [],
  tokentype: TokenEnum = TokenEnum.ACCESS
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        return next(new UnAuthorizedException("Missing authorization header"));
      }

      const { user, decoded } = await decodedtoken({
        authorization: req.headers.authorization,
        tokentype,
      });

      // Only check roles if roles were provided
      if (accessroles.length > 0 && !accessroles.includes(user.role)) {
        return next(new ForbiddenException("Unauthorized access"));
      }

      req.user = user;
      req.decoded = decoded;

      return next();
    } catch (err) {
      return next(err);
    }
  };
};
