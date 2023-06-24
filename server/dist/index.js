"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const typeDefs_1 = require("./typeDefs");
const resolves_1 = require("./resolves");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
let redisClient = (0, redis_1.createClient)();
redisClient.connect().catch(console.error);
let redisStore = new connect_redis_1.default({
    client: redisClient,
    prefix: "lireddit:",
    disableTouch: true,
});
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const fork = orm.em.fork();
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        name: "qid",
        store: redisStore,
        resave: false,
        saveUninitialized: false,
        secret: "keyboard cat",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: !constants_1.__dev__,
        },
    }));
    const server = new server_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: [resolves_1.postResolver, resolves_1.userResolver],
    });
    await server.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => ({
            fork,
            req,
            res,
        }),
    }));
    app.listen(process.env.APP_PORT, () => {
        console.log("Server's running on Port : " + process.env.APP_PORT);
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map