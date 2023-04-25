import { addDoc, serverTimestamp } from "firebase/firestore";

import { getCommentsCol } from "@/lib/firestore";

import dispatchNotification from "../notifications/dispatchNotification";

import type { User } from "next-auth";

/**
 * Posts comment to feed item
 *
 * @param postId Id of post that is being commented on
 * @param user User that is commenting
 * @param content text content of the comment
 * @returns Id of the posted comment
 */
const postFeedComment = async (postId: string, user: User, content: string) => {
  const docRef = await addDoc(getCommentsCol(postId), {
    content,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
  });

  await dispatchNotification({
    feedId: postId,
    commentId: docRef.id,
    username: user.username,
    type: "comment",
  });
  return docRef.id;
};

export default postFeedComment;
