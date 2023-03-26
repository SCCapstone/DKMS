import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import type { User } from "next-auth";

const postFeedItem = async (
  user: User,
  content: string,
  trackId?: string,
  playlistId?: string,
  artistId?: string,
  albumId?: string
) => {
  const docRef = await addDoc(feedCol, {
    trackId,
    playlistId,
    artistId,
    albumId,
    content,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
    likedIds: [],
  });

  return docRef.id;
};

export default postFeedItem;
