import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import ArtistLinks from "@/components/ui/ArtistLinks";
import Skeleton from "@/components/ui/Skeleton";

import PlayButton from "../PlayButton";

const Album = async ({
  album,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
}) => {
  if (!album) {
    return (
      <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
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
    <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
      <Link href={`/album/${album.id}`}>
        <figure className="relative aspect-square">
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
        </figure>
      </Link>
      <div className="card-body">
        <Link href={`/album/${album.id}`}>
          <h2 className="text-lg font-semibold truncate">{album.name}</h2>
          <p>{new Date(album.release_date).getFullYear()}</p>
        </Link>
        <p className="pb-0">
          <ArtistLinks artists={album.artists} />
        </p>
      </div>
      <div>
        <PlayButton uri={album.uri} />
      </div>
    </div>
  );
};

export default Album;
