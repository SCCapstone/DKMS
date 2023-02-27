export const API_URL =
  "https://firestore.googleapis.com/v1/projects/dkms-spotify/databases/(default)/documents/feed_content";
export const BASE_URL = "https://firestore.googleapis.com/v1/";

export const getUniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
};
