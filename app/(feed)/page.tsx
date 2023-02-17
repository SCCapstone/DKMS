import { collection, getDocs } from "firebase/firestore";

import FeedPage from "../../components/feed/FeedPage";
import PageTitle from "../../components/ui/PageTitle";
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
      <PageTitle title="Feed" />
      <FeedPage data={data} showLinks />
    </div>
  );
};

export default Feed;
