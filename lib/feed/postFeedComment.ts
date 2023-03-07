import { addDoc, serverTimestamp } from "firebase/firestore";

import { getCommentsCol } from "@/lib/firestore";

import type { User } from "next-auth";

const postFeedComment = async (postId: string, user: User, content: string) => {
  const docRef = await addDoc(getCommentsCol(postId), {
    content,
    likes: 0,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
  });

  return docRef.id;
};

export default postFeedComment;
