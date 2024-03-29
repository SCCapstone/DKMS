import { getCurrentUser } from "@/lib/getUser";

import ModalButton from "./ModalButton";

/* Share button for sharing music items to feed */
const ShareButton = async ({
  musicItemId,
  musicItemType,
  small,
}: {
  musicItemId?: string;
  musicItemType?: "track" | "playlist" | "artist" | "album";
  small?: boolean;
}) => {
  const user = await getCurrentUser();

  return (
    <ModalButton
      user={user}
      musicItemId={musicItemId}
      musicItemType={musicItemType}
      small={small}
    />
  );
};

export default ShareButton;
