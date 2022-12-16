/**
 * https://adventjs.dev/challenges/24
 */
export default function checkIsSameTree(treeA, treeB) {
  if (!treeA && !treeB) return true;
  return (
    (treeA && treeA.value) === (treeB && treeB.value) &&
    checkIsSameTree(treeA.right, treeB.right) &&
    checkIsSameTree(treeA.left, treeB.left)
  );
}
