"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const entities_1 = require("../entities");
const argon2_1 = __importDefault(require("argon2"));
exports.userResolver = {
    Query: {
        async me(_, __, { fork, req }) {
            console.log(req);
            if (!(req === null || req === void 0 ? void 0 : req.session.userId)) {
                return null;
            }
            const user = await fork.findOne(entities_1.User, { id: req.session.userId });
            return user;
        },
    },
    Mutation: {
        async register(_, { options: { username, password } }, { fork }) {
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
            const hashedPassword = await argon2_1.default.hash(password);
            const user = fork.create(entities_1.User, { username, password: hashedPassword });
            try {
                await fork.persistAndFlush(user);
            }
            catch (err) {
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
        async login(_, { options: { username, password } }, { fork, req, res }) {
            const user = await fork.findOne(entities_1.User, { username: username });
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
            const valid = await argon2_1.default.verify(user.password, password);
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
            req.session.userId = user.id;
            res.set("Access-Control-Allow-Origin", "https://sandbox.embed.apollographql.com");
            res.set("Access-Control-Allow-Credentials", "true");
            console.log("Session2 : ", req.session);
            return { user };
        },
    },
};
//# sourceMappingURL=user.js.map