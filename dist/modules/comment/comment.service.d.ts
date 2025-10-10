import { Request, Response } from "express";
declare class commentService {
    private _usermodel;
    private _postmodel;
    private _commentmodel;
    constructor();
    createcomment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: commentService;
export default _default;
//# sourceMappingURL=comment.service.d.ts.map