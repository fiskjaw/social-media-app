import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3";
import { storageEnum } from "./cloud.multer";
import { DeleteObjectCommandOutput, GetObjectCommandOutput } from "@aws-sdk/client-s3";
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
export declare const createpresignedurl: ({ Bucket, path, ContentType, Originalname, Expiresin }: {
    Bucket?: string;
    path?: string;
    ContentType?: string;
    Originalname?: string;
    Expiresin?: number;
}) => Promise<{
    Url: string;
    Key: string;
}>;
export declare const getfile: ({ Bucket, Key }: {
    Bucket?: string;
    Key: string;
}) => Promise<GetObjectCommandOutput>;
export declare const createGetpresignedurl: ({ Bucket, Key, downloadname, download, Expiresin }: {
    Bucket?: string;
    Key?: string;
    downloadname?: string;
    download?: string;
    Expiresin?: number;
}) => Promise<string>;
export declare const deletefile: ({ Bucket, Key }: {
    Bucket?: string;
    Key?: string;
}) => Promise<DeleteObjectCommandOutput>;
export declare const deletefiles: ({ Bucket, urls, Quiet }: {
    Bucket?: string;
    urls: string[];
    Quiet?: boolean;
}) => Promise<DeleteObjectCommandOutput>;
//# sourceMappingURL=s3.config.d.ts.map