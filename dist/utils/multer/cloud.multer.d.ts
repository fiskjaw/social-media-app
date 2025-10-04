import { Multer } from "multer";
export declare enum storageEnum {
    MEMORY = "MEMORY",
    DISK = "DISK"
}
export declare const filevalidation: {
    images: string[];
    pdf: string[];
    videos: string[];
};
export declare const cloudfileupload: ({ validation, storageapproach, maxsize }: {
    validation?: string[];
    storageapproach: storageEnum;
    maxsize?: number;
}) => Multer;
//# sourceMappingURL=cloud.multer.d.ts.map