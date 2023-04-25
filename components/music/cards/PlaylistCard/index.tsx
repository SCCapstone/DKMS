import CompactPlaylist from "./CompactPlaylist";
import NormalPlaylist from "./NormalPlaylist";

/* Playlist display */
const PlaylistCard = ({
  playlist,
  isCompact,
  isPremium,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified | undefined;
  isCompact?: boolean;
  isPremium: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactPlaylist playlist={playlist} isPremium={isPremium} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalPlaylist playlist={playlist} isPremium={isPremium} />;
};

export default PlaylistCard;
