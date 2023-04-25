import { getCachedProfileDoc } from "@/lib/firestore/cache";

/**
 * Get ids of saved feed items for user
 *
 * @param userId id of user to find saved feed items for
 * @returns A list of ids of feed items that user has saved
 */
const getSavedItemIds = async (userId: string) => {
  const profile = await getCachedProfileDoc(userId);

  const data = profile.data();

  return data?.savedItemIds ?? [];
};

export default getSavedItemIds;
