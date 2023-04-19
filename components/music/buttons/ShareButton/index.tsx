import { getCurrentUser } from "@/lib/getUser";

import ModalButton from "./ModalButton";

const ShareButton = async ({
  musicItemId,
  musicItemType,
}: {
  musicItemId?: string;
  musicItemType?: "track" | "playlist" | "artist" | "album";
}) => {
  const user = await getCurrentUser();

  return (
    <ModalButton
      user={user}
      musicItemId={musicItemId}
      musicItemType={musicItemType}
    />
  );
};

export default ShareButton;
