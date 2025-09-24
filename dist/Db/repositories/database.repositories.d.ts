import { CreateOptions, HydratedDocument, Model, RootFilterQuery } from "mongoose";
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
}
//# sourceMappingURL=database.repositories.d.ts.map