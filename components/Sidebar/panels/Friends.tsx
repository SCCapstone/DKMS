import { getDoc, doc } from "firebase/firestore";
import "server-only";

import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol } from "@/lib/firestore";
import getUserFollowing from "@/lib/followers/getUserFollowing";

import BasePanel from "./BasePanel";

import type { FirestoreProfile } from "@/lib/firestore/types";
import type { DocumentSnapshot } from "firebase-admin/firestore";

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

const Friend = ({
  username,
  userId,
  profile,
}: {
  username: string;
  userId: string;
  profile: FirestoreProfile | undefined;
}) => {
  const topTracks = profile?.topTracks;
  return (
    <li>
      <div className="h-fit">
        <div className="flex flex-row justify-between items-center">
          <h4 className="normal-case font-bold">
            {username ? (
              <UsernameLink username={username}>{username}</UsernameLink>
            ) : (
              username
            )}
          </h4>
          <ul>
            {topTracks?.map((track) => (
              <div>
                <h5>{track.track_number}</h5>
                <h5>{track.name}</h5>
                <ul>
                  {track.artists.map((artist) => (
                    <h6>{artist.name}</h6>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
        <div />
      </div>
      <div className="divider" />
    </li>
  );
};

const Friends = async () => {
  const following = await getUserFollowing();
  return (
    <BasePanel title="Friends" sidebarId="friends">
      <ul>
        {await Promise.all(
          following.map(async (item) => (
            <div>
              {item.id && (
                <Friend
                  key={item.id}
                  username={item.username}
                  userId={item.id}
                  profile={(await getDoc(doc(profilesCol, item.id))).data()}
                />
              )}
            </div>
          ))
        )}
      </ul>
    </BasePanel>
  );
};

export default Friends;
