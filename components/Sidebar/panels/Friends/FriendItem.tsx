import Link from "next/link";

import ArtistLinks from "@/components/ui/ArtistLinks";

const FriendItem = ({ track }: { track: SpotifyApi.TrackObjectSimplified }) => (
  <li className="card card-compact bg-base-300 text-base-content text-xs">
    <div className="card-body">
      <h4 className="font-bold truncate text-xs">
        <Link href={`/app/track/${track.id}`}>{track.name}</Link>
      </h4>
      <div className="text-xs">
        <ArtistLinks artists={track.artists} />
      </div>
    </div>
  </li>
);

export default FriendItem;
