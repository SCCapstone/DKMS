import { collection, query, where, getDocs } from "firebase/firestore";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import FeedPage from "../feed/FeedPage";
import db from "../firebase";

// TODO SOPHIE FIX THIS (make it a utility function so we can use it in other places)
const getUser = async () => {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  const { user } = session;
  return user;
};

export type FeedItemRename = {
  id: string;
  data: { username: string; content: string };
};

async function getData() {
  const user = await getUser();
  // change to profile's username
  const q = query(
    collection(db, "feed_content"),
    where("username", "==", user.id)
  );
  const qSnapshot = await getDocs(q);

  return qSnapshot.docs.map(
    (doc) => ({ id: doc.id, data: doc.data() } as FeedItemRename)
  );
}

const Profile = async () => {
  const data = await getData();

  return (
    <div>
      <h1 className="normal-case font-bold">Profile</h1>
      <FeedPage data={data} />
    </div>
  );
};

export default Profile;
