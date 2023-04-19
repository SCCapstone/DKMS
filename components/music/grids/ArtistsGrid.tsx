import { ArtistCard } from "@/components/music/cards";

const ArtistsGrid = ({
  artists,
  isHalf,
}: {
  artists: readonly SpotifyApi.ArtistObjectFull[] | readonly undefined[];
  isHalf?: boolean;
}) => (
  <div
    className={`grid grid-cols-2 ${
      isHalf ? "" : "md:grid-cols-3 lg:grid-cols-4"
    } gap-4`}
  >
    {artists.map((artist, index) => (
      // @ts-expect-error Next 13 handles async components
      <ArtistCard key={artist?.id ?? index} artist={artist} />
    ))}
  </div>
);

export default ArtistsGrid;
