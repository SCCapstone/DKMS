import { getDocs, orderBy, query } from "firebase/firestore";
import { cache } from "react";

import { feedCol } from "@/lib/firestore";
import getFollowedUsers from "@/lib/followers/getFollowedUsers";
import getPublicUsers from "@/lib/getPublicUsers";
import { getCurrentUser } from "@/lib/getUser";
import getSavedItemIds from "@/lib/savedFeedItems/getSavedItemIds";

import getFeedComments from "./getFeedComments";
import getSpotifyFeedItem from "./getSpotifyFeedItem";

import type { FirestoreFeedItem } from "@/lib/firestore/types";
import type { QueryDocumentSnapshot } from "firebase/firestore";

/* get filtered feed docs for current user */
const filterFeedDocs = async (
  docs: QueryDocumentSnapshot<FirestoreFeedItem>[],
  currentUserId: string,
  isPrivate: boolean
) => {
  /* filter check if user is private */
  if (isPrivate) {
    const followingIds = await getFollowedUsers().then((users) =>
      users.map((user) => user.id)
    );

    /* Filter by following */
    return docs.filter(
      (doc) =>
        doc.data().userId === currentUserId ||
        followingIds.includes(doc.data().userId)
    );
  }

  /* Get public users ids */
  const publicIds = await getPublicUsers().then((users) =>
    users.map((user) => user.id)
  );
  /* filter by which users are public */
  return docs.filter(
    (doc) =>
      doc.data().userId === currentUserId ||
      publicIds.includes(doc.data().userId)
  );
};

/**
 * Fetches feed item data
 *
 * @param filterByFollowing boolean that indicates if the method should filter the feed items by following or not
 * @param filterBySaved boolean that indicates if the method should filter the feed items by if they're saved or not
 * @returns array of feed items
 */
const getFeedItems = cache(
  async (params?: { filterByFollowing?: boolean; filterBySaved?: boolean }) => {
    const isPrivateFeed = params?.filterByFollowing ?? false;
    const filterBySaved = params?.filterBySaved ?? false;

    const currentUserId = await getCurrentUser().then((user) => user.id);
    const q = query(feedCol, orderBy("timestamp", "desc"));
    const feedSnapshot = await getDocs(q);

    const baseData = await filterFeedDocs(
      feedSnapshot.docs,
      currentUserId,
      isPrivateFeed
    );

    const dataWithComments = await Promise.all(
      baseData.map(async (doc) => {
        const docId = doc.id;
        const comments = await getFeedComments(docId);
        const { musicItemId, musicItemType, ...data } = doc.data();
        const musicItem = await getSpotifyFeedItem(musicItemId, musicItemType);
        return {
          id: doc.id,
          ...data,
          comments,
          musicItem,
        };
      })
    );

    if (!filterBySaved) return dataWithComments;

    const savedItemIds = await getSavedItemIds(currentUserId);

    return dataWithComments.filter((post) =>
      savedItemIds.includes(post.id.trim())
    );
  }
);

export default getFeedItems;
