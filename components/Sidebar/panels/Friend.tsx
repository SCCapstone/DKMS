import { getDoc, doc } from "firebase/firestore";
import { notFound } from "next/navigation";

import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol } from "@/lib/firestore";

import FriendItem from "./FriendItem";

const getTopItems = async (id: string) => {
  const profileDoc = await getDoc(doc(profilesCol, id));
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
    <li>
      <div className="h-fit">
        <div className="flex flex-row justify-between items-center">
          <h4 className="normal-case font-bold text-sm truncate">
            <UsernameLink username={username}>{username}</UsernameLink>
          </h4>
        </div>
        <ul>
          {tracks.map((track) => (
            <FriendItem key={track.id} track={track} />
          ))}
        </ul>
        <div className="divider" />
      </div>
    </li>
  );
};

export default Friend;
