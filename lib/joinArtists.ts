const joinArtists = (
  artists: Pick<SpotifyApi.ArtistObjectSimplified, "name">[] | undefined
) => {
  if (!artists) return "";
  const uniqueNames = Array.from(new Set(artists.map((a) => a.name)));
  if (uniqueNames.length === 0) return "";
  if (uniqueNames.length === 1) return uniqueNames[0];
  if (uniqueNames.length === 2) return `${uniqueNames[0]} & ${uniqueNames[1]}`;
  return `${uniqueNames[0]} & ${uniqueNames.length - 1} more`;
};

export default joinArtists;
