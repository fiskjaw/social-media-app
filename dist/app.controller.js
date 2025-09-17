"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
;
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config({ path: node_path_1.default.resolve("config/.env.dev") });
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const error_response_1 = require("./utils/response/error.response");
const connection_1 = __importDefault(require("./Db/connection"));
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
    app.use("/api/auth", auth_controller_1.default);
    app.get("/", (req, res) => {
        return res.status(200).json({ message: "hello social media app" });
    });
    app.get("/users", (req, res) => {
        return res.status(200).json({ message: "hello ts express" });
    });
    app.use(error_response_1.globalhandler);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=app.controller.js.map