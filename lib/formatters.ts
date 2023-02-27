export const formatFollowers = (count: number | undefined) => {
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

export default {};
