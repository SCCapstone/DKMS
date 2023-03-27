import Link from "next/link";

const FriendItem = ({ track }: { track: SpotifyApi.TrackObjectFull }) => (
  <div>
    <div className="flex flex-wrap">
      <h4 className="text-xs">
        <Link
          className="link link-hover link-secondary truncate"
          href={track.external_urls.spotify}
        >
          {track.name}
        </Link>
      </h4>
      <h4 className="text-xs">&nbsp;•&nbsp;</h4>
      {track.artists.map((artist) => (
        <h4 key={artist.id} className="text-xs">
          <Link
            href={artist.external_urls.spotify}
            className="link link-hover link-neutral"
          >
            {artist.name}&nbsp;
          </Link>
        </h4>
      ))}
    </div>
  </div>
);

export default FriendItem;
