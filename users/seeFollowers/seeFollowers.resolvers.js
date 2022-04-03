import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      //select를 통해 일부결과만 반환
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      console.log(ok);
      if (!ok) {
        return {
          ok: false,
          error: "User not found.",
        };
      }

      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
