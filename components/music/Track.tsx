import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

import FavoriteIcon from "@/components/ui/favoriteIcon";
import Skeleton from "@/components/ui/Skeleton";
import getSpotifyData from "@/lib/getSpotifyData";
import joinArtists from "@/lib/joinArtists";

const checkIsFavorited = (trackId: string) =>
  getSpotifyData<SpotifyApi.CheckUsersSavedTracksResponse>(
    `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
    {
      cache: "no-cache",
    }
  ).then((data) => data[0]);

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

  const isFavorited = await checkIsFavorited(track.id);

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
      <div className="card-body relative">
        <div className="absolute top-0 right-0 p-2">
          <FavoriteIcon isFavorited={isFavorited} trackId={track.id} />
        </div>
        <h2 className="text-lg font-semibold truncate mt-10">{track.name}</h2>
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
