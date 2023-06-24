"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const post_1 = require("./post");
exports.resolvers = {
    Query: {
        posts: post_1.postResolver,
    },
};
//# sourceMappingURL=index.js.map