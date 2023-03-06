import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "lib/firestore";

import type { User } from "next-auth";

const postFeedItem = async (user: User, content: string) => {
  const docRef = await addDoc(feedCol, {
    content,
    likes: 0,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
  });

  return docRef.id;
};

export default postFeedItem;
