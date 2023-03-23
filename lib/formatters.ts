export const formatNumber = (count: number | undefined) => {
  if (!count) return "0";

  if (count < 1000) {
    return `${count}`;
  }
  if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  if (count >= 1000000 && count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}m`;
  }
  return `${(count / 1000000000).toFixed(1)}b`;
};

/**
 * Takes a duration in milliseconds and returns it in minutes:seconds
 * or hours:minutes:seconds if the duration is over an hour.
 * @param ms The duration in milliseconds
 * @returns The duration in hours:minutes:seconds
 */
export const formatDuration = (ms: number) => {
  const date = new Date(ms);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`;
};
