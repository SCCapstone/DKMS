import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

import Skeleton from "@/components/ui/Skeleton";

import PlayButton from "./PlayButton";

const Artist = async ({
  artist,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
}) => {
  if (!artist) {
    return (
      <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl">
        <div className="pt-8 px-8">
          <figure className="rounded-full overflow-clip relative aspect-square shadow-2xl" />
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            <Skeleton enableAnimation />
          </h2>
        </div>
      </div>
    );
  }

  const image = artist.images[0] ?? {
    url: "/images/defaults/artist.png",
  };

  const { base64, img } = await getPlaiceholder(image.url, {
    size: 10,
  });

  return (
    <a
      href={artist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl"
    >
      <div className="pt-8 px-8">
        <figure className="rounded-full overflow-clip relative aspect-square shadow-2xl">
          <Image
            src={img}
            alt={artist.name}
            fill
            blurDataURL={base64}
            placeholder="blur"
          />
        </figure>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{artist.name}</h2>
      </div>
      <div>
        <PlayButton isTrackPlaying={false} uri={artist.uri} />
      </div>
    </a>
  );
};

export default Artist;
