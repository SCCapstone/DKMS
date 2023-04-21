import { ArtistCard } from "@/components/music/cards";

const ArtistsGrid = ({
  artists,
  isHalf,
  isPremium,
}: {
  artists: readonly SpotifyApi.ArtistObjectFull[] | readonly undefined[];
  isHalf?: boolean;
  isPremium: boolean;
}) => (
  <div
    className={`grid grid-cols-2 ${
      isHalf ? "" : "md:grid-cols-3 lg:grid-cols-4"
    } gap-4`}
  >
    {artists.map((artist, index) => (
      <ArtistCard
        key={artist?.id ?? index}
        artist={artist}
        isPremium={isPremium}
      />
    ))}
  </div>
);

export default ArtistsGrid;
