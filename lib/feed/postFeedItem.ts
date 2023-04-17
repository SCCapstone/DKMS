import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import type { User } from "next-auth";

export type MusicItemTypes = "track" | "playlist" | "artist" | "album";

const postFeedItem = async (
  user: User,
  content: string,
  musicItemId?: string | undefined,
  musicItemType?: MusicItemTypes | undefined
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
