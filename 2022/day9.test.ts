/*

A company that manufactures Christmas lights has asked us to help them.
They have led strips that are like an Array. Each position is a led and can be on (1) or off (0).
Every 7 seconds, the leds change state in this way:
If the led is off, it turns on if the led on its left (index - 1) was on before.
If the led is on, it remains on.
They asked us for a program that tells us how many seconds it takes for all the leds to turn on. The seconds are expressed as an integer. For example:

```
const leds = [0, 1, 1, 0, 1]
countTime(leds) // 7
// 7 seconds because in the first change
// all the lights turned on
// 0s: [0, 1, 1, 0, 1]
// 7s: [1, 1, 1, 1, 1]

countTime([0, 0, 0, 1]) // 21
// 21 seconds because it needs three changes:
// 0s: [0, 0, 0, 1]
// 7s: [1, 0, 0, 1]
// 14s: [1, 1, 0, 1]
// 21s: [1, 1, 1, 1]

countTime([0, 0, 1, 0, 0]) // 28
// 28 seconds because it needs four changes:
// 0s: [0, 0, 1, 0, 0]
// 7s: [0, 0, 1, 1, 0]
// 14s: [0, 0, 1, 1, 1]
// 21s: [1, 0, 1, 1, 1]
// 28s: [1, 1, 1, 1, 1]
```

Keep in mind
* The array will always have at least one led on.
* The array can have any length.
* If all the leds are on, the time is 0.

*/

function countTime(leds: number[]) {
  let count = 0;
  let setLedsOn: number[] = [];
  while (!leds.every((led) => led === 1)) {
    count++;
    leds.forEach((_, index) => {
      if (+leds[index - 1] || (index === 0 && leds[leds.length - 1])) {
        setLedsOn.push(index); // Esto se tiene que hacer cuando salimos del bucle
      }
    });
    setLedsOn.forEach((ledIndex) => (leds[ledIndex] = 1));
    setLedsOn = [];
  }
  return count * 7;
}

function countTimeOptimazed(leds) {
  // Buscar la cadena de zeros
  let arr = leds
    .join("")
    .split("1") // ['000', '00', '']
    .map((l) => l.length); // [3, 2, 0]
  arr[0] += arr.pop();
  return arr.sort((a, b) => b - a)[0] * 7;
}

describe("Day 9", () => {
  test("Test 1", () => {
    expect(countTime([0, 0, 0, 1])).toBe(21);
  });

  test("Test 2", () => {
    expect(countTime([0, 1, 1, 0, 1])).toBe(7);
  });

  test("Test 3", () => {
    expect(countTime([0, 0, 0, 1])).toBe(21);
  });

  test("Test 4", () => {
    expect(countTime([0, 0, 1, 0, 0])).toBe(28);
  });

  test("Test 5", () => {
    expect(countTime([1, 0, 0, 1, 0, 0])).toBe(14);
  });

  test("Test 6", () => {
    expect(countTime([1, 1, 0, 0, 0, 0])).toBe(28);
  });

  test("Test 7", () => {
    expect(countTime([1, 1, 1])).toBe(0);
  });
});
