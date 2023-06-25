import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
config();

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { __dev__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { typeDefs } from "./typeDefs";
import { postResolver, userResolver } from "./resolves";

// Redis imports
import RedisStore from "connect-redis";
import session, { Store } from "express-session";
import { createClient } from "redis";

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "lireddit:",
  disableTouch: true,
});

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  const fork = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();

  app.use(express.json());
  app.use((req, res, next) => {
    req.headers["x-forwarded-proto"] = "https";
    next();
  });

  app.use(
    session({
      name: "qid",
      store: redisStore as unknown as Store,
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "keyboard cat",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "none", // csrf
        secure: true, // cookie only works in https
      },
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers: [postResolver, userResolver],
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        fork,
        req,
        res,
      }),
    })
  );

  app.listen(process.env.APP_PORT, () => {
    console.log("Server's running on Port : " + process.env.APP_PORT);
  });
  // const post = fork.create(Post, { title: "my first post" });
  // await fork.persistAndFlush(post);

  // const posts = await fork.find(Post, {});
  // console.log(posts);
};

main().catch((err) => console.log(err));
