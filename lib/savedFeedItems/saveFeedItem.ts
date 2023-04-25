import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { profilesCol } from "@/lib/firestore";

/**
 * Saves feed item
 *
 * @param userId id of user that is saving the feed item
 * @param postId id of post that the user is saving
 */
const saveFeedItem = async (userId: string, postId: string) =>
  updateDoc(doc(profilesCol, userId), {
    savedItemIds: arrayUnion(postId),
  });

export default saveFeedItem;
