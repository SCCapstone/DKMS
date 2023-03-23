import { getDocs } from "firebase/firestore";

import { usersCol } from "../firestore";

import isUserFollowing from "./isUserFollowing";

const getUserFollowing = async () => {
  const users = await getDocs(usersCol);
  const baseData = users.docs.map((docData) => ({
    ...docData.data(),
  }));

  const following = baseData.filter((user) => isUserFollowing(user.username));

  return following;
};

export default getUserFollowing;
