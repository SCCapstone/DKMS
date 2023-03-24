import { getDocs, getDoc, doc } from "firebase/firestore";

import firestore, { profilesCol, usersCol } from "../firestore";

import getUsersFollowing from "./getUsersFollowing";
import isUserFollowing from "./isUserFollowing";

const getProfilesFollowing = async () => {
  const users = await getDocs(usersCol);
  const profiles = await Promise.all(
    users.docs
      .filter((user) => isUserFollowing(user.data().username))
      .map(async (user) => {
        const profileId = user.id;
        const profile = await getDoc(doc(profilesCol, profileId));
        return {
          ...profile.data(),
        };
      })
  );
  return profiles;
};

export default getProfilesFollowing;
