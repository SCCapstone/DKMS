import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import ArtistLinks from "@/components/ui/ArtistLinks";
import Skeleton from "@/components/ui/Skeleton";

const Album = async ({
  album,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
}) => {
  if (!album) {
    return (
      <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
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
      className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip"
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
      <div className="card-body">
        <h2 className="text-lg font-semibold truncate">{album.name}</h2>
        <p>
          {new Date(album.release_date).getFullYear()} |{" "}
          <ArtistLinks artists={album.artists} />
        </p>
      </div>
    </Link>
  );
};

export default Album;
