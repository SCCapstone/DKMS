import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { profilesCol } from "../firestore";

const saveFeedItem = async (userId: string, postId: string) => {
  await updateDoc(doc(profilesCol, userId), {
    savedItemIds: arrayUnion(postId),
  });
};

export default saveFeedItem;
