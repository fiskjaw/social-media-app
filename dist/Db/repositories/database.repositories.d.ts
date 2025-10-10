import { CreateOptions, DeleteResult, HydratedDocument, Model, MongooseUpdateQueryOptions, RootFilterQuery, Types, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { ProjectionType, QueryOptions } from "mongoose";
export declare abstract class DatabaseRepository<Tdocument> {
    protected readonly model: Model<Tdocument>;
    constructor(model: Model<Tdocument>);
    create({ data, options, }: {
        data: Partial<Tdocument>[];
        options?: CreateOptions | undefined;
    }): Promise<HydratedDocument<Tdocument>[] | undefined>;
    findOne({ filter, select, options, }: {
        filter?: RootFilterQuery<Tdocument>;
        select?: ProjectionType<Tdocument> | null;
        options?: QueryOptions<Tdocument> | null;
    }): Promise<any | HydratedDocument<Tdocument> | null>;
    updateOne({ filter, update, options, }: {
        filter: RootFilterQuery<Tdocument>;
        update?: UpdateQuery<Tdocument>;
        options?: MongooseUpdateQueryOptions<Tdocument> | null;
    }): Promise<UpdateWriteOpResult>;
    findById({ id, select, options, }: {
        id: Types.ObjectId;
        select?: ProjectionType<Tdocument> | null;
        options?: QueryOptions<Tdocument> | null;
    }): Promise<any | HydratedDocument<Tdocument> | null>;
    deleteOne({ filter, }: {
        filter: RootFilterQuery<Tdocument>;
    }): Promise<DeleteResult>;
    findOneAndUpdate({ filter, update, options }: {
        filter?: RootFilterQuery<Tdocument>;
        update?: UpdateQuery<Tdocument>;
        options?: QueryOptions<Tdocument> | null;
    }): Promise<any | HydratedDocument<Tdocument> | null>;
    findOneAndDelete({ filter }: {
        filter?: RootFilterQuery<Tdocument>;
    }): Promise<HydratedDocument<Tdocument> | null>;
    deleteMany({ filter, }: {
        filter: RootFilterQuery<Tdocument>;
    }): Promise<DeleteResult>;
    insertMany({ data }: {
        data: Partial<Tdocument>[];
        options?: CreateOptions | undefined;
    }): Promise<HydratedDocument<Tdocument>[] | undefined>;
    find({ filter, select, options, }: {
        filter?: RootFilterQuery<Tdocument>;
        select?: ProjectionType<Tdocument> | null;
        options?: QueryOptions<Tdocument> | null;
    }): Promise<any | HydratedDocument<Tdocument>[] | []>;
    paginate({ filter, select, options, page, size }: {
        filter?: RootFilterQuery<Tdocument>;
        select?: ProjectionType<Tdocument> | undefined;
        options?: QueryOptions<Tdocument> | undefined;
        page?: number;
        size?: number;
    }): Promise<{
        docscount: number;
        pages: number;
        limit: number;
        currentpage: number;
        results: any;
    }>;
}
//# sourceMappingURL=database.repositories.d.ts.map