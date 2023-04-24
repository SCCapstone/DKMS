import UsernameLink from "@/components/ui/UsernameLink";
import { getCachedProfileDoc } from "@/lib/firestore/cache";

import FriendItem from "./FriendItem";

const getTopItems = async (id: string) => {
  const profileDoc = await getCachedProfileDoc(id);
  if (!profileDoc.exists()) {
    return undefined;
  }

  return profileDoc.data();
};

const Friend = async ({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) => {
  const data = await getTopItems(userId);
  if (!data) {
    return null;
  }
  const topTrack = data.topTracks[0];
  return (
    <li>
      <div className="h-fit">
        <div className="flex flex-row justify-between items-center">
          <h4 className="normal-case font-bold text-sm truncate">
            <UsernameLink username={username}>{username}</UsernameLink>
          </h4>
        </div>
        <FriendItem track={topTrack} />
        <div className="divider" />
      </div>
    </li>
  );
};

export default Friend;
