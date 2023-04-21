import CompactArtist from "./CompactArtist";
import NormalArtist from "./NormalArtist";

const ArtistCard = ({
  artist,
  isCompact,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
  isCompact?: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactArtist artist={artist} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalArtist artist={artist} />;
};

export default ArtistCard;
