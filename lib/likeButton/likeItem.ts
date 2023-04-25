import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";
import dispatchNotification from "@/lib/notifications/dispatchNotification";
/**
 * Dispatches notification that item has been liked
 * Updates collection of ids that have liked the item
 *
 * @param userId Id of user that liked the item
 * @param postId Id of post to like
 * @param username username of person liking the item
 */
const likeItem = async (userId: string, postId: string, username: string) => {
  await updateDoc(doc(feedCol, postId), {
    likedIds: arrayUnion(userId),
  });

  await dispatchNotification({
    feedId: postId,
    username,
    type: "like",
  });
};

export default likeItem;
