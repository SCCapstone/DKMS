import Image from "next/image";

import joinArtists from "lib/joinArtists";

import Skeleton from "../ui/Skeleton";

const Album = ({
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
  const image = album.images[0];
  return (
    <a
      href={album.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl overflow-clip"
    >
      <figure className="relative aspect-square">
        <Image src={image.url} alt={album.name} fill />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-semibold truncate">{album.name}</h2>
        <p>
          {new Date(album.release_date).getFullYear()} |{" "}
          {joinArtists(album.artists)}
        </p>
      </div>
    </a>
  );
};

export default Album;
