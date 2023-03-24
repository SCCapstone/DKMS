import { getDocs } from "firebase/firestore";

import { usersCol } from "../firestore";

import isUserFollowing from "./isUserFollowing";

const getUsersFollowing = async () => {
  const baseData = await getDocs(usersCol);
  const users = baseData.docs.map((user) => ({
    userId: user.id,
    ...user.data(),
  }));

  const followed = users.filter((user) => isUserFollowing(user.username));
  return followed;
};

export default getUsersFollowing;
