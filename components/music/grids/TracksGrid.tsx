import { Track } from "@/components/music/cards";

const TracksGrid = ({
  tracks,
}: {
  tracks:
    | readonly SpotifyApi.TrackObjectFull[]
    | readonly SpotifyApi.RecommendationTrackObject[]
    | readonly undefined[];
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {tracks.map((track, index) => (
      // @ts-expect-error Next 13 handles async components
      <Track key={track?.id ?? index} track={track} />
    ))}
  </div>
);

export default TracksGrid;
