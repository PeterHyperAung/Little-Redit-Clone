import { __dev__ } from "./constants";
import { Post, User } from "./entities";
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";

const config: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
  },
  entities: [Post, User],
  dbName: "lireddit",
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT) || 5432,
  type: "postgresql",
  debug: __dev__,
  driver: PostgreSqlDriver,
  driverOptions: { connection: { timezone: "+06:30" } },
};

export default config;
