"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

    type Post {
        id: Int
        createdAt: String
        updatedAt: String
        title: String
    }

    type Query {
        posts: [Post]
        post(id: Int): Post
        hello: String
    }

    type Mutation {
        createPost(title: String): Post
        updatePost(id: Int, title: String): Post
        deletePost(id: Int): Boolean
    }
    
`;
//# sourceMappingURL=index.js.map