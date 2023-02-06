import Image from "next/image";

import Skeleton from "../ui/Skeleton";

const Artist = ({
  artist,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
}) => {
  if (!artist) {
    return (
      <div className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl">
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

  const image = artist.images[0] ?? { url: "", width: 0, height: 0 };
  return (
    <a
      href={artist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-compact bg-base-300 hover:bg-base-100 transition shadow-xl"
    >
      <div className="pt-8 px-8">
        <figure className="rounded-full overflow-clip relative aspect-square shadow-2xl">
          <Image src={image.url} alt={artist.name} fill />
        </figure>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{artist.name}</h2>
      </div>
    </a>
  );
};

export default Artist;
