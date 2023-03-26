import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

import Skeleton from "@/components/ui/Skeleton";
import joinArtists from "@/lib/joinArtists";

import PlayTrack from "./PlayTrack";

const Track = async ({
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

  const image = track.album.images[0] ?? { url: "/images/defaults/track.png" };

  const { base64, img } = await getPlaiceholder(image.url, {
    size: 10,
  });

  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip"
    >
      <figure className="relative aspect-square">
        <Image
          src={img}
          alt={track.name}
          fill
          placeholder="blur"
          blurDataURL={base64}
        />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-semibold truncate">{track.name}</h2>
        <p>
          {new Date(track.album.release_date).getFullYear()} |{" "}
          {track.album.name}
        </p>
        <p>{joinArtists(track.artists)}</p>
      </div>
      <div>
        <PlayTrack isTrackPlaying={false} uri={track.uri} />
      </div>
    </a>
  );
};

export default Track;
