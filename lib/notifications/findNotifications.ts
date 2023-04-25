import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "../firestore";

/**
 * Finds notification by id
 *
 * @param feedId id of feed that notification was dispatched for
 * @param commentId id of comment that id may have been dispatched for
 * @returns notifications for the feed that is being searched for
 */
const findNotifications = async (feedId: string, commentId?: string) => {
  const q = query(
    notificationsCol,
    commentId
      ? where("commentId", "==", commentId)
      : where("feedId", "==", feedId)
  );
  const notificationsDocs = await getDocs(q);

  if (notificationsDocs.empty) {
    return null;
  }

  return notificationsDocs.docs.map((doc) => doc.id);
};

export default findNotifications;
