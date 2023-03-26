import { getCurrentUser } from "@/lib/getUser";

import IconButton from "./IconButton";

import type { sharedItemType } from "@/lib/firestore/types";

const ShareIcon = async ({ sharedItem }: { sharedItem: sharedItemType }) => {
  const user = await getCurrentUser();

  return <IconButton user={user} sharedItem={sharedItem} />;
};

export default ShareIcon;
