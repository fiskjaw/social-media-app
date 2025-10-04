import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3";
import { storageEnum } from "./cloud.multer";
export declare const s3config: () => S3Client;
export declare const uploadfile: ({ storageApproach, Bucket, ACL, path, file }: {
    storageApproach?: storageEnum;
    Bucket?: string;
    ACL?: ObjectCannedACL;
    path?: string;
    file: Express.Multer.File;
}) => Promise<string>;
export declare const uploadlargefile: ({ storageApproach, Bucket, ACL, path, file }: {
    storageApproach?: storageEnum;
    Bucket?: string;
    ACL?: ObjectCannedACL;
    path?: string;
    file: Express.Multer.File;
}) => Promise<string>;
export declare const uploadfiles: ({ storageApproach, Bucket, ACL, path, files }: {
    storageApproach?: storageEnum;
    Bucket?: string;
    ACL?: ObjectCannedACL;
    path?: string;
    files: Express.Multer.File[];
}) => Promise<string[]>;
//# sourceMappingURL=s3.config.d.ts.map