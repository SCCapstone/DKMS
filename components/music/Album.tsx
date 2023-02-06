import Image from "next/image";

import joinArtists from "lib/joinArtists";

const Album = ({ album }: { album: SpotifyApi.AlbumObjectSimplified }) => {
  const image = album.images[0];
  return (
    <a
      href={album.external_urls.spotify}
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
