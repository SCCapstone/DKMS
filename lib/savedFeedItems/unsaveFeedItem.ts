import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { profilesCol } from "../firestore";

const unsaveFeedItem = async (userId: string, postId: string) =>
  updateDoc(doc(profilesCol, userId), {
    savedItemIds: arrayRemove(postId),
  });

export default unsaveFeedItem;
