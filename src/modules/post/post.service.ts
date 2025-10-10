import { availabilityEnum, Postmodel ,actionEnum} from "../../Db/models/post.model";
import { UserRepository } from "../../Db/repositories/user.repositories";
import { HUSER, Usermodel } from "../../Db/models/user.model";
import { PostRepository } from "../../Db/repositories/post.repositories";
import {v4 as uuid} from "uuid";
import { Request, Response } from "express";
import { badRequestException, NotFoundException } from "../../utils/response/error.response";
import { deletefiles, uploadfiles } from "../../utils/multer/s3.config";
import { likepostdto } from "./post.dto";
import { UpdateQuery } from "mongoose";

export const postavailability =(req:Request)=>{
    return [ {availability:availabilityEnum.PUBLIC},
            {availability:availabilityEnum.ONLY,createdby:req.user?._id},
            {availability:availabilityEnum.FRIENDS,createdby:{$in:[...(req.user?.friends||[]),req.user?._id]}},
            {availability:availabilityEnum.ONLY,tags:{$in:req.user?._id}}
        ,]
}



class postService{
private _usermodel=new UserRepository(Usermodel)
private _postmodel=new PostRepository(Postmodel)
constructor(){}

 createPost=async (req:Request,res:Response)=>{
    if (req.body.tags?.length&&(await this._usermodel.find({filter:{_id:{$in:req.body.tags}}})).length!==req.body.tags.length){
        throw new NotFoundException("Invalid tags");
    }
    let assetspostFolderId=uuid();
    let attachments:string[]=[];
    if(req.files?.length){
        attachments=await uploadfiles({
            files:req.files as Express.Multer.File[],
            path:`/users/${req.user?._id}/post/${assetspostFolderId}`
        })
    }
    const [post]=await this._postmodel.create({data:[{...req.body,attachments,assetspostFolderId,createdby:req.user?._id}],options:{validateBeforeSave:true}})||[];
    if (!post) {
        if (attachments.length){
            await deletefiles({urls:attachments});
        }
        throw new badRequestException("Post not created");
    }
return res.status(201).json({message:"Post created successfully",post});
}
LikeUnlikepost = async (req:Request,res:Response)=>{
    const {postid}=req.params as unknown as {postid:string};
    const {action}=req.query as likepostdto
    let update:UpdateQuery<HUSER>={
     $addToSet:{likes:req.user?._id}
    };
    if (action===actionEnum.UNLIKE){
        update={$pull:{likes:req.user?._id}};
    }
     
        
    const post = await this._postmodel.findOneAndUpdate({
        filter:{_id:postid,$or:postavailability(req)},
       
        update,
       
    })
    if (!post) throw new NotFoundException("Post not found");
 
    return res.status(200).json({message:"Post liked successfully",post});
}

Updatepost = async (req:Request,res:Response)=>{
const {postid}=req.params as unknown as {postid:string};
const post = await this._postmodel.findOne({
    filter:{_id:postid,createdby:req.user?._id},
    
});
if (!post)
     throw new NotFoundException("Post not found");


if (req.body.tags?.length&&(await this._usermodel.find({filter:{_id:{$in:req.body.tags}}})).length!==req.body.tags.length){
        throw new NotFoundException("Invalid tags");
    }

  let assetspostFolderId=uuid();
    let attachments:string[]=[];
    if(req.files?.length){
        attachments=await uploadfiles({
            files:req.files as Express.Multer.File[],
            path:`/users/${post.createdby}/post/${assetspostFolderId}`
        })
    }
    const { tags = [], removeattachments = [], removetags = [] } = req.body;
const updatepost =await  this._postmodel.updateOne({
    filter:{_id:postid},
    update:[{$set:{content:req.body.content,
        allowcomment:req.body.allowcomment||post.allowcomment,
        availability:req.body.availability||post.availability,
        attachments:{
            $setUnion:[
                {
                $setDifference:["$attachments",removeattachments??[]],
            },attachments??[]]
        },
          tags: {
          $setUnion: [
            { $setDifference: ["$tags", removetags ?? []] },
            tags ?? []
          ]
        },
        assetspostFolderId,}}], 

})
if(!updatepost.modifiedCount){
    if (attachments?.length){
        await deletefiles({urls:attachments});
        throw new badRequestException("Post not updated");
    }else{
        if(req.body.removeattachments?.length){
            await deletefiles({urls:req.body.removeattachments});
        }
        throw new badRequestException("Post not updated");
    }
   
}

    return res.status(200).json({message:"Post updated successfully",});
}

getposts=async(req:Request,res:Response)=>{
let {page,size}=req.query as unknown as {page:number,size:number};
    const posts =await this._postmodel.paginate({filter:{$or:postavailability(req)},page,size})




return res.status(200).json({message:"Posts fetched successfully",posts});


}





}

export default new postService();