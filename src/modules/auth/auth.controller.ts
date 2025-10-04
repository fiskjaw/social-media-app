
import { Router } from "express";
import authservice from "./auth.service";
import { validation } from "../../middlewares/validation.middleware";
import { signupschema, confirmemailschema, loginschema } from "./auth.validation";
const router: Router = Router();
import { authentication } from "../../middlewares/authentication.middleware";
import { cloudfileupload, filevalidation, storageEnum } from "../../utils/multer/cloud.multer";
import { TokenEnum } from "../../utils/security/token";
import { endpoint } from "./auth.authorization";

router.post("/signup",validation(signupschema),authservice.signup)
router.patch("/confirmemail",validation(confirmemailschema),authservice.confirmemail)
router.get("/login",validation(loginschema),authservice.login)
router.patch("/profile-image",authentication(endpoint.image,TokenEnum.ACCESS),cloudfileupload({storageapproach:storageEnum.MEMORY,validation:filevalidation.images,maxsize:2}).single("attachment"),authservice.profileimage)
router.patch("/profile-cover-image",authentication(endpoint.image,TokenEnum.ACCESS),cloudfileupload({storageapproach:storageEnum.MEMORY,validation:filevalidation.images,maxsize:2}).array("attachments",5),authservice.coverimages)

export default router;