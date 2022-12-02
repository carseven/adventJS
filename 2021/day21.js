/**
 * https://adventjs.dev/challenges/21
 */
export default function canCarry(capacity, trip) {
  let carrying = 0;
  let destinies = new Map();
  for (let stop of trip) {
    let [items, from, to] = stop;
    if (destinies.has(from)) carrying -= destinies.get(from);
    carrying += items;
    if (carrying > capacity) return false;
    destinies.set(to, items);
  }
  return true;
}
