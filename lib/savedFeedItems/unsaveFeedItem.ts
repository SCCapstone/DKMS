import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { profilesCol } from "@/lib/firestore";

/**
 * Unsaves feed item
 *
 * @param userId id of user that is unsaving feed item
 * @param postId id of post that user is unsaving
 */
const unsaveFeedItem = async (userId: string, postId: string) =>
  updateDoc(doc(profilesCol, userId), {
    savedItemIds: arrayRemove(postId),
  });

export default unsaveFeedItem;
