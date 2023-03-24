import { getDocs, doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import "server-only";

import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol, usersCol } from "@/lib/firestore";
import getProfilesFollowing from "@/lib/followers/getProfilesFollowing";
import getUsersFollowing from "@/lib/followers/getUsersFollowing";
import isUserFollowing from "@/lib/followers/isUserFollowing";

import BasePanel from "../BasePanel";

import TopTrack from "./TopTrack";

import type { FirestoreUser, FirestoreProfile } from "@/lib/firestore/types";

const MOCK_DATA = [
  {
    id: "1",
    title: "Kevin",
    username: "kevinnguyen",
    timestamp: "1 hr",
    body: "Colors - Thunder Jackson",
  },
  {
    id: "2",
    title: "Sophie",
    username: "sophie-saffron",
    timestamp: "10 hr",
    body: "Shotgun - George Ezra",
  },
  {
    id: "3",
    title: "Dalton",
    username: "cravend123",
    timestamp: "12 hr",
    body: "Les autres on verra - Madam Monsieur",
  },
  {
    id: "4",
    title: "Mason",
    username: "dkms",
    timestamp: "21 hr",
    body: "Tyler Herro - Jack Harlow",
  },
];

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
        <ul>
          {data.topTracks &&
            data.topTracks.map((topTrack) => (
              <TopTrack
                key={topTrack.id}
                number={topTrack.track_number}
                artists={topTrack.artists}
                track={topTrack.name}
              />
            ))}
        </ul>
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
          <Friend
            key={user.userId}
            username={user.username}
            userId={user.userId}
          />
        ))}
      </ul>
    </BasePanel>
  );
};

export default Friends;
