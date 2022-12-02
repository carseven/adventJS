/**
 * https://adventjs.dev/challenges/20
 */
export default function pangram(letter) {
  const letterArray = [...letter];
  const charactersSet = new Set([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]);
  let result = false;
  letterArray.forEach((character) => {
    charactersSet.delete(
      character
        .toLowerCase()
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize()
    );
    if (charactersSet.size === 0) {
      result = true;
    }
  });
  return result;
}
