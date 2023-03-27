import { Artist } from "@/components/music/cards";

const ArtistsGrid = ({
  artists,
}: {
  artists: readonly SpotifyApi.ArtistObjectFull[] | readonly undefined[];
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {artists.map((artist, index) => (
      // @ts-expect-error Next 13 handles async components
      <Artist key={artist?.id ?? index} artist={artist} />
    ))}
  </div>
);

export default ArtistsGrid;
