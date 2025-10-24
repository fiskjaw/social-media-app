import { Socket } from "socket.io";
import { HUSER } from "../../Db/models/user.model";
import { JwtPayload } from "jsonwebtoken";


export interface IAuthSocket extends Socket{
        credentials?:{
            user:Partial<HUSER>;
            decoded:JwtPayload
        }
    }
    