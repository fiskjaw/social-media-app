import { authentication } from "../../middlewares/authentication.middleware";
import { Router } from "express";
import { endpoint } from "./chat.authorization";
import { TokenEnum } from "../../utils/security/token";
import {validation} from "../../middlewares/validation.middleware"
import * as validators from "../chat/chat.validation"
import   Chatservice  from "../chat/chat.service";
const router: Router = Router(
    {mergeParams:true}
);

router.get("/",authentication(endpoint.getchat,TokenEnum.ACCESS),
validation(validators.getchatschema),Chatservice.getchat)

export default router;