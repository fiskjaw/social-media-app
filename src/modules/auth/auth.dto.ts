import z from "zod";
import { signupschema } from "./auth.validation";

export type ISignupDTO= z.infer<typeof signupschema.body>;