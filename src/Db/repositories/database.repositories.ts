import { CreateOptions, DeleteResult, HydratedDocument, Model, MongooseUpdateQueryOptions, RootFilterQuery, Types, UpdateQuery, UpdateWriteOpResult } from "mongoose";
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
    update?: UpdateQuery<Tdocument>;
    options?: MongooseUpdateQueryOptions<Tdocument> | null;
}): Promise<UpdateWriteOpResult> {
    if (Array.isArray(update)) {
        update.push({$set:
          {_v:{if: { $isNumber: "$_v" },
        then: { $add: ["$_v", 1] },
        else: 1}} })
        return await this.model.updateOne(filter, update, options);
    }
    return await this.model.updateOne(filter, {...update,$inc:{_v:1}}, options);
}
async findById({id,select,options,}
    :{id:Types.ObjectId;select?:
        ProjectionType<Tdocument>|null;options?:QueryOptions<Tdocument>|null;}):Promise<any|HydratedDocument<Tdocument>|null>{
       const doc =this.model.findById(id).select(select||"");
    if (options?.populate) {
        doc.populate(options.populate as PopulateOptions);
    }
    if (options?.lean) {
        doc.lean(options.lean);
    }
    return await doc.exec();
}
async deleteOne({
    filter,
   
}: {
    filter: RootFilterQuery<Tdocument>;
   
}): Promise<DeleteResult> {
    return await this.model.deleteOne(filter);
}
async findOneAndUpdate({filter,update,options={new:true}}:{filter?:RootFilterQuery<Tdocument>;update?:UpdateQuery<Tdocument>;options?:QueryOptions<Tdocument>|null;}):Promise<any|HydratedDocument<Tdocument>|null>{
       const doc =this.model.findOneAndUpdate(filter,update);
    if (options?.populate) {
        doc.populate(options.populate as PopulateOptions);
    }
    if (options?.lean) {
        doc.lean(options.lean);
    }
    return await doc.exec();
}

async findOneAndDelete({filter}:{filter?:RootFilterQuery<Tdocument>}):
Promise<HydratedDocument<Tdocument>|null>{
       
    return await this.model.findOneAndDelete(filter);
    
}
async deleteMany({
    filter,
   
}: {
    filter: RootFilterQuery<Tdocument>;
   
}): Promise<DeleteResult> {
    return await this.model.deleteMany(filter);
}
async insertMany({data}:{data: Partial<Tdocument>[],options?:CreateOptions|undefined}):Promise<HydratedDocument<Tdocument>[]|undefined>{
    return (await this.model.insertMany(data))as HydratedDocument<Tdocument>[];
    
}
async find({filter,select,options,}:{filter?:RootFilterQuery<Tdocument>;select?:ProjectionType<Tdocument>|null;options?:QueryOptions<Tdocument>|null;}):Promise<any|HydratedDocument<Tdocument>[]|[]>{
       const doc =this.model.find(filter||[]).select(select||"");
    if (options?.populate) {
        doc.populate(options.populate as PopulateOptions);
    }
    if (options?.lean) {
        doc.lean(options.lean);
    }
       if (options?.limit) {
        doc.limit(options.limit);
    }
       if (options?.skip) {
        doc.skip(options.skip);
    }
    return await doc.exec();
}
async paginate({filter={},select={},options={},page=1,size=5}:{filter?:RootFilterQuery<Tdocument>;select?:ProjectionType<Tdocument>|undefined;options?:QueryOptions<Tdocument>|undefined;page?:number;size?:number}){
  let docscount:number|undefined=undefined
let pages:number|undefined=undefined



  page=Math.floor(page<1?1:page);
  options.limit=Math.floor(size<1 || !size ? 5:size);
  options.skip=(page-1)*size;
docscount=await this.model.countDocuments(filter)
  
pages=Math.ceil(docscount/(options.limit))

  const results= await this.find({filter,select,options});
  return  {docscount,pages,limit:options.limit,currentpage:page,results};
}


}