import Link from "next/link";

import ArtistLinks from "@/components/ui/ArtistLinks";

const FriendItem = ({ track }: { track: SpotifyApi.TrackObjectFull }) => (
  <li>
    <div className="flex flex-row justify-start content-center max-w-[224px]">
      <h5 className="text-xs truncate max-w-[112px]">
        <Link
          className="link link-hover link-secondary truncate max-w-[100px]"
          href={track.external_urls.spotify}
        >
          {track.name}
        </Link>
      </h5>
      <h5>&nbsp;•&nbsp;</h5>
      <h5 className="text-xs truncate max-w-[112px]">
        <ArtistLinks artists={track.artists} />
      </h5>
    </div>
  </li>
);

export default FriendItem;
