import { getCurrentUser } from "@/lib/getUser";

import IconButton from "./IconButton";

const ShareIcon = async ({
  trackId,
  playlistId,
  artistId,
  albumId,
}: {
  trackId?: string;
  playlistId?: string;
  artistId?: string;
  albumId?: string;
}) => {
  const user = await getCurrentUser();

  return (
    <IconButton
      user={user}
      trackId={trackId}
      playlistId={playlistId}
      artistId={artistId}
      albumId={albumId}
    />
  );
};

export default ShareIcon;
