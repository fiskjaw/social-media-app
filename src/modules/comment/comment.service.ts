import { Request,Response } from "express";
import { UserRepository } from "../../Db/repositories/user.repositories";
import { PostRepository } from "../../Db/repositories/post.repositories";
import { Usermodel } from "../../Db/models/user.model";
import { allowcommentEnum, Postmodel } from "../../Db/models/post.model";
import { CommentRepository } from "../../Db/repositories/comment.repositories";
import { Commentmodel } from "../../Db/models/comment.model";
import { postavailability } from "../post/post.service";
import { NotFoundException } from "../../utils/response/error.response";
import { badRequestException } from "../../utils/response/error.response";
import { uploadfiles } from "../../utils/multer/s3.config";
import { deletefiles } from "../../utils/multer/s3.config";



class commentService{
    private _usermodel=new UserRepository(Usermodel)
    private _postmodel=new PostRepository(Postmodel)
    private _commentmodel=new CommentRepository(Commentmodel)
   
    constructor(){}
    createcomment = async (req:Request,res:Response)=>{
      const {postid}=req.params as unknown as {postid:string};
      const{post}=await this._postmodel.findOne({filter:{_id:postid,allowcomment:allowcommentEnum.ALLOW,$or:postavailability(req)}})||{};




      if(!post) throw new NotFoundException("Post not found or comment is disabled");
      if (req.body.tags?.length&&(await this._usermodel.find({filter:{_id:{$in:req.body.tags}}})).length!==req.body.tags.length){
          throw new NotFoundException("Invalid tags");
      }
     
      let attachments:string[]=[];
      if(req.files?.length){
          attachments=await uploadfiles({
              files:req.files as Express.Multer.File[],
              path:`/users/${post.createdby}/post/${post.assetspostFolderId}`
          })
      }
      const [comment]=await this._postmodel.create({data:[{...req.body,attachments,postid,createdby:req.user?._id}],options:{validateBeforeSave:true}})||[];
          if (!comment) {
              if (attachments.length){
                  await deletefiles({urls:attachments});
              }
              throw new badRequestException("Post not created");
          }
      return res.status(200).json({message:"comment created successfully"});
}
}

export default new commentService();