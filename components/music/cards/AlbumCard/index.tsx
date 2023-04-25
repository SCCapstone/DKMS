import CompactAlbum from "./CompactAlbum";
import NormalAlbum from "./NormalAlbum";

/* Album Card display */
const AlbumCard = ({
  album,
  isCompact,
  isPremium,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
  isCompact?: boolean;
  isPremium: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactAlbum album={album} isPremium={isPremium} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalAlbum album={album} isPremium={isPremium} />;
};

export default AlbumCard;
