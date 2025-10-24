import { Router } from "express";
import { TokenEnum } from "../../utils/security/token";
import userservice from "./users.service";
import { authentication } from "../../middlewares/authentication.middleware";
import { endpoint } from "./user.authorization";
import chatrouter from "../chat/chat.controller"

const router:Router=Router();
router.use("/:userid/chat",chatrouter)


router.get("/profile",authentication(endpoint.profile),userservice.getprofile)
router.post("/logout",authentication(endpoint.logout),userservice.logout)
router.post("/refresh",authentication(endpoint.refresh,TokenEnum.REFRESH),userservice.refreshtoken)
export default router;