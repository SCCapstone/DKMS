import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import type { User } from "next-auth";

const postFeedItem = async (
  user: User,
  content: string,
  track?:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.RecommendationTrackObject
    | SpotifyApi.PlaylistObjectSimplified
    | undefined
) => {
  const docRef = await addDoc(feedCol, {
    track,
    content,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
    likedIds: [],
  });

  return docRef.id;
};

export default postFeedItem;
