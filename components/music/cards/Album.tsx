import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import ShareIcon from "@/components/ui/shareIcon";
import Skeleton from "@/components/ui/Skeleton";
import joinArtists from "@/lib/joinArtists";

const Album = async ({
  album,
  isCompact,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
  isCompact?: boolean;
}) => {
  if (!album) {
    return (
      <div
        className={`card ${
          isCompact ? "card-side" : "card-compact"
        } bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip`}
      >
        <figure className="relative aspect-square" />
        <div className="card-body">
          <h2 className="text-lg font-semibold truncate">
            <Skeleton enableAnimation />
          </h2>
          <p>
            <Skeleton enableAnimation />
          </p>
        </div>
      </div>
    );
  }

  const image = album.images[0] ?? {
    url: "/images/defaults/album.png",
  };

  const { base64, img } = await getPlaiceholder(image.url, {
    size: 10,
  });

  return (
    <Link
      href={`/album/${album.id}`}
      className={`card ${
        isCompact ? "card-side" : "card-compact"
      } bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip`}
    >
      <figure className="relative aspect-square">
        <Image
          src={img}
          alt={album.name}
          fill
          placeholder="blur"
          blurDataURL={base64}
        />
      </figure>
      <div className="card-body relative">
        <div
          className={`flex flex-row absolute 
            ${isCompact ? "bottom-0" : "top-0"}
          right-0 p-2`}
        >
          {/* @ts-expect-error Server Component */}
          <ShareIcon sharedItem={album} />
        </div>
        <h2
          className={`text-lg truncate font-semibold  ${
            isCompact ? "" : "mt-10"
          }`}
        >
          {album.name}
        </h2>
        <p className={isCompact ? "text-sm truncate" : ""}>
          {new Date(album.release_date).getFullYear()} |{" "}
          {joinArtists(album.artists)}
        </p>
      </div>
    </Link>
  );
};

export default Album;
