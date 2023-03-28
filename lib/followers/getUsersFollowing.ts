import { getDocs } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";

import isUserFollowing from "./isUserFollowing";

/**
 * Gets a list of DKMS users that the current user is following.
 * @returns A list of users that the current user is following.
 */
const getUsersFollowing = async () => {
  const baseData = await getDocs(usersCol);
  const users = baseData.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));

  const followingUsers = await isUserFollowing(
    users.map((user) => user.username),
    "user"
  );

  return users.filter((_user, index) => followingUsers[index]);
};

export default getUsersFollowing;
