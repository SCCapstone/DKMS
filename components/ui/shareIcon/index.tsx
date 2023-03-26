import { getCurrentUser } from "@/lib/getUser";

import IconButton from "./IconButton";

const ShareIcon = async ({
  sharedItem,
}: {
  sharedItem:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.RecommendationTrackObject
    | SpotifyApi.PlaylistObjectSimplified
    | SpotifyApi.AlbumObjectSimplified
    | SpotifyApi.ArtistObjectFull
    | undefined;
}) => {
  const user = await getCurrentUser();

  return <IconButton user={user} sharedItem={sharedItem} />;
};

export default ShareIcon;
