import { Router } from "express";

import userservice from "./users.service";

const router:Router=Router();



router.get("/profile",userservice.getprofile)

export default router;