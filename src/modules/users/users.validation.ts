import z from "zod";
import { logoutEnum } from "../../utils/security/token";

export const logoutschema={
    body:z.strictObject({
       flag: z.enum(logoutEnum).default(logoutEnum.only)
    })
}