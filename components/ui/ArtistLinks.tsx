import Link from "next/link";

const getLink = (
  artist: Pick<SpotifyApi.ArtistObjectSimplified, "name" | "id">
) => (
  <Link className="font-bold text-secondary" href={`/app/artist/${artist.id}`}>
    {artist.name}
  </Link>
);

const ArtistLinks = ({
  artists,
}: {
  artists: Pick<SpotifyApi.ArtistObjectSimplified, "name" | "id">[] | undefined;
}) => {
  if (!artists) return null;
  const uniqueArtists = artists.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );

  switch (uniqueArtists.length) {
    case 0:
      return null;
    case 1:
      return <p>{getLink(uniqueArtists[0])}</p>;
    case 2:
      return (
        <p>
          {getLink(uniqueArtists[0])}&nbsp;& {getLink(uniqueArtists[1])}
        </p>
      );
    case 3:
      return (
        <p>
          {getLink(uniqueArtists[0])}, {getLink(uniqueArtists[1])}, &{" "}
          {getLink(uniqueArtists[2])}
        </p>
      );
    default:
      return (
        <>
          {getLink(uniqueArtists[0])}
          &nbsp;&{" "}
          <div className="dropdown dropdown-hover relative overflow-visible">
            <button type="button" className="font-bold text-secondary">
              {uniqueArtists.length - 1} more
            </button>
            <ul className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52 static">
              {uniqueArtists.slice(1).map((artist) => (
                <li key={artist.id}>{getLink(artist)}</li>
              ))}
            </ul>
          </div>
        </>
      );
  }
};

export default ArtistLinks;
