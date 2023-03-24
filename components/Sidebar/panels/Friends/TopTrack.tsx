const TopTrack = ({
  track,
  artists,
  trackNumber,
}: {
  track: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
  trackNumber: number;
}) => (
  <div className="flex-row">
    <h5>{trackNumber.toLocaleString()}</h5>
    <h5>{track}</h5>
    {artists.map((artist) => (
      <h5 key={artist.id}>{artist.name}</h5>
    ))}
  </div>
);

export default TopTrack;
