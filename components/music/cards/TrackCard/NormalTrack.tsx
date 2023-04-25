import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import FavoriteButton from "@/components/music/buttons/FavoriteButton";
import PlayButton from "@/components/music/buttons/PlayButton";
import ShareButton from "@/components/music/buttons/ShareButton";
import ArtistLinks from "@/components/ui/ArtistLinks";
import Skeleton from "@/components/ui/Skeleton";
import fetchServer from "@/lib/fetch/fetchServer";

/* Check if track is favorited by user */
const checkIsFavorited = (trackId: string) =>
  fetchServer<SpotifyApi.CheckUsersSavedTracksResponse>(
    `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
    {
      cache: "no-cache",
    }
  ).then((data) => data[0]);

/* Normal sized track display */
const NormalTrack = async ({
  track,
  isPremium,
}: {
  track:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.RecommendationTrackObject
    | undefined;
  isPremium: boolean;
}) => {
  if (!track) {
    return (
      <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
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
    <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip">
      <figure className="relative aspect-square">
        <Link href={`/app/track/${track.id}`}>
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
        <div className="btn-group justify-center">
          {isPremium && (
            <PlayButton contextUri={track.album.uri} offset={track.uri} small />
          )}
          <FavoriteButton isFavorited={isFavorited} trackId={track.id} small />
          {/* @ts-expect-error Server Component */}
          <ShareButton musicItemId={track.id} musicItemType="track" small />
        </div>
        <Link href={`/app/track/${track.id}`}>
          <h2 className="text-lg truncate font-semibold">{track.name}</h2>
          <p>
            {new Date(track.album.release_date).getFullYear()} |{" "}
            {track.album.name}
          </p>
        </Link>
        <div className="pb-0">
          <ArtistLinks artists={track.artists} />
        </div>
      </div>
    </div>
  );
};

export default NormalTrack;
