import { getDocs, getDoc, doc } from "firebase/firestore";

import { usersCol, profilesCol } from "../firestore";

import isUserFollowing from "./isUserFollowing";

import type { FirestoreProfile } from "../firestore/types";
import type { DocumentSnapshot } from "firebase-admin/firestore";

export type usersTops = {
  id: string;
  displayName: string;
  username: string;
  uri: string;
  url: string;
  followers: number;
  image: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  profile: (id: string) => Promise<DocumentSnapshot<FirestoreProfile>>;
};

const getUserTopTracks = async (id: string) => {
  const topTracks = await getDoc(doc(profilesCol, id));
  return topTracks;
};

const getUserFollowing = async () => {
  const users = await getDocs(usersCol);
  const baseData = users.docs.map((docData) => ({
    ...docData.data(),
    profile: getUserTopTracks(docData.id),
  }));

  const following = baseData.filter((user) => isUserFollowing(user.username));

  return following;
};

export default getUserFollowing;
