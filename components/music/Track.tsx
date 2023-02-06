import Image from "next/image";

import joinArtists from "lib/joinArtists";

import Skeleton from "../ui/Skeleton";

const Track = ({
  track,
}: {
  track: SpotifyApi.TrackObjectFull | undefined;
}) => {
  if (!track) {
    return (
      <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
        <figure className="relative aspect-square" />
        <div className="card-body">
          <h2 className="text-lg font-semibold">
            <Skeleton enableAnimation />
          </h2>
          <p>
            <Skeleton enableAnimation />
          </p>
          <p>
            <Skeleton enableAnimation />
          </p>
        </div>
      </div>
    );
  }

  const image = track.album.images[0];
  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip"
    >
      <figure className="relative aspect-square">
        <Image src={image.url} alt={track.name} fill />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-semibold truncate">{track.name}</h2>
        <p>
          {new Date(track.album.release_date).getFullYear()} |{" "}
          {track.album.name}
        </p>
        <p>{joinArtists(track.artists)}</p>
      </div>
    </a>
  );
};

export default Track;
