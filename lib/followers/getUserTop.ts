import { getDoc, doc } from "firebase/firestore";

import { profilesCol } from "../firestore";

import type { FirestoreProfile } from "../firestore/types";

const getUserTop = async (id: string) => {
  const profile = await getDoc<FirestoreProfile>(doc(profilesCol, id));
  return profile;
};

export default getUserTop;
