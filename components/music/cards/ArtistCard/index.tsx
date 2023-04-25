import CompactArtist from "./CompactArtist";
import NormalArtist from "./NormalArtist";

/* Artist display card */
const ArtistCard = ({
  artist,
  isCompact,
  isPremium,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
  isCompact?: boolean;
  isPremium: boolean;
}) => {
  if (isCompact) {
    // @ts-expect-error Next 13 server component
    return <CompactArtist artist={artist} isPremium={isPremium} />;
  }

  // @ts-expect-error Next 13 server component
  return <NormalArtist artist={artist} isPremium={isPremium} />;
};

export default ArtistCard;
