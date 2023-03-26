import { getDocs } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import getFeedComments from "./getFeedComments";
import getSpotifyFeedItem from "./getSpotifyFeedItem";

const getFeedItems = async (userId?: string) => {
  const feedSnapshot = await getDocs(feedCol);
  const baseData = await Promise.all(
    feedSnapshot.docs.map(async (doc) => {
      const docId = doc.id;
      const comments = await getFeedComments(docId);
      const { trackId } = doc.data();
      const { playlistId } = doc.data();
      const { albumId } = doc.data();
      const { artistId } = doc.data();
      const musicItem = await getSpotifyFeedItem(
        trackId,
        playlistId,
        artistId,
        albumId
      );
      return {
        id: doc.id,
        ...doc.data(),
        comments,
        musicItem,
      };
    })
  );

  const formattedData = baseData
    .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    .reverse();

  if (!userId) {
    return formattedData;
  }

  return formattedData.filter((post) => post.userId === userId);
};

export default getFeedItems;
