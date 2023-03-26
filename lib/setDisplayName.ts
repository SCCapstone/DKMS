import { doc, updateDoc } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";

const setDisplayName = async (userId: string, name: string) =>
  updateDoc(doc(usersCol, userId), {
    name,
  });

export default setDisplayName;
