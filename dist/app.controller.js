"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const s3_config_1 = require("./utils/multer/s3.config");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config({ path: node_path_1.default.resolve("config/.env.dev") });
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const error_response_1 = require("./utils/response/error.response");
const users_controller_1 = __importDefault(require("./modules/users/users.controller"));
const connection_1 = __importDefault(require("./Db/connection"));
const node_util_1 = require("node:util");
const node_stream_1 = require("node:stream");
const post_controller_1 = __importDefault(require("./modules/post/post.controller"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const token_1 = require("./utils/security/token");
const token_2 = require("./utils/security/token");
const createS3writestreampipe = (0, node_util_1.promisify)(node_stream_1.pipeline);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again "
    }
});
const bootstrap = async () => {
    const app = (0, express_1.default)();
    const port = Number(process.env.port);
    app.use((0, cors_1.default)(), (0, helmet_1.default)(), express_1.default.json());
    app.use(limiter);
    await (0, connection_1.default)();
    app.get("/upload/presigned/*path"), async (req, res) => {
        const { downloadname, download } = req.query;
        const { path } = req.params;
        const Key = path.join("/");
        const Url = await (0, s3_config_1.createGetpresignedurl)({ Key, downloadname: downloadname, download: download });
        return res.status(200).json({ Url });
    };
    app.get("/upload/*path", async (req, res) => {
        const { downloadname } = req.query;
        const { path } = req.params;
        const Key = path.join("/");
        const s3Response = await (0, s3_config_1.getfile)({ Key });
        if (!s3Response?.Body)
            throw new error_response_1.badRequestException("File not found");
        res.setHeader("Content-type", `${s3Response.ContentType}` || "application/octet-stream");
        if (downloadname)
            res.setHeader("Content-Disposition", `attachment; filename=${downloadname}`);
        ``;
        return await createS3writestreampipe(s3Response.Body, res);
    });
    app.get("/test-s3"), async (req, res) => {
        const { Key } = req.query;
        const Resutls = await (0, s3_config_1.deletefile)({ Key: Key });
        return res.status(200).json({ message: "File deleted successfully", Resutls });
    };
    app.get("/test-files", async (req, res) => {
        const urls = req.query.urls; // Assuming the URLs are passed as a query parameter
        try {
            const deletePromises = urls.map(async (url) => {
                await (0, s3_config_1.deletefile)({ Bucket: process.env.AWS_BUCKET_NAME, Key: url });
            });
            await Promise.all(deletePromises);
            return res.status(200).json({ message: "Files deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to delete files", error });
        }
    });
    app.use("/api/auth", auth_controller_1.default);
    app.use("/api/user", users_controller_1.default);
    app.use("/api/post", post_controller_1.default);
    app.get("/", (req, res) => {
        return res.status(200).json({ message: "hello social media app" });
    });
    app.get("/user", (req, res) => {
        return res.status(200).json({ message: "hello ts express" });
    });
    /*async function user(){
      try {
       const usermodel = new UserRepository(Usermodel);
       const user = await usermodel.insertMany({data:[{username:"mohamed",email:`${Date.now()}@gmail.com`,password:"123456"},
        {username:"ahmed",email:`${Date.now()}k@gmail.com`,password:"123456"}]});
        console.log(user);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    user();*/
    /* try {
         const usermodel = new UserRepository(Usermodel);
        const user = await usermodel.findById({
         id:"63e5c1d1b5d9c5d9c5d9c5d9" as unknown as Types.ObjectId
        });
         console.log(user);
         
       await user.updateOne({lastname:"mohamed"});
     } catch (error) {
         console.log(error);
         
     }*/
    app.use(error_response_1.globalhandler);
    const httpserver = http_1.default.createServer(app);
    const io = new socket_io_1.Server(httpserver, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const connectionsockets = new Map();
    io.use(async (socket, next) => {
        try {
            const { user, decoded } = await (0, token_2.decodedtoken)({ authorization: socket.handshake.auth.authorization,
                tokentype: token_1.TokenEnum.ACCESS });
            connectionsockets.set(user.id.toString(), socket.id);
            next();
        }
        catch (error) {
            next(error);
        }
    });
    io.on("connection", (socket) => {
        console.log("user connected", socket.id);
        //connectionsockets.push(socket.id);
        //socket.to(connectionsockets[connectionsockets.length=2]as string)
        // .emit("product",{productId:"63e5c1d1b5d9c5d9c5d9c5d9",productname:"laptop"});
    });
    /*io.of("/admin").on("connection", (socket: Socket) => {
      console.log("admin channel", socket.id);
    
      socket.on("disconnect", () => {
        console.log(`logout from::: ${socket.id} `);
      });
    });*/
    httpserver.listen(port, () => {
        console.log(` Server running on port ${port}`);
    });
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=app.controller.js.map