import { getDocs } from "firebase/firestore";

import { getCommentsCol } from "@/lib/firestore";

/**
 * Fetches comments for a feed item
 *
 * @param postId Id of the feed post to fetch the comments for
 * @returns An array of comment data for the post
 */
const getFeedComments = async (postId: string) => {
  const feedSnapshot = await getDocs(getCommentsCol(postId));
  const baseData = feedSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return baseData
    .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    .reverse();
};

export default getFeedComments;
