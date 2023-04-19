import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import PlayButton from "@/components/music/buttons/PlayButton";
import ShareButton from "@/components/music/buttons/ShareButton";
import ArtistLinks from "@/components/ui/ArtistLinks";
import Skeleton from "@/components/ui/Skeleton";

const CompactAlbumCard = async ({
  album,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
}) => {
  if (!album) {
    return (
      <div className="card card-side bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
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
    <div className="card card-side bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
      <figure className="relative aspect-square">
        <Link href={`/app/album/${album.id}`}>
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
        <div className="btn-group justify-center">
          <PlayButton contextUri={album.uri} />
          {/* @ts-expect-error Server Component */}
          <ShareButton musicItemId={album.id} musicItemType="album" />
        </div>
        <Link href={`/app/album/${album.id}`}>
          <h2 className="text-lg truncate font-semibold">{album.name}</h2>
          <p className="text-sm truncate">
            {new Date(album.release_date).getFullYear()}
          </p>
        </Link>
        <div className="pb-0">
          <ArtistLinks artists={album.artists} />
        </div>
      </div>
    </div>
  );
};

export default CompactAlbumCard;
