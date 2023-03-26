import Link from "next/link";

const getLink = (
  artist: Pick<SpotifyApi.ArtistObjectSimplified, "name" | "id">
) => (
  <Link className="font-bold text-secondary" href={`/artist/${artist.id}`}>
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
      return getLink(uniqueArtists[0]);
    case 2:
      return (
        <>
          {getLink(uniqueArtists[0])} & {getLink(uniqueArtists[1])}
        </>
      );
    case 3:
      return (
        <>
          {getLink(uniqueArtists[0])}, {getLink(uniqueArtists[1])}, &{" "}
          {getLink(uniqueArtists[2])}
        </>
      );
    default:
      return (
        <>
          {getLink(uniqueArtists[0])}{" "}
          <span>& {uniqueArtists.length - 1} more</span>
        </>
      );
  }
};

export default ArtistLinks;
