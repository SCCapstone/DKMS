import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import PlayButton from "@/components/music/buttons/PlayButton";
import ShareButton from "@/components/music/buttons/ShareButton";
import Skeleton from "@/components/ui/Skeleton";
import { formatNumber } from "@/lib/formatters";

const CompactArtist = async ({
  artist,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
}) => {
  if (!artist) {
    return (
      <div className="card card-side bg-base-300 hover:bg-base-100 transition shadow-xl">
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
    <div className="card card-side card-compact bg-base-300 hover:bg-base-100 transition shadow-xl">
      <figure className="rounded-full m-2 relative aspect-square shadow-2xl">
        <Link href={`/app/artist/${artist.id}`}>
          <Image
            src={img}
            alt={artist.name}
            fill
            blurDataURL={base64}
            placeholder="blur"
          />
        </Link>
      </figure>
      <div className="card-body justify-between">
        <Link href={`/app/artist/${artist.id}`}>
          <h2 className="card-title text-primary font-extrabold">
            {artist.name}
          </h2>
          <p>{formatNumber(artist.followers.total)} followers</p>
        </Link>
        <div className="btn-group justify-end">
          <PlayButton contextUri={artist.uri} />
          {/* @ts-expect-error Server Component */}
          <ShareButton musicItemId={artist.id} musicItemType="artist" />
        </div>
      </div>
    </div>
  );
};

export default CompactArtist;
