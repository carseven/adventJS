/**
 * https://adventjs.dev/challenges/12
 */
export default function getMinJump(obstacles) {
  const jumps = [];
  for (var i = 1; i <= Math.max(...obstacles); i++) {
    jumps.push(i);
  }
  return jumps.find((jump1) =>
    jumps.every((jump2) => !obstacles.includes(jump1 * jump2))
  );
}
