/*
Some electric sleds have broken down and the elves are looking for spare parts to fix them, but they are not sure if the parts they have are valid.
The spare parts are strings and the mechanic Elfon Masc has said that a spare part is valid if the part can be a palindrome after removing, at most, one character.
A palindrome is a word or phrase that reads the same from left to right as it does from right to left.
Our function should return a boolean that indicates whether the spare part is valid or not with that rule:
```
checkPart("uwu") // true
// "uwu" is a palindrome without removing any character

checkPart("miidim") // true
// "miidim" can be a palindrome after removing the first "i"

checkPart("midu") // false
// "midu" cannot be a palindrome after removing a character
```
*/

// 260 points
function checkPart(part: string): boolean {
  const reverse = part.split("").reverse().join("");

  // Es palindromo
  if (reverse === part) {
    return true;
  }

  // Quitar una sola letra a ver si es palimdromo
  return [...part].some((letter) => {
    const word = part.replace(letter, "");
    return word == word.split("").reverse().join("");
  });
}

// 260 points
function checkPartOptimized(part) {
  return [...part].some((_, i, x) => {
    const tr = x.filter((_, k) => i != k);
    return tr.join("") == tr.reverse().join("");
  });
}

// 360 points
function checkPartOptimized2(part) {
  let arr = [...part].slice(1);
  let rev = [...part].reverse();
  let x = arr.join("") == arr.reverse().join("");
  let y = [...part].reduce((x, y, i) => x + (rev[i] != y), 0);
  return x || y <= 2;
}

describe("Day 8", () => {
  test("Test 1", () => {
    expect(checkPart("uwu")).toBeTruthy();
  });

  test("Test 2", () => {
    expect(checkPart("miidim")).toBeTruthy();
  });

  test("Test 3", () => {
    expect(checkPart("midu")).toBeFalsy();
  });

  test("Test 5", () => {
    expect(checkPart("zzzoonzzz")).toBeTruthy();
  });
});
