import { logoutschema } from "./users.validation";
import z from "zod";
export type ILogoutDTO = z.infer<typeof logoutschema.body>;
//# sourceMappingURL=user.dto.d.ts.map