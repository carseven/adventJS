/*
A couple is putting up the Christmas tree. The boy loves Christmas decorations and wants it to be perfectly balanced. He has three types of decorations:
Colored balls: B
Small gifts: R
Pine cones: P
The Christmas tree is a triangle that must be generated. They already have the base mounted, which would be the first row, and from there they have to place the decorations upwards following a formula.

```
Place on top :    P     R     B     P
If below is  :   P P   B P   R P   B R
```

The combinations are also reversed. For example, if below is B P, above is R. But it will also be R if below is P B. Also if below you have repeated the letter, above you use the same letter. For example: if below is B B, above is B.
With these rules, we could see the tree that we would generate with the base B P R P:

```
   R
  P B
 R B B
B P R P
```

Write a program that receives the string B P R P and returns an array with the representation of the tree.

```
decorateTree('B P R P')
// [
// 'R',
// 'P B',
// 'R B B',
// 'B P R P'
// ]

decorateTree('B B') // ['B', 'B B']
```

Keep in mind that:
* The program always receives the text string that represents the base of the tree.
* The tree must be generated completely, that is, the base and the rows that are generated from it, until the top.
* You have to follow the formula to know which decoration to place in each position.
*/

function decorateTreeOptimazed(base: string): string[] {
  const order = {
    RR: "R",
    BB: "B",
    PR: "B",
    PB: "R",
    BP: "R",
    RB: "P",
    BR: "P",
    PP: "P",
    RP: "B",
  };

  let list = new Array(base.length - 1).fill(base.split(" "));
  return list
    .reduce(
      (total, x) =>
        total.concat([
          new Array(total.at(-1).length - 1)
            .fill("-")
            .map((_, i) => {
              return order[
                total
                  .at(-1)
                  .slice(i, i + 2)
                  .join("")
              ];
            })
            .flat(),
        ]),
      [base]
    )
    .slice(0, base.length)
    .map((x) => x.join(" "))
    .reverse();
}

function decorateTree(base: string): string[] {
  const arr = [[...base.split(" ")]];

  arr[0].slice(1).forEach((_, index) => {
    const row = [...arr[index]].slice(1).map((pair, innerIndex) => {
      const firstCharCode = arr[index][innerIndex].charCodeAt(0);
      const secondCharCode = pair.charCodeAt(0);

      return pair === arr[index][innerIndex]
        ? pair
        : // 228 is the sum of the charCodes of B P and R letters,
          // so, we take the missing charCode and transform to string
          String.fromCharCode(228 - firstCharCode - secondCharCode);
    });

    arr.push(row);
  });

  return arr.map((row) => row.join(" ")).reverse();
}

describe("Day 14", () => {
  test("Test 1", () => {
    expect(decorateTree("B B")).toEqual(["B", "B B"]);
  });

  test("Test 2", () => {
    expect(decorateTree("B P R P")).toEqual(["R", "P B", "R B B", "B P R P"]);
  });

  test("Test 3", () => {
    expect(decorateTree("B B P R P R R")).toEqual([
      "B",
      "R P",
      "B P P",
      "P R B R",
      "P P B B P",
      "B R B B B R",
      "B B P R P R R",
    ]);
  });

  test("Test 4", () => {
    expect(decorateTree("R R P R R")).toEqual([
      "R",
      "R R",
      "P B P",
      "R B B R",
      "R R P R R",
    ]);
  });
});
