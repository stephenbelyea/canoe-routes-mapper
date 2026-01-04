export const formatLength = (length?: number) => {
  if (length === undefined) return "";
  if (length < 999) return `${length}m`;
  return `${(length / 1000).toFixed(2)}km`;
};
