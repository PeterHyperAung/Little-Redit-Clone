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
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const typeDefs_1 = require("./typeDefs");
const post_1 = require("./resolves/post");
const hello_1 = require("./resolves/hello");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const server = new server_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: [post_1.postResolver, hello_1.helloResolver],
    });
    await server.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server));
    app.listen(process.env.APP_PORT, () => {
        console.log("Server started on localhost:4000");
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map