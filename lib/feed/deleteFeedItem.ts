import { doc, deleteDoc } from "firebase/firestore";

import deleteNotifications from "@/lib/notifications/deleteNotifications";

import { getCommentsCol, feedCol } from "../firestore";

/**
 * Deletes feed item
 *
 * @param postId Id of the post to delete
 * @param commentId Id of the comments to delete if there are any
 */
const deleteFeedItem = async (postId: string, commentId?: string) => {
  if (commentId) {
    await deleteDoc(doc(getCommentsCol(postId), commentId));
  } else {
    await deleteDoc(doc(getCommentsCol(postId)));
    await deleteDoc(doc(feedCol, postId));
  }
  await deleteNotifications({ postId, commentId });
};

export default deleteFeedItem;
