import { doc, getDoc } from "firebase/firestore";
import { cache } from "react";
import "server-only";

import { profilesCol, usersCol } from "@/lib/firestore";

export const getCachedProfileDoc = cache(async (profileId: string) => {
  const profileDoc = await getDoc(doc(profilesCol, profileId));
  return profileDoc;
});

export const getCachedUserDoc = cache(async (userId: string) => {
  const userDoc = await getDoc(doc(usersCol, userId));
  return userDoc;
});
