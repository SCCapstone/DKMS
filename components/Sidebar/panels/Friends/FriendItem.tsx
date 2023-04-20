import Link from "next/link";

import ArtistLinks from "@/components/ui/ArtistLinks";

const FriendItem = ({ track }: { track: SpotifyApi.TrackObjectSimplified }) => (
  <li>
    <div className="flex flex-row justify-start content-center max-w-[224px]">
      <h5 className="text-xs truncate max-w-[112px]">
        <Link
          className="link link-hover link-secondary truncate max-w-[100px]"
          href={`/app/track/${track.id}`}
        >
          {track.name}
        </Link>
      </h5>
      <h5>&nbsp;•&nbsp;</h5>
      <div className="text-xs truncate max-w-[112px]">
        <ArtistLinks artists={track.artists} />
      </div>
    </div>
  </li>
);

export default FriendItem;
