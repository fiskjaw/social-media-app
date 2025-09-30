
import { RoleEnum } from "../../Db/models/user.model";

export const endpoint={
    profile:[RoleEnum.USER,RoleEnum.ADMIN],
    logout:[RoleEnum.USER,RoleEnum.ADMIN],
    refresh:[RoleEnum.USER,RoleEnum.ADMIN]
}