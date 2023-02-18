import { collection, query, where, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

import FeedPage from "../../../components/feed/FeedPage";
import ProfileImg from "../../../components/feed/ProfileImg";
import PageTitle from "../../../components/ui/PageTitle";
import { formatFollowers } from "../../../lib/formatters";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import db from "../../firebase";

import type { FeedItemContent } from "../../../components/feed/FeedPage";

// TODO SOPHIE FIX THIS (make it a utility function so we can use it in other places)
const getUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  return session.user;
};

const getCurrentUsername = async () => {
  const user = await getUser();
  return user.id;
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
  const username = params.username
    ? params.username[0]
    : await getCurrentUsername();

  const user = await getUser();
  const data = await getData(username);

  return (
    <div>
      <div className="flex flex-row">
        <ProfileImg img="" />
        <h1 className="normal-case font-bold">Profile — {username}</h1>
      </div>
      <h2 className="normal-case">
        {formatFollowers(user.totalFollowers)} followers
      </h2>
      <FeedPage data={data} />
    </div>
  );
};

export default Profile;
