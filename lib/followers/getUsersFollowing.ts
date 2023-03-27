import { getDocs } from "firebase/firestore";

import { usersCol } from "../firestore";

import isUserFollowing from "./isUserFollowing";

const getUsersFollowing = async () => {
  const baseData = await getDocs(usersCol);
  const users = baseData.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));

  const usersFollowing = users.filter((user) =>
    isUserFollowing(user.username, "user")
  );

  return usersFollowing;
};

export default getUsersFollowing;
