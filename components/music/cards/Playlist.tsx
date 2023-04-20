import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import PlayButton from "@/components/music/buttons/PlayButton";
import ShareButton from "@/components/music/buttons/ShareButton";
import Skeleton from "@/components/ui/Skeleton";

const Playlist = async ({
  playlist,
  isCompact,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified | undefined;
  isCompact?: boolean;
}) => {
  if (!playlist) {
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

  // Spotify blend images cause errors, display default image
  const image = !playlist.images[0].url.startsWith(
    "https://blend-playlist-covers.spotifycdn.com"
  )
    ? playlist.images[0]
    : {
        url: "/images/defaults/playlist.png",
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
        <Link href={`/app/playlist/${playlist.id}`}>
          <Image
            src={img}
            alt={playlist.name}
            fill
            placeholder="blur"
            blurDataURL={base64}
          />
        </Link>
      </figure>
      <div className="card-body relative">
        <div className="btn-group justify-center">
          <PlayButton contextUri={playlist.uri} />
          {/* @ts-expect-error Server Component */}
          <ShareButton musicItemId={playlist.id} musicItemType="playlist" />
        </div>
        <Link href={`/app/playlist/${playlist.id}`}>
          <h2 className="text-lg truncate font-semibold">{playlist.name}</h2>
          <p className={isCompact ? "text-sm truncate" : ""}>
            {playlist.tracks.total}{" "}
            {playlist.tracks.total === 1 ? "track" : "tracks"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Playlist;
