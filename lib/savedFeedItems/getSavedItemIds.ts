import { getCachedProfileDoc } from "@/lib/firestore/cache";

const getSavedItemIds = async (userId: string) => {
  const profile = await getCachedProfileDoc(userId);

  const data = profile.data();

  return data?.savedItemIds ?? [];
};

export default getSavedItemIds;
