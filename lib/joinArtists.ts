const joinArtists = (
  artists: Pick<SpotifyApi.ArtistObjectSimplified, "name">[] | undefined
) => {
  if (!artists) return "";
  if (artists.length === 0) return "";
  if (artists.length === 1) return artists[0].name;
  if (artists.length === 2) return `${artists[0].name} & ${artists[1].name}`;
  return `${artists[0].name} & ${artists.length - 1} more`;
};

export default joinArtists;
