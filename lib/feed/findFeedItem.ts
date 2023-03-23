import { doc, getDoc } from "firebase/firestore";

import firestore from "@/lib/firestore";

import getFeedComments from "./getFeedComments";

import type { FirestoreFeedItem } from "../firestore/types";
import type { DocumentReference } from "firebase/firestore";

const findFeedItem = async (itemId: string) => {
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
};

export default findFeedItem;
