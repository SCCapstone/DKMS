import { doc, updateDoc } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";

/**
 * Sets display name to new name
 *
 * @param userId id of user that is changing display name
 * @param name new name to set display name to
 */
const setDisplayName = async (userId: string, name: string) =>
  updateDoc(doc(usersCol, userId), {
    name,
  });

export default setDisplayName;
