export const typeDefs = `#graphql

    type Post {
        id: Int
        createdAt: String
        updatedAt: String
        title: String
    }

    type User {
        id: Int
        createdAt: String
        updatedAt: String
        username: String
    }

    type Query {
        posts: [Post]
        post(id: Int): Post
        hello: String
        me: User
    }


    input UserArgsInputType {
        username: String
        password: String
    }

    type FieldError {
        field: String
        message: String
    }

    type UserResponse {
        errors: [FieldError]
        user: User
    }

    type Mutation {
        createPost(title: String): Post
        updatePost(id: Int, title: String): Post
        deletePost(id: Int): Boolean
        register(options: UserArgsInputType): User
        login(options: UserArgsInputType): UserResponse
    }
    
`;
