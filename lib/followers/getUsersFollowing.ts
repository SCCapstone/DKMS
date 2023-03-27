/* eslint-disable no-await-in-loop */
import { getDocs } from "firebase/firestore";

import { usersCol } from "../firestore";

import isUserFollowing from "./isUserFollowing";
import isUserFollowingMultiple from "./isUserFollowingMultiple";

const getUsersFollowing = async () => {
  const baseData = await getDocs(usersCol);
  const users = baseData.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));

  const usersFollowing = [];

  for (let i = 0; i < users.length; i += 1) {
    const value = users[i].username;
    const follow = await isUserFollowing(value, "user");

    if (follow) {
      usersFollowing.push(users[i]);
    }
  }

  return usersFollowing;
};

export default getUsersFollowing;
