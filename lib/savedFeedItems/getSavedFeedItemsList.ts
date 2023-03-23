import { doc, getDoc } from "firebase/firestore";

import { profilesCol } from "@/lib/firestore";

const getSavedFeedItemsList = async (userId: string) => {
  const docRef = doc(profilesCol, userId);
  const profile = await getDoc(docRef);

  const data = profile.data();
  if (data) {
    return data.savedItemIds;
  }
  return [];
};

export default getSavedFeedItemsList;
