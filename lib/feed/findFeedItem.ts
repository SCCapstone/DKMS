import { doc, getDoc } from "firebase/firestore";
import { cache } from "react";

import firestore from "@/lib/firestore";

import getFeedComments from "./getFeedComments";

import type { FirestoreFeedItem } from "../firestore/types";
import type { DocumentReference } from "firebase/firestore";

/**
 * Fetches feed item data by searching for its id
 *
 * @param itemId id of the feed item to fetch
 * @returns The data of the fetched feed item
 */
const findFeedItem = cache(async (itemId: string) => {
  const docRef = doc(
    firestore,
    "feed_items",
    itemId
  ) as DocumentReference<FirestoreFeedItem>;
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const comments = await getFeedComments(docSnap.id);
    return { id: docSnap.id, ...docSnap.data(), comments };
  }

  return null;
});

export default findFeedItem;
