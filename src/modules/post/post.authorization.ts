
import { RoleEnum } from "../../Db/models/user.model";



export const endpoint={
    createpost:[RoleEnum.USER,RoleEnum.ADMIN],
    deletepost:[RoleEnum.USER,RoleEnum.ADMIN],
    like:[RoleEnum.USER,RoleEnum.ADMIN],
    unlike:[RoleEnum.USER,RoleEnum.ADMIN],
    comment:[RoleEnum.USER,RoleEnum.ADMIN],
    deletecomment:[RoleEnum.USER,RoleEnum.ADMIN],
    likecomment:[RoleEnum.USER,RoleEnum.ADMIN],
    unlikecomment:[RoleEnum.USER,RoleEnum.ADMIN],
    replycomment:[RoleEnum.USER,RoleEnum.ADMIN],
    deletereplycomment:[RoleEnum.USER,RoleEnum.ADMIN],
    likereplycomment:[RoleEnum.USER,RoleEnum.ADMIN],
    unlikereplycomment:[RoleEnum.USER,RoleEnum.ADMIN],
    share:[RoleEnum.USER,RoleEnum.ADMIN],
    deleteshare:[RoleEnum.USER,RoleEnum.ADMIN],
    likepost:[RoleEnum.USER,RoleEnum.ADMIN],
    unlikepost:[RoleEnum.USER,RoleEnum.ADMIN],  
    getpost:[RoleEnum.USER,RoleEnum.ADMIN],                                      
}