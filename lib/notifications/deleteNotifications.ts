import { writeBatch, doc } from "firebase/firestore";

import firestore, { notificationsCol } from "@/lib/firestore";

import findNotifications from "./findNotifications";

const deleteNotifications = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId?: string;
}) => {
  const batch = writeBatch(firestore);

  const idsToDelete = await findNotifications(postId, commentId);
  if (!idsToDelete) {
    return null;
  }
  idsToDelete.forEach((idToDelete) =>
    batch.delete(doc(notificationsCol, idToDelete))
  );

  return batch.commit();
};

export default deleteNotifications;
