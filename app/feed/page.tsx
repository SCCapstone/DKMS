import { collection, getDocs } from "firebase/firestore";

import db from "../firebase";

import FeedPage from "./FeedPage";

import type { FeedItemRename } from "../profile/page";

async function getData() {
  const items = collection(db, "feed_content");

  const itemsSnapshot = await getDocs(items);

  return itemsSnapshot.docs.map(
    (doc) => ({ id: doc.id, data: doc.data() } as FeedItemRename)
  );
}

const Feed = async () => {
  const data = await getData();

  return (
    <div>
      <h1 className="normal-case font-bold">Feed</h1>
      <FeedPage data={data} />
    </div>
  );
};

export default Feed;
