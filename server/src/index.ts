import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
config();

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { __dev__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { typeDefs } from "./typeDefs";
import { postResolver } from "./resolves/post";
import { helloResolver } from "./resolves/hello";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  const fork = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers: [postResolver, helloResolver],
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async () => ({
        fork,
      }),
    })
  );

  app.listen(process.env.APP_PORT, () => {
    console.log("Server started on localhost:4000");
  });
  // const post = fork.create(Post, { title: "my first post" });
  // await fork.persistAndFlush(post);

  // const posts = await fork.find(Post, {});
  // console.log(posts);
};

main().catch((err) => console.log(err));
