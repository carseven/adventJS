/**
 * https://adventjs.dev/challenges/22
 */
export default function countDecorations(bigTree) {
  if (!bigTree) return 0;
  return (
    bigTree.value +
    countDecorations(bigTree.right) +
    countDecorations(bigTree.left)
  );
}
