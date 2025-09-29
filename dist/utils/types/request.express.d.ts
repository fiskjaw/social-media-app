import { JwtPayload } from "jsonwebtoken";
import { HUSER } from "../../Db/models/user.model";
declare module "express-serve-static-core" {
    interface Request {
        user?: HUSER;
        decoded?: JwtPayload;
    }
}
//# sourceMappingURL=request.express.d.ts.map