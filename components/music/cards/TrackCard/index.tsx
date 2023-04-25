import CompactTrack from "./CompactTrack";
import NormalTrack from "./NormalTrack";

/* Track display */
const TrackCard = ({
  track,
  isCompact,
  isPremium,
}: {
  track:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.RecommendationTrackObject
    | undefined;
  isCompact?: boolean;
  isPremium: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactTrack track={track} isPremium={isPremium} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalTrack track={track} isPremium={isPremium} />;
};

export default TrackCard;
