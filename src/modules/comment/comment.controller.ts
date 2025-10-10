import { Router } from "express";
import commentService from "./comment.service";

import { endpoint } from "./comment.authorization";
import { authentication } from "../../middlewares/authentication.middleware";
import { TokenEnum } from "../../utils/security/token";
import { validation } from "../../middlewares/validation.middleware";
import * as validators from "./comment.validation"
import { cloudfileupload, filevalidation } from "../../utils/multer/cloud.multer";

const router:Router=Router(
    {mergeParams:true}
);


router.post("/",authentication(endpoint.createcomment,TokenEnum.ACCESS),cloudfileupload({validation:filevalidation.images}).array("attachments",3),validation(validators.createcommentschema),commentService.createcomment)


export default router;