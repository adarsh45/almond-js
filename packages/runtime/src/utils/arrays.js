export function withoutNulls(arr) {
  // == used instead of ===, to filter out both null & undefined
  return arr.filter((item) => item != null);
}
