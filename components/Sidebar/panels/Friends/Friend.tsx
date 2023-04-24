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
  const tracks = data.topTracks.slice(0, 2);
  return (
    <li className="card card-compact bg-base-100 text-base-content shadow-lg">
      <div className="card-body">
        <h4 className="normal-case font-bold text-sm truncate">
          <UsernameLink username={username}>{username}</UsernameLink>
        </h4>
        <ul className="grid grid-cols-1 gap-2">
          {tracks.map((track) => (
            <FriendItem key={track.id} track={track} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Friend;
