// export const postResolver = () => {
//   return [
//     {
//       id: 1,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       title: "hello",
//     },
//     {
//       id: 2,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       title: "world",
//     },
//   ];
// };

export const postResolver = {
  Query: {
    posts: () => {
      return [
        {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: "hello",
        },
        {
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: "world",
        },
      ];
    },
  },
};
