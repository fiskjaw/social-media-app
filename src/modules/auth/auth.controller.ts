
import { Router } from "express";
import authservice from "./auth.service";
import { validation } from "../../middlewares/validation.middleware";
import { signupschema, confirmemailschema, loginschema } from "./auth.validation";
const router: Router = Router();


router.post("/signup",validation(signupschema),authservice.signup)
router.patch("/confirmemail",validation(confirmemailschema),authservice.confirmemail)
router.get("/login",validation(loginschema),authservice.login)
export default router;