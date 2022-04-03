import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, protectedResolver }
) => {
  //패스워드 수정시 암호화
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "could not edit profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
