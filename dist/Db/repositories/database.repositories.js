"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepository = void 0;
class DatabaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create({ data, options, }) {
        return await this.model.create(data, options);
    }
    async findOne({ filter, select, options, }) {
        const doc = this.model.findOne(filter).select(select || "");
        if (options?.populate) {
            doc.populate(options.populate);
        }
        if (options?.lean) {
            doc.lean(options.lean);
        }
        return await doc.exec();
    }
    async updateOne({ filter, update, options, }) {
        if (Array.isArray(update)) {
            update.push({ $set: { _v: { if: { $isNumber: "$_v" },
                        then: { $add: ["$_v", 1] },
                        else: 1 } } });
            return await this.model.updateOne(filter, update, options);
        }
        return await this.model.updateOne(filter, { ...update, $inc: { _v: 1 } }, options);
    }
    async findById({ id, select, options, }) {
        const doc = this.model.findById(id).select(select || "");
        if (options?.populate) {
            doc.populate(options.populate);
        }
        if (options?.lean) {
            doc.lean(options.lean);
        }
        return await doc.exec();
    }
    async deleteOne({ filter, }) {
        return await this.model.deleteOne(filter);
    }
    async findOneAndUpdate({ filter, update, options = { new: true } }) {
        const doc = this.model.findOneAndUpdate(filter, update);
        if (options?.populate) {
            doc.populate(options.populate);
        }
        if (options?.lean) {
            doc.lean(options.lean);
        }
        return await doc.exec();
    }
    async findOneAndDelete({ filter }) {
        return await this.model.findOneAndDelete(filter);
    }
    async deleteMany({ filter, }) {
        return await this.model.deleteMany(filter);
    }
    async insertMany({ data }) {
        return (await this.model.insertMany(data));
    }
    async find({ filter, select, options, }) {
        const doc = this.model.find(filter || []).select(select || "");
        if (options?.populate) {
            doc.populate(options.populate);
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
    async paginate({ filter = {}, select = {}, options = {}, page = 1, size = 5 }) {
        let docscount = undefined;
        let pages = undefined;
        page = Math.floor(page < 1 ? 1 : page);
        options.limit = Math.floor(size < 1 || !size ? 5 : size);
        options.skip = (page - 1) * size;
        docscount = await this.model.countDocuments(filter);
        pages = Math.ceil(docscount / (options.limit));
        const results = await this.find({ filter, select, options });
        return { docscount, pages, limit: options.limit, currentpage: page, results };
    }
}
exports.DatabaseRepository = DatabaseRepository;
//# sourceMappingURL=database.repositories.js.map