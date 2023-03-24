const TopTrack = ({
  track,
  artists,
  number,
}: {
  track: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
  number: string;
}) => (
  <div className="flex-row">
    <h5>{number}</h5>
    <h5>{track}</h5>
    {artists.map((artist) => (
      <h5 key={artist.id}>{artist.name}</h5>
    ))}
  </div>
);

export default TopTrack;
