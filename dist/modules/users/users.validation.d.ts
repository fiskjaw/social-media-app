import z from "zod";
import { logoutEnum } from "../../utils/security/token";
export declare const logoutschema: {
    body: z.ZodObject<{
        flag: z.ZodDefault<z.ZodEnum<typeof logoutEnum>>;
    }, z.core.$strict>;
};
//# sourceMappingURL=users.validation.d.ts.map