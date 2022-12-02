/**
 * https://adventjs.dev/challenges/15
 */
export default function checkSledJump(heights) {
  let up = true;
  for (var index = 1; index < heights.length; index++) {
    if (heights[index] === heights[index - 1]) return false;
    if (!up && heights[index] > heights[index - 1]) return false;
    if (up && heights[index] < heights[index - 1]) up = false;
  }
  return !up;
}
