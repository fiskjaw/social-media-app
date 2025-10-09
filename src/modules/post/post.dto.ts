import z from "zod";
import { likeUnlikeschema } from "./post.validation";



export type likepostdto=z.infer<typeof likeUnlikeschema.query>