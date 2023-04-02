import { doc, updateDoc } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";

import type { User } from "next-auth";

const setVisibility = async (userId: string, visibility: User["visibility"]) =>
  updateDoc(doc(usersCol, userId), {
    visibility,
  });

export default setVisibility;
