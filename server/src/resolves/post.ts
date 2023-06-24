import { Post } from "../entities/Post";
import { MyContext } from "src/types";

export const postResolver = {
  Query: {
    posts: async (_: any, __: any, { fork }: MyContext): Promise<Post[]> => {
      return await fork.find(Post, {});
    },

    post: async (
      _: any,
      { id }: { id: number },
      { fork }: MyContext
    ): Promise<Post | null> => {
      return await fork.findOne(Post, { id });
    },
  },

  Mutation: {
    createPost: async (
      _: any,
      { title }: { title: string },
      { fork }: MyContext
    ): Promise<Post> => {
      const post = fork.create(Post, { title });
      await fork.persistAndFlush(post);
      return post;
    },

    updatePost: async (
      _: any,
      { title, id }: { title: string; id: number },
      { fork }: MyContext
    ): Promise<Post | null> => {
      const post = await fork.findOne(Post, { id });
      if (!post) {
        return null;
      }

      if (typeof title !== "undefined") {
        post.title = title;
        await fork.persistAndFlush(post);
      }

      return post;
    },

    deletePost: async (
      _: any,
      { id }: { id: number },
      { fork }: MyContext
    ): Promise<boolean> => {
      try {
        await fork.nativeDelete(Post, { id });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};
