import { getDocs, query, where } from "firebase/firestore";

import { usersCol } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/getUser";

/**
 * Gets a list of DKMS users are not private.
 * @returns A list of users that are not private.
 */
const getPublicUsers = async () => {
  const currentUser = await getCurrentUser();
  const q = query(usersCol, where("visibility", "==", "public"));
  const baseData = await getDocs(q);

  return [
    currentUser,
    ...baseData.docs.map((user) => ({ ...user.data(), id: user.id })),
  ];
};

export default getPublicUsers;
