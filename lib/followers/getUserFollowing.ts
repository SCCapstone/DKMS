import { getDocs } from "firebase/firestore";

import { usersCol } from "../firestore";

import isUserFollowing from "./isUserFollowing";

const getUserFollowing = async () => {
  const users = await getDocs(usersCol);
  const baseData = users.docs
    // eslint-disable-next-line no-return-await
    .filter(async (user) => await isUserFollowing(user.data().username))
    .map((user) => ({
      ...user.data(),
    }));

  return baseData;
};

export default getUserFollowing;
