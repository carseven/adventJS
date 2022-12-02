/**
 * https://adventjs.dev/challenges/04
 */
export default function createXmasTree(height) {
  let tree = [];
  let stars = 1;
  let space = height - 1;

  // Generar copa arbol
  for (let i = 0; i < height; i++) {
    tree.push("_".repeat(space) + "*".repeat(stars) + "_".repeat(space) + "\n");
    space = space - 1;
    stars = stars + 2;
  }

  // Generar tronco
  tree.push("_".repeat(height - 1) + "#" + "_".repeat(height - 1) + "\n");
  tree.push("_".repeat(height - 1) + "#" + "_".repeat(height - 1));

  return tree.join("");
}
