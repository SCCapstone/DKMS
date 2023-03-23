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
