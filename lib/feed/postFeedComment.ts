import { addDoc, serverTimestamp } from "firebase/firestore";

import { getCommentsCol } from "@/lib/firestore";

import dispatchNotification from "../notifications/dispatchNotification";

import type { User } from "next-auth";

const postFeedComment = async (postId: string, user: User, content: string) => {
  const docRef = await addDoc(getCommentsCol(postId), {
    item: undefined,
    content,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
    likedIds: [],
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
