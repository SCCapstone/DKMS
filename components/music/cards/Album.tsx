import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import ArtistLinks from "@/components/ui/ArtistLinks";
import ShareIcon from "@/components/ui/shareIcon";
import Skeleton from "@/components/ui/Skeleton";

import PlayButton from "../PlayButton";

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
        <figure className="relative aspect-square">
          <Image
            src="/images/defaults/album.png"
            alt="Loading..."
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAp0lEQVR4nF2PIQ6GMAyFq5A7zcwE54LMcgdwJDgSBJIEsRtgJrkAAoct3SNkhH8/dX1fX9tH+K8QAjOLSGwpBSGEzzSlGMC+73Vdz/MMQERuHFet65rneZZlRFQUBQBmvvF5ngDGcdRaT9PknKuqKuo/d9u2Xdcdx2GMKcvycTMzgKZpiGgYBu+9Uqrv+8cdrcuyWGu3bXtvfT9P470JHywizBzVNP0FPFwFIjVg8fAAAAAASUVORK5CYII="
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              25vw"
          />
        </figure>
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
    <div
      className={`card ${
        isCompact ? "card-side" : "card-compact"
      } bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip`}
    >
      <figure className="relative aspect-square">
        <Link href={`/album/${album.id}`}>
          <Image
            src={img}
            alt={album.name}
            fill
            placeholder="blur"
            blurDataURL={base64}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              25vw"
          />
        </Link>
      </figure>

      <div className="card-body relative">
        <Link href={`/album/${album.id}`}>
          <div className="card-actions justify-end">
            <PlayButton contextUri={album.uri} />
            {/* @ts-expect-error Server Component */}
            <ShareIcon musicItemId={album.id} musicItemType="album" />
          </div>
          <h2 className="text-lg truncate font-semibold">{album.name}</h2>
          <p className={isCompact ? "text-sm truncate" : ""}>
            {new Date(album.release_date).getFullYear()}
          </p>
        </Link>
        <p className="pb-0">
          <ArtistLinks artists={album.artists} />
        </p>
      </div>
    </div>
  );
};

export default Album;
