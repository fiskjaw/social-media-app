import z from "zod"
import { generalfields } from "../../middlewares/validation.middleware"


export const getchatschema={
    params:z.strictObject({
        userid:generalfields.id
    })
}