
import { Router } from "express";
import authservice from "./auth.service";
import { validation } from "../../middlewares/validation.middleware";
import { signupschema } from "./auth.validation";
const router: Router = Router();


router.get("/signup",validation(signupschema),authservice.signup)

router.get("/login",authservice.login)
export default router;