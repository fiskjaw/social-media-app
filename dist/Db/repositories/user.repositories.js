"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_repositories_1 = require("./database.repositories");
const error_response_1 = require("../../utils/response/error.response");
class UserRepository extends database_repositories_1.DatabaseRepository {
    model;
    constructor(model) {
        super(model);
        this.model = model;
    }
    async createuser({ data, options, }) {
        const [user] = (await this.create({ data, options }) || []);
        if (!user)
            throw new error_response_1.badRequestException("user not created");
        return user;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repositories.js.map