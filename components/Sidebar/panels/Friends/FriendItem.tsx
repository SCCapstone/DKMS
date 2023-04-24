import Link from "next/link";

import ArtistLinks from "@/components/ui/ArtistLinks";

const FriendItem = ({ track }: { track: SpotifyApi.TrackObjectSimplified }) => (
  <li>
    <div className="h-fit">
      <div className="flex flex-col justify-start">
        <h5 className="text-sm font-bold truncate">
          <Link
            className="link link-hover link-secondary text-ellipsis overflow-hidden"
            href={`/app/track/${track.id}`}
          >
            {track.name}
          </Link>
        </h5>
        <div className="text-xs text-ellipsis overflow-hidden">
          <ArtistLinks artists={track.artists} />
        </div>
      </div>
    </div>
  </li>
);

export default FriendItem;
