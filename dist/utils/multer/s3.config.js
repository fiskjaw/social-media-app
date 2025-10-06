"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletefiles = exports.deletefile = exports.createGetpresignedurl = exports.getfile = exports.createpresignedurl = exports.uploadfiles = exports.uploadlargefile = exports.uploadfile = exports.s3config = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const cloud_multer_1 = require("./cloud.multer");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const error_response_1 = require("../response/error.response");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3config = () => {
    return new client_s3_1.S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
};
exports.s3config = s3config;
const uploadfile = async ({ storageapproach = cloud_multer_1.storageEnum.MEMORY, Bucket = process.env.AWS_BUCKET_NAME, ACL = "private", path = "general", file }) => {
    const command = new client_s3_1.PutObjectCommand({
        Bucket,
        ACL,
        Key: `${process.env.APPLICATION_NAME}/${path}/${(0, uuid_1.v4)()}-${file.originalname}`,
        Body: storageapproach === cloud_multer_1.storageEnum.MEMORY ? file.buffer : (0, fs_1.createReadStream)(file.path),
        ContentType: file.mimetype
    });
    await (0, exports.s3config)().send(command);
    if (!command?.input?.Key)
        throw new Error("Error uploading file");
    return command.input.Key;
};
exports.uploadfile = uploadfile;
const uploadlargefile = async ({ storageapproach = cloud_multer_1.storageEnum.MEMORY, Bucket = process.env.AWS_BUCKET_NAME, ACL = "private", path = "general", file }) => {
    const upload = new lib_storage_1.Upload({ client: (0, exports.s3config)(),
        params: { Bucket,
            Key: `${process.env.APPLICATION_NAME}/${path}/${(0, uuid_1.v4)()}-${file.originalname}`,
            ContentType: file.mimetype,
            ACL,
            Body: storageapproach === cloud_multer_1.storageEnum.MEMORY ? file.buffer : (0, fs_1.createReadStream)(file.path)
        },
        partSize: 2 * 1024 * 1024
    });
    upload.on("httpUploadProgress", (progress) => {
        console.log("Upload Progress", progress);
    });
    const { Key } = await upload.done();
    if (!Key)
        throw new error_response_1.badRequestException("Error uploading file");
    return Key;
};
exports.uploadlargefile = uploadlargefile;
const uploadfiles = async ({ storageapproach = cloud_multer_1.storageEnum.MEMORY, Bucket = process.env.AWS_BUCKET_NAME, ACL = "private", path = "general", files }) => {
    let urls = [];
    for (const file of files) {
        const key = await (0, exports.uploadfile)({ storageapproach, Bucket, ACL, path, file });
        urls.push(key);
    }
    return urls;
};
exports.uploadfiles = uploadfiles;
const createpresignedurl = async ({ Bucket = process.env.AWS_BUCKET_NAME, path = "general", ContentType, Originalname, Expiresin = 120 }) => {
    const command = new client_s3_1.PutObjectCommand({
        Bucket,
        Key: `${process.env.APPLICATION_NAME}/${path}/${(0, uuid_1.v4)()}-${Originalname}`,
        ContentType,
    });
    const Url = await (0, s3_request_presigner_1.getSignedUrl)((0, exports.s3config)(), command, { expiresIn: Expiresin });
    if (!Url || !command?.input?.Key)
        throw new error_response_1.badRequestException("failed to create presigned url");
    return { Url, Key: command.input.Key };
};
exports.createpresignedurl = createpresignedurl;
const getfile = async ({ Bucket = process.env.AWS_BUCKET_NAME, Key }) => {
    const command = new client_s3_1.GetObjectCommand({ Bucket, Key });
    return await (0, exports.s3config)().send(command);
};
exports.getfile = getfile;
const createGetpresignedurl = async ({ Bucket = process.env.AWS_BUCKET_NAME, Key, downloadname = "dummy", download, Expiresin = 120 }) => {
    const command = new client_s3_1.GetObjectCommand({
        Bucket,
        Key,
        ResponseContentDisposition: download === "true" ? `attachment; filename=${downloadname}` : undefined
    });
    const Url = await (0, s3_request_presigner_1.getSignedUrl)((0, exports.s3config)(), command, { expiresIn: Expiresin });
    if (!Url || !command?.input?.Key)
        throw new error_response_1.badRequestException("failed to create presigned url");
    return Url;
};
exports.createGetpresignedurl = createGetpresignedurl;
const deletefile = async ({ Bucket = process.env.AWS_BUCKET_NAME, Key }) => {
    const command = new client_s3_1.DeleteObjectCommand({ Bucket, Key });
    return await (0, exports.s3config)().send(command);
};
exports.deletefile = deletefile;
const deletefiles = async ({ Bucket = process.env.AWS_BUCKET_NAME, urls, Quiet = false }) => {
    const Objects = urls.map((url) => { return { Key: url }; });
    const command = new client_s3_1.DeleteObjectsCommand({ Bucket,
        Delete: {
            Objects,
            Quiet
        } });
    return await (0, exports.s3config)().send(command);
};
exports.deletefiles = deletefiles;
//# sourceMappingURL=s3.config.js.map