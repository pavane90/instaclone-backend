export default {
  User: {
    totalFollowing: (root) => {
      console.log(root);
      return 666;
    },
    totalFollowers: () => 999,
  },
};
