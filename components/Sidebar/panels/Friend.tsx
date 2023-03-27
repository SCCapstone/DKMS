import { getDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { notFound } from "next/navigation";

import UsernameLink from "@/components/ui/UsernameLink";
import { profilesCol } from "@/lib/firestore";

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
            )}{" "}
            is listening to
          </h4>
        </div>
        <div>
          <ul className="flex-column">
            {tracks.map((topTrack) => (
              <div className="flex-row" key={topTrack.id}>
                <Link
                  className="link link-hover link-secondary break-all"
                  href={topTrack.external_urls.spotify}
                >
                  {topTrack.name}
                </Link>
                <h5> by </h5>
                {topTrack.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    className="link link-hover link-neutral"
                  >
                    {artist.name}&nbsp;
                  </Link>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default Friend;
