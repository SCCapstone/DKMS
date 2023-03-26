import { doc, updateDoc } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";

const setDisplayName = async (userId: string, displayName: string) =>
  updateDoc(doc(usersCol, userId), {
    displayName,
  });

export default setDisplayName;
