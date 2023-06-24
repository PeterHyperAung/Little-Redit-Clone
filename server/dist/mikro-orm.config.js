"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const entities_1 = require("./entities");
const postgresql_1 = require("@mikro-orm/postgresql");
const path_1 = __importDefault(require("path"));
const config = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
    },
    entities: [entities_1.Post, entities_1.User],
    dbName: "lireddit",
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT) || 5432,
    type: "postgresql",
    debug: constants_1.__dev__,
    driver: postgresql_1.PostgreSqlDriver,
    driverOptions: { connection: { timezone: "+06:30" } },
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map