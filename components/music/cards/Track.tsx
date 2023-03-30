import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import ArtistLinks from "@/components/ui/ArtistLinks";
import FavoriteIcon from "@/components/ui/favoriteIcon";
import ShareIcon from "@/components/ui/shareIcon";
import Skeleton from "@/components/ui/Skeleton";
import fetchServer from "@/lib/fetch/fetchServer";

const checkIsFavorited = (trackId: string) =>
  fetchServer<SpotifyApi.CheckUsersSavedTracksResponse>(
    `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
    {
      cache: "no-cache",
    }
  ).then((data) => data[0]);

const Track = async ({
  track,
  isCompact,
}: {
  track:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.RecommendationTrackObject
    | undefined;
  isCompact?: boolean;
}) => {
  if (!track) {
    return (
      <div
        className={`card ${
          isCompact ? "card-side" : "card-compact"
        } bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip`}
      >
        <figure className="relative aspect-square">
          <Image
            src="/images/defaults/track.png"
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
    <div
      className={`card ${
        isCompact ? "card-side" : "card-compact"
      } bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip`}
    >
      <figure className="relative aspect-square">
        <Link href={`/track/${track.id}`}>
          <Image
            src={img}
            alt={track.name}
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
        <div className="card-actions justify-end">
          <FavoriteIcon isFavorited={isFavorited} trackId={track.id} />
          {/* @ts-expect-error Server Component */}
          <ShareIcon musicItemId={track.id} musicItemType="track" />
        </div>
        <Link href={`/track/${track.id}`}>
          <h2 className="text-lg truncate font-semibold">{track.name}</h2>
          <p className={isCompact ? "text-sm truncate" : ""}>
            {new Date(track.album.release_date).getFullYear()} |{" "}
            {track.album.name}
          </p>
        </Link>
        <p className={isCompact ? "text-sm truncate" : "pb-0"}>
          <ArtistLinks artists={track.artists} />
        </p>
      </div>
    </div>
  );
};

export default Track;
