"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const entities_1 = require("../entities");
exports.postResolver = {
    Query: {
        posts: async (_, __, { fork }) => {
            return await fork.find(entities_1.Post, {});
        },
        post: async (_, { id }, { fork }) => {
            return await fork.findOne(entities_1.Post, { id });
        },
    },
    Mutation: {
        createPost: async (_, { title }, { fork }) => {
            const post = fork.create(entities_1.Post, { title });
            await fork.persistAndFlush(post);
            return post;
        },
        updatePost: async (_, { title, id }, { fork }) => {
            const post = await fork.findOne(entities_1.Post, { id });
            if (!post) {
                return null;
            }
            if (typeof title !== "undefined") {
                post.title = title;
                await fork.persistAndFlush(post);
            }
            return post;
        },
        deletePost: async (_, { id }, { fork }) => {
            try {
                await fork.nativeDelete(entities_1.Post, { id });
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        },
    },
};
//# sourceMappingURL=post.js.map