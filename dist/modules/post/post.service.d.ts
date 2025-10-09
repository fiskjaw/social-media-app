import { availabilityEnum } from "../../Db/models/post.model";
import { Request, Response } from "express";
export declare const postavailability: (req: Request) => ({
    availability: availabilityEnum;
    createdby?: never;
    tags?: never;
} | {
    availability: availabilityEnum;
    createdby: import("mongoose").Types.ObjectId | undefined;
    tags?: never;
} | {
    availability: availabilityEnum;
    createdby: {
        $in: (import("mongoose").Types.ObjectId | undefined)[];
    };
    tags?: never;
} | {
    availability: availabilityEnum;
    tags: {
        $in: import("mongoose").Types.ObjectId | undefined;
    };
    createdby?: never;
})[];
declare class postService {
    private _usermodel;
    private _postmodel;
    constructor();
    createPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    LikeUnlikepost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: postService;
export default _default;
//# sourceMappingURL=post.service.d.ts.map