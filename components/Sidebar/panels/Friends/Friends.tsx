import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import "server-only";

import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol } from "@/lib/firestore";
import getUsersFollowing from "@/lib/followers/getUsersFollowing";

import BasePanel from "../BasePanel";

import TopTrack from "./TopTrack";

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
          <ul>
            {data.topTracks.map((topTrack) => (
              <TopTrack
                key={topTrack.id}
                trackNumber={topTrack.track_number}
                artists={topTrack.artists}
                track={topTrack.name}
              />
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
