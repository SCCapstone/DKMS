import { collection, query, where, getDocs } from "firebase/firestore";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";

import FeedPage from "../../../components/feed/FeedPage";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import db from "../../firebase";

import type { FeedItemContent } from "../../../components/feed/FeedPage";

// TODO SOPHIE FIX THIS (make it a utility function so we can use it in other places)
const getUser = async () => {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  const { user } = session;
  return user.name;
};

async function getData(username: string) {
  // change to profile's username
  const q = query(
    collection(db, "feed_content"),
    where("username", "==", username)
  );
  const qSnapshot = await getDocs(q);

  return qSnapshot.docs.map(
    (doc) => ({ id: doc.id, data: doc.data() } as FeedItemContent)
  );
}

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  let profile;
  if (params.username === undefined) {
    profile = await getUser();
  } else {
    [profile] = params.username;
  }

  const data = await getData(profile);

  return (
    <div>
      <h1 className="normal-case font-bold">Profile</h1>
      <FeedPage data={data} />
    </div>
  );
};

export default Profile;
