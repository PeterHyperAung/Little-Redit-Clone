import { User } from "../entities";
import { ISession, MyContext, RegisterArgsType, UserResponse } from "src/types";
import argon2 from "argon2";

export const userResolver = {
  Query: {
    async me(_: any, __: any, { fork, req }: MyContext) {
      console.log(req);
      if (!req?.session.userId) {
        return null;
      }

      const user = await fork.findOne(User, { id: req.session.userId });
      return user;
    },
  },
  Mutation: {
    async register(
      _: any,
      { options: { username, password } }: RegisterArgsType,
      { fork }: MyContext
    ): Promise<UserResponse> {
      if (username.length <= 2) {
        return {
          errors: [
            {
              field: "username",
              message: "lenght must be greater than 2",
            },
          ],
        };
      }

      if (password.length <= 3) {
        return {
          errors: [
            {
              field: "username",
              message: "lenght must be greater than 3",
            },
          ],
        };
      }
      const hashedPassword = await argon2.hash(password);
      const user = fork.create(User, { username, password: hashedPassword });

      try {
        await fork.persistAndFlush(user);
      } catch (err) {
        // || err.detail.includes("already exists")
        // duplicate username error
        if (err.code === "23505") {
          return {
            errors: [
              {
                field: "username",
                message: "username already taken",
              },
            ],
          };
        }
        console.log("Message: ", err.message);
      }
      return { user };
    },

    async login(
      _: any,
      { options: { username, password } }: RegisterArgsType,
      { fork, req, res }: MyContext
    ): Promise<UserResponse> {
      const user = await fork.findOne(User, { username: username });
      if (!user) {
        return {
          errors: [
            {
              field: "username",
              message: "There's no user with this username!",
            },
          ],
        };
      }

      const valid = await argon2.verify(user.password, password);
      if (!valid) {
        return {
          errors: [
            {
              field: "password",
              message: "incorrent password",
            },
          ],
        };
      }

      // const session: ISession = await new Promise((resolve, reject) => {
      //   req.session.save(function (err) {
      //     if (err) {
      //       reject(err);
      //     }

      //     resolve(req.session);
      //   });
      // });

      req.session.userId = user.id;

      res.set(
        "Access-Control-Allow-Origin",
        "https://sandbox.embed.apollographql.com"
      );
      res.set("Access-Control-Allow-Credentials", "true");
      // res.set("trust proxy", "127.0.0.1");

      console.log("Session2 : ", req.session);

      return { user };
    },
  },
};
