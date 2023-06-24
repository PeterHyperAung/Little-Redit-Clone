import type { PostgreSqlDriver, SqlEntityManager } from "@mikro-orm/postgresql";

export type MyContext = {
  fork: SqlEntityManager<PostgreSqlDriver>;
};
