import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3";
import { storageEnum } from "./cloud.multer";
export declare const s3config: () => S3Client;
export declare const uploadfile: ({ storageapproach, Bucket, ACL, path, file }: {
    storageapproach?: storageEnum;
    Bucket?: string;
    ACL?: ObjectCannedACL;
    path?: string;
    file: Express.Multer.File;
}) => Promise<string>;
export declare const uploadlargefile: ({ storageapproach, Bucket, ACL, path, file }: {
    storageapproach?: storageEnum;
    Bucket?: string;
    ACL?: ObjectCannedACL;
    path?: string;
    file: Express.Multer.File;
}) => Promise<string>;
export declare const uploadfiles: ({ storageapproach, Bucket, ACL, path, files }: {
    storageapproach?: storageEnum;
    Bucket?: string;
    ACL?: ObjectCannedACL;
    path?: string;
    files: Express.Multer.File[];
}) => Promise<string[]>;
//# sourceMappingURL=s3.config.d.ts.map