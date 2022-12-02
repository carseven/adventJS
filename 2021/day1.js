/**
 * https://adventjs.dev/challenges/01
 */
export default function contarOvejas(ovejas) {
  return ovejas.filter(
    (it) =>
      it.color === "rojo" &&
      new RegExp("[aA]").test(it.name) &&
      new RegExp("[nN]").test(it.name)
  );
}
