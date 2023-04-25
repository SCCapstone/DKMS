import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib//firestore";

import deleteNotifications from "../notifications/deleteNotifications";

/**
 * Removes id from collection of ids that have liked feed item
 *
 * @param userId Id of user unliking the item
 * @param postId Id of post that the user is unliking
 */
const unlikeItem = async (userId: string, postId: string) => {
  await updateDoc(doc(feedCol, postId), {
    likedIds: arrayRemove(userId),
  });

  await deleteNotifications({ postId });
};

export default unlikeItem;
