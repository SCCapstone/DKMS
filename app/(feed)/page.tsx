import { collection, getDocs } from "firebase/firestore";

import FeedPage from "../../components/feed/FeedPage";
import db from "../firebase";

import type { FeedItemContent } from "../../components/feed/FeedPage";

async function getData() {
  const items = collection(db, "feed_content");

  const itemsSnapshot = await getDocs(items);

  return itemsSnapshot.docs.map(
    (doc) => ({ id: doc.id, data: doc.data() } as FeedItemContent)
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
