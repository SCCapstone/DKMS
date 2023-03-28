import { doc, getDoc } from "firebase/firestore";

import { profilesCol } from "@/lib/firestore";

const getSavedItemIds = async (userId: string) => {
  const docRef = doc(profilesCol, userId);
  const profile = await getDoc(docRef);

  const data = profile.data();

  return data?.savedItemIds ?? [];
};

export default getSavedItemIds;
