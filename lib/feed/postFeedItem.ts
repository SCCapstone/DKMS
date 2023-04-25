import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import type { User } from "next-auth";

/**
 * Posts feed item to datase
 *
 * @param user User that is posting the feed item
 * @param content The text content that is being posted
 * @param musicItemId Id of the music item (if one exists)
 * @param musicItemType type of music item being posted (if any)
 * @returns id of post
 */
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
