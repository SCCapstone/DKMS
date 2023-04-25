import Link from "next/link";

/* Get link for artist */
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

  /* Format artist link based on number of artists */
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
          {getLink(uniqueArtists[0])}, {getLink(uniqueArtists[1])},&nbsp;&{" "}
          {getLink(uniqueArtists[2])}
        </p>
      );
    default:
      return (
        <div>
          {getLink(uniqueArtists[0])}&nbsp;&{" "}
          <div className="dropdown dropdown-hover relative overflow-visible">
            <button type="button" className="font-bold text-secondary">
              {uniqueArtists.length - 1} more
            </button>
            <ul className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box max-w-52">
              {uniqueArtists.slice(1).map((artist) => (
                <li key={artist.id}>{getLink(artist)}</li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
};

export default ArtistLinks;
