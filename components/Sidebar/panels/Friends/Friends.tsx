import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import "server-only";

import Track from "@/components/music/Track";
import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol } from "@/lib/firestore";
import getUsersFollowing from "@/lib/followers/getUsersFollowing";

import BasePanel from "../BasePanel";

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
          <h4 className="normal-case font-bold">
            {username ? (
              <UsernameLink username={username}>{username}</UsernameLink>
            ) : (
              username
            )}
          </h4>
        </div>
        <div>
          <ul className="flex-row">
            {tracks.map((topTrack) => (
              <Track key={topTrack.id} track={topTrack} />
            ))}
          </ul>
        </div>
        <div />
      </div>
      <div className="divider" />
    </div>
  );
};

const Friends = async () => {
  const users = await getUsersFollowing();
  return (
    <BasePanel title="Friends" sidebarId="friends">
      <ul>
        {users.map((user) => (
          <Friend key={user.id} username={user.username} userId={user.id} />
        ))}
      </ul>
    </BasePanel>
  );
};

export default Friends;
