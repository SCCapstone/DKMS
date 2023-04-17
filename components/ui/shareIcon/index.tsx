import { getCurrentUser } from "@/lib/getUser";

import IconButton from "./IconButton";

import type { MusicItemTypes } from "@/lib/feed/postFeedItem";

const ShareIcon = async ({
  musicItemId,
  musicItemType,
}: {
  musicItemId?: string;
  musicItemType?: MusicItemTypes;
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
