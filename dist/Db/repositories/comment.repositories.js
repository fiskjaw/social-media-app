"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const database_repositories_1 = require("./database.repositories");
class CommentRepository extends database_repositories_1.DatabaseRepository {
    model;
    constructor(model) {
        super(model);
        this.model = model;
    }
}
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment.repositories.js.map