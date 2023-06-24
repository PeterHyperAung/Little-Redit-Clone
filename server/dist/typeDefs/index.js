"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    type Query {
        posts: [Post]
        hello: String
    }

    type Post {
        id: ID
        createdAt: String
        updatedAt: String
        title: String
    }
`;
//# sourceMappingURL=index.js.map