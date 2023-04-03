import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import type { User } from "next-auth";

const postFeedItem = async (
  user: User,
  content: string,
  musicItemId?: string | undefined,
  musicItemType?: "track" | "playlist" | "artist" | "album" | undefined
) => {
  const docRef = await addDoc(feedCol, {
    ...(musicItemId ? { musicItemId } : {}),
    ...(musicItemType ? { musicItemType } : {}),
    content,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
    likedIds: [],
  });

  return docRef.id;
};

export default postFeedItem;
