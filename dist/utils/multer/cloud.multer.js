"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudfileupload = exports.filevalidation = exports.storageEnum = void 0;
const multer_1 = __importDefault(require("multer"));
const node_os_1 = __importDefault(require("node:os"));
const uuid_1 = require("uuid");
const error_response_1 = require("../response/error.response");
var storageEnum;
(function (storageEnum) {
    storageEnum["MEMORY"] = "MEMORY";
    storageEnum["DISK"] = "DISK";
})(storageEnum || (exports.storageEnum = storageEnum = {}));
exports.filevalidation = {
    images: ["image/jpeg", "image/png", "image/jpg"],
    pdf: ["application/pdf"],
    videos: ["video/mp4", "video/mov", "video/quicktime"]
};
const cloudfileupload = ({ validation = [], storageapproach = storageEnum.MEMORY, maxsize = 2 }) => {
    const storage = storageapproach === storageEnum.MEMORY ? multer_1.default.memoryStorage() :
        multer_1.default.diskStorage({ destination: node_os_1.default.tmpdir(),
            filename: (req, file, cb) => {
                cb(null, `${(0, uuid_1.v4)()}-${file.originalname}`);
            } });
    function fileFilter(req, file, cb) {
        if (!validation.includes(file.mimetype)) {
            return cb(new error_response_1.badRequestException("invalid file type"));
        }
        return cb(null, true);
    }
    return (0, multer_1.default)({ fileFilter, limits: { fileSize: maxsize * 1024 * 1024 }, storage });
};
exports.cloudfileupload = cloudfileupload;
//# sourceMappingURL=cloud.multer.js.map