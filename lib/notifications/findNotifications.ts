import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "../firestore";

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
