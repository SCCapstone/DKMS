import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import PlayButton from "@/components/music/buttons/PlayButton";
import ShareButton from "@/components/music/buttons/ShareButton";
import Skeleton from "@/components/ui/Skeleton";

const NormalArtist = async ({
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
    <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl">
      <div className="p-4 pb-0">
        <figure className="rounded-full overflow-clip relative aspect-square shadow-2xl">
          <Link href={`/app/artist/${artist.id}`}>
            <Image
              className="w-full h-full"
              src={img}
              alt={artist.name}
              fill
              blurDataURL={base64}
              placeholder="blur"
            />
          </Link>
        </figure>
      </div>
      <div className="card-body items-center text-center">
        <div className="btn-group">
          <PlayButton contextUri={artist.uri} />
          {/* @ts-expect-error Server Component */}
          <ShareButton musicItemId={artist.id} musicItemType="artist" />
        </div>
        <Link href={`/app/artist/${artist.id}`}>
          <h2 className="card-title">{artist.name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default NormalArtist;
