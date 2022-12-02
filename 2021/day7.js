/**
 * https://adventjs.dev/challenges/07
 */
export default function contains(store, product) {
  if (store === product) return true;
  if (typeof store === "object") {
    for (const key in store) {
      if (contains(store[key], product)) {
        return true;
      }
    }
  }
  return false;
}
