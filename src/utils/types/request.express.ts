import { JwtPayload } from "jsonwebtoken";
import { HUSER } from "../../Db/models/user.model";

declare module "express-serve-static-core" {
    export interface Request {
        user?: HUSER;
        decoded?: JwtPayload;
    }
}