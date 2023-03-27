import Image from "next/image";
import Link from "next/link";

import ArtistLinks from "@/components/ui/ArtistLinks";

const FriendItem = ({ track }: { track: SpotifyApi.TrackObjectFull }) => (
  <li>
    <div className="flex flex-row justify-start max-w-[224px]">
      <h5 className="text-xs truncate">
        <Link
          className="link link-hover link-secondary max-w-[100px]"
          href={track.external_urls.spotify}
        >
          {track.name}
        </Link>
        &nbsp;•&nbsp;
        <ArtistLinks artists={track.artists} />
      </h5>
    </div>
  </li>
);

export default FriendItem;
