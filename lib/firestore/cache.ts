import { doc, getDoc } from "firebase/firestore";
import { cache } from "react";
import "server-only";

import { profilesCol, usersCol } from "@/lib/firestore";

/* Get cached profile document from database */
export const getCachedProfileDoc = cache(async (profileId: string) => {
  const profileDoc = await getDoc(doc(profilesCol, profileId));
  return profileDoc;
});

/* get cached user document from database */
export const getCachedUserDoc = cache(async (userId: string) => {
  const userDoc = await getDoc(doc(usersCol, userId));
  return userDoc;
});
