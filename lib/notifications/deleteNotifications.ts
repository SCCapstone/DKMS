import { writeBatch, doc } from "firebase/firestore";

import firestore, { notificationsCol } from "@/lib/firestore";

import findNotifications from "./findNotifications";

type DeleteNotificationsType =
  | {
      postId: string;
      commentId?: string;
      notificationIds?: undefined;
    }
  | {
      postId?: undefined;
      commentId?: undefined;
      notificationIds: string[];
    };

/**
 * Deletes notification from database
 *
 * @param postId id of post for notifications to be deleted
 * @param commentId id of comments for notifications to be deleted
 * @param notificationIds ids of notification to be deleted
 * @returns promise that is resolved once the batch of notifications is deleted
 */
const deleteNotifications = async ({
  postId,
  commentId,
  notificationIds,
}: DeleteNotificationsType) => {
  const batch = writeBatch(firestore);

  const idsToDelete =
    notificationIds ?? (await findNotifications(postId, commentId));
  if (!idsToDelete) {
    return null;
  }
  idsToDelete.forEach((idToDelete) =>
    batch.delete(doc(notificationsCol, idToDelete))
  );

  return batch.commit();
};

export default deleteNotifications;
