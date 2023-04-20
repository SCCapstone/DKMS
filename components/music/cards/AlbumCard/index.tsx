import CompactAlbum from "./CompactAlbum";
import NormalAlbum from "./NormalAlbum";

const AlbumCard = ({
  album,
  isCompact,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
  isCompact?: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactAlbum album={album} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalAlbum album={album} />;
};

export default AlbumCard;
