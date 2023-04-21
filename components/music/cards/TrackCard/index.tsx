import CompactTrack from "./CompactTrack";
import NormalTrack from "./NormalTrack";

const TrackCard = ({
  track,
  isCompact,
}: {
  track:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.RecommendationTrackObject
    | undefined;
  isCompact?: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactTrack track={track} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalTrack track={track} />;
};

export default TrackCard;
