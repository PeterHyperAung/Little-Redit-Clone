"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
exports.postResolver = {
    Query: {
        posts: () => {
            return [
                {
                    id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    title: "hello",
                },
                {
                    id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    title: "world",
                },
            ];
        },
    },
};
//# sourceMappingURL=post.js.map