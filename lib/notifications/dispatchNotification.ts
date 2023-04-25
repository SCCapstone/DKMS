import { addDoc, serverTimestamp } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";

import findFeedItem from "../feed/findFeedItem";

const DISPATCH_MESSAGES = {
  comment: (username: string) => `${username} commented on your post`,
  like: (username: string) => `${username} liked your post`,
} as const;

type DispatchNotificationType = keyof typeof DISPATCH_MESSAGES;

/**
 * Dispatches notification when user likes or comments on currently logged in user's post
 *
 * @param feedId id of feed that notification is dispatching for
 * @param commentId id of commentId that notification may be dispatching for
 * @param username username of user that is liking or commenting on post
 * @param type type of notification - comment or like
 * @returns id of notification
 */
const dispatchNotification = async ({
  feedId,
  commentId,
  username,
  type,
}: {
  feedId: string;
  commentId?: string;
  username: string;
  type: DispatchNotificationType;
}) => {
  const item = await findFeedItem(feedId);

  if (!item) {
    return null;
  }

  const docRef = await addDoc(notificationsCol, {
    timestamp: serverTimestamp(),
    recipientId: item.userId,
    feedId,
    ...(commentId ? { commentId } : {}),
    type,
    username,
    body: DISPATCH_MESSAGES[type](username),
  });

  return docRef.id;
};

export default dispatchNotification;
