"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const Post_1 = require("../entities/Post");
exports.postResolver = {
    Query: {
        posts: async (_, __, { fork }) => {
            return await fork.find(Post_1.Post, {});
        },
        post: async (_, { id }, { fork }) => {
            return await fork.findOne(Post_1.Post, { id });
        },
    },
    Mutation: {
        createPost: async (_, { title }, { fork }) => {
            const post = fork.create(Post_1.Post, { title });
            await fork.persistAndFlush(post);
            return post;
        },
        updatePost: async (_, { title, id }, { fork }) => {
            const post = await fork.findOne(Post_1.Post, { id });
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
                await fork.nativeDelete(Post_1.Post, { id });
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