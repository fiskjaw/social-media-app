import { CreateOptions, HydratedDocument, Model, MongooseUpdateQueryOptions, RootFilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { ProjectionType, QueryOptions } from "mongoose";
import { PopulateOptions } from "mongoose";





export abstract class DatabaseRepository<Tdocument> {
    constructor(protected readonly model: Model<Tdocument>) {}
async create({data,options,}:{data: Partial<Tdocument>[],options?:CreateOptions|undefined}):Promise<HydratedDocument<Tdocument>[]|undefined>{
    return await this.model.create(data,options);
    
}
async findOne({filter,select,options,}:{filter?:RootFilterQuery<Tdocument>;select?:ProjectionType<Tdocument>|null;options?:QueryOptions<Tdocument>|null;}):Promise<any|HydratedDocument<Tdocument>|null>{
       const doc =this.model.findOne(filter).select(select||"");
    if (options?.populate) {
        doc.populate(options.populate as PopulateOptions);
    }
    if (options?.lean) {
        doc.lean(options.lean);
    }
    return await doc.exec();
}
async updateOne({
    filter,
    update,
    options,
}: {
    filter: RootFilterQuery<Tdocument>;
    update: UpdateQuery<Tdocument>;
    options?: MongooseUpdateQueryOptions<Tdocument> | null;
}): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne(filter, {...update,$inc:{_v:1}}, options);
}


}