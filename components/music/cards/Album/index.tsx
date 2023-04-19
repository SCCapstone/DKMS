import CompactAlbumCard from "./CompactAlbumCard";
import NormalAlbumCard from "./NormalAlbumCard";

const Album = ({
  album,
  isCompact,
}: {
  album: SpotifyApi.AlbumObjectSimplified | undefined;
  isCompact?: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactAlbumCard album={album} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalAlbumCard album={album} />;
};

export default Album;
