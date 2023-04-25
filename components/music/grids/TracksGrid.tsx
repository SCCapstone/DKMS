import { TrackCard } from "@/components/music/cards";

/* Grid layout for tracks in search results */
const TracksGrid = ({
  tracks,
  isHalf,
  isPremium,
}: {
  tracks:
    | readonly SpotifyApi.TrackObjectFull[]
    | readonly SpotifyApi.RecommendationTrackObject[]
    | readonly undefined[];
  isHalf?: boolean;
  isPremium: boolean;
}) => (
  <div
    className={`grid grid-cols-2 ${
      isHalf ? "" : "md:grid-cols-3 lg:grid-cols-4"
    } gap-4`}
  >
    {tracks.map((track, index) => (
      <TrackCard key={track?.id ?? index} track={track} isPremium={isPremium} />
    ))}
  </div>
);

export default TracksGrid;
