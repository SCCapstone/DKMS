import { doc, deleteDoc } from "firebase/firestore";

import { feedCol } from "../firestore";

import type { FeedItemType } from "@/components/feed";

const deleteFeedItem = async (data: FeedItemType) => {
  await deleteDoc(doc(feedCol, "feed_items", data.id));
};

export default deleteFeedItem;
