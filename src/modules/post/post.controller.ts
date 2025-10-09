import postService from "./post.service";
import { Router } from "express";
import { authentication } from "../../middlewares/authentication.middleware";
import { endpoint } from "./post.authorization";
import { TokenEnum } from "../../utils/security/token";
import { cloudfileupload, filevalidation } from "../../utils/multer/cloud.multer";
import * as validators from "./post.validation"
import { validation } from "../../middlewares/validation.middleware";


const router:Router=Router();

router.post("/createpost",authentication(endpoint.createpost,TokenEnum.ACCESS),cloudfileupload({validation:filevalidation.images}).array("attachments",3),validation(validators.createpostschema),postService.createPost);

router.post("/:postid/like",authentication(endpoint.createpost,TokenEnum.ACCESS),cloudfileupload({validation:filevalidation.images}).array("attachments",3),validation(validators.createpostschema),postService.createPost);

router .patch("/:postid/like",authentication(endpoint.like,TokenEnum.ACCESS),postService.LikeUnlikepost)

export default router;