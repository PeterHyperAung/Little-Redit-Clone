import type { PostgreSqlDriver, SqlEntityManager } from "@mikro-orm/postgresql";
import { Session } from "express-session";
import type { Request, Response } from "express";
import { User } from "./entities";

export interface ISession extends Session {
  userId?: number;
}

export type MyContext = {
  fork: SqlEntityManager<PostgreSqlDriver>;
  req?: Request & { session: ISession };
  res?: Response;
};

export type RegisterArgsType = {
  options: {
    username: string;
    password: string;
  };
};

export type FieldError = {
  field: string;
  message: string;
};

export type UserResponse = {
  errors?: FieldError[];
  user?: User;
};
