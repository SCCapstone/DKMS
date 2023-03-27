import { getCurrentUser } from "@/lib/getUser";

import IconButton from "./IconButton";

const ShareIcon = async ({
  musicItemId,
  musicItemType,
}: {
  musicItemId?: string;
  musicItemType?: "track" | "playlist" | "artist" | "album";
}) => {
  const user = await getCurrentUser();

  return (
    <IconButton
      user={user}
      musicItemId={musicItemId}
      musicItemType={musicItemType}
    />
  );
};

export default ShareIcon;
