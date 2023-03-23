import { addDoc, serverTimestamp } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";

import findFeedItem from "../feed/findFeedItem";

const dispatchNotification = async ({
  feedId,
  username,
}: {
  feedId: string;
  username: string;
}) => {
  const item = await findFeedItem(feedId);

  if (!item) {
    return null;
  }

  const docRef = await addDoc(notificationsCol, {
    timestamp: serverTimestamp(),
    recipientId: item.userId,
    feedId,
    type: "comment",
    username,
    body: `${username} commented on your post`,
  });

  return docRef.id;
};

export default dispatchNotification;
