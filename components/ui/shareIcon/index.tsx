import { getCurrentUser } from "@/lib/getUser";

import IconButton from "./IconButton";

import type { SharedItemType } from "@/lib/firestore/types";

const ShareIcon = async ({ sharedItem }: { sharedItem: SharedItemType }) => {
  const user = await getCurrentUser();

  return <IconButton user={user} sharedItem={sharedItem} />;
};

export default ShareIcon;
