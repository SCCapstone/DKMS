import { getDoc, doc } from "firebase/firestore";
import { notFound } from "next/navigation";

import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol } from "@/lib/firestore";

import FriendItem from "./FriendItem";

const getTopItems = async (id: string) => {
  const profileDoc = await getDoc(doc(profilesCol, id));
  if (!profileDoc.exists()) {
    notFound();
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
  const tracks = data.topTracks.slice(0, 2);
  return (
    <div>
      <div className="h-fit">
        <div className="flex flex-row justify-between items-center">
          <h4 className="normal-case font-bold text-sm">
            {username ? (
              <UsernameLink username={username}>{username}</UsernameLink>
            ) : (
              username
            )}{" "}
          </h4>
        </div>
        <div className="flex flex-column">
          <ul>
            {tracks.map((track) => (
              <FriendItem key={track.id} track={track} />
            ))}
          </ul>
        </div>
        <div className="divider" />
      </div>
    </div>
  );
};

export default Friend;
