export const typeDefs = `#graphql
    type Query {
        posts: [Post]
        hello: String
    }

    type Post {
        id: ID
        createdAt: String
        updatedAt: String
        title: String
    }
`;
