import { doc, updateDoc } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";

import type { User } from "next-auth";

/**
 * Sets privacy for user
 *
 * @param userId id of user that is changing privacy settings
 * @param visibility visibility that the user is setting their privacy to
 */
const setVisibility = async (userId: string, visibility: User["visibility"]) =>
  updateDoc(doc(usersCol, userId), {
    visibility,
  });

export default setVisibility;
