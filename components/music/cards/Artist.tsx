import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import ShareIcon from "@/components/ui/shareIcon";
import Skeleton from "@/components/ui/Skeleton";
import { formatNumber } from "@/lib/formatters";

import PlayContext from "../PlayContext";

const Artist = async ({
  artist,
  isCompact,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
  isCompact?: boolean;
}) => {
  if (!artist) {
    return (
      <div
        className={`card ${
          isCompact ? "card-side" : "card-compact"
        } bg-base-300 hover:bg-base-100 transition shadow-xl`}
      >
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
    <Link
      href={`/artist/${artist.id}`}
      className={`card ${
        isCompact ? "card-side" : "card-compact"
      } bg-base-300 hover:bg-base-100 transition shadow-xl`}
    >
      <div className={isCompact ? "p-2" : "pt-8 px-8"}>
        <figure
          className={`${
            isCompact ? "w-32 h-32" : ""
          } rounded-full overflow-clip relative aspect-square shadow-2xl`}
        >
          <Image
            className={isCompact ? "w-full h-full" : ""}
            src={img}
            alt={artist.name}
            fill
            blurDataURL={base64}
            placeholder="blur"
          />
        </figure>
      </div>
      <div
        className={`card-body ${isCompact ? "" : "items-center text-center"}`}
      >
        <div
          className={`flex flex-row absolute 
            ${isCompact ? "bottom-0" : "top-0"}
          right-0 p-2`}
        >
          <PlayContext uri={artist.uri} />
          {/* @ts-expect-error Server Component */}
          <ShareIcon musicItemId={artist.id} musicItemType="artist" />
        </div>
        <h2 className="card-title">{artist.name}</h2>
        {isCompact && `${formatNumber(artist.followers.total)} Followers`}
      </div>
    </Link>
  );
};

export default Artist;
