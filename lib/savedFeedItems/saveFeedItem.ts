import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { profilesCol } from "../firestore";

const saveFeedItem = async (userId: string, postId: string) =>
  updateDoc(doc(profilesCol, userId), {
    savedItemIds: arrayUnion(postId),
  });

export default saveFeedItem;
