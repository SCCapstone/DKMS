import CompactPlaylist from "./CompactPlaylist";
import NormalPlaylist from "./NormalPlaylist";

const PlaylistCard = ({
  playlist,
  isCompact,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified | undefined;
  isCompact?: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactPlaylist playlist={playlist} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalPlaylist playlist={playlist} />;
};

export default PlaylistCard;
