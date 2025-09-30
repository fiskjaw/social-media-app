"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const database_repositories_1 = require("./database.repositories");
class TokenRepository extends database_repositories_1.DatabaseRepository {
    model;
    constructor(model) {
        super(model);
        this.model = model;
    }
}
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=token.repositories.js.map