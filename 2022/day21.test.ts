/* 
There are too many letters from children asking for gifts and it is very difficult that we can inventory all of them. That's why we have decided to create a program that draws us a table with the gifts we ask for and their quantities.
For this we are given an array of objects with the names of the gifts and their quantities. Write a function that receives this array and returns a string with the drawn table.

```
printTable([
  { name: 'Game', quantity: 2 },
  { name: 'Bike', quantity: 1 },
  { name: 'Book', quantity: 3 }
])
```

+++++++++++++++++++
| Gift | Quantity |
| ---- | -------- |
| Game | 2        |
| Bike | 1        |
| Book | 7        |
*******************

Another example where you can see that the table always uses only the exact space depending on the length of the names of the gifts and the quantities.

```
printTable([
  { name: 'PlayStation 5', quantity: 9234782374892 },
  { name: 'Book Learn Web Dev', quantity: 23531 }
])
```

++++++++++++++++++++++++++++++++++++++
| Gift               | Quantity      |
| ------------------ | ------------- |
| PlayStation 5      | 9234782374892 |
| Book Learn Web Dev | 23531         |
**************************************

As you can see, the size of the cells depends on the length of the names of the gifts and the quantities, although they will at least have to be the space of the titles Gift and Quantity respectively.
The table uses the symbols: + for the top border, * for the bottom border, - for the horizontal lines and | for the vertical lines.
Keep in mind:
* Use only the space you need to draw the table.
* Adapt the table to the length of the names of the gifts and the quantities or the titles of the columns.
* There is no need to order the results.
* The table does not end with a line break.

*/

function printTable(gifts: { name: string; quantity: number }[]) {
  const giftWord = "Gift";
  const giftWordLength = giftWord.length;
  const quantityWord = "Quantity";
  const quantityWordLength = quantityWord.length;

  let longerGiftName = Math.max(
    ...[...gifts.map((gift) => gift.name.length), giftWordLength]
  );
  let maxQuantity = Math.max(
    ...[
      ...gifts.map((gift) => gift.quantity.toString().length),
      quantityWordLength,
    ]
  );

  const head = "+".repeat(longerGiftName + maxQuantity + 7) + "\n";
  const title =
    "| " +
    giftWord +
    " ".repeat(longerGiftName - giftWordLength) +
    " | " +
    quantityWord +
    " ".repeat(maxQuantity - quantityWordLength) +
    " |" +
    "\n";
  const middle =
    "| " +
    "-".repeat(longerGiftName) +
    " | " +
    "-".repeat(maxQuantity) +
    " |" +
    "\n";

  const table =
    gifts
      .map((gift) => {
        return (
          "| " +
          gift.name +
          " ".repeat(longerGiftName - gift.name.length) +
          " | " +
          gift.quantity +
          " ".repeat(maxQuantity - gift.quantity.toString().length) +
          " |"
        );
      })
      .join("\n") + "\n";

  const bottom = "*".repeat(longerGiftName + maxQuantity + 7);

  return head + title + middle + table + bottom;
}

function printTableBetterStrucutured(gifts) {
  const maxNameLength = Math.max(...gifts.map((gift) => gift.name.length), 4);
  const maxQuantityLength = Math.max(
    ...gifts.map((gift) => gift.quantity.toString().length),
    8
  );

  const printRow = (name, quantity) =>
    "| " +
    name.padEnd(maxNameLength, " ") +
    " | " +
    quantity.padEnd(maxQuantityLength, " ") +
    " |";

  const top = "+".repeat(maxNameLength + maxQuantityLength + 7);
  const bottom = "*".repeat(maxNameLength + maxQuantityLength + 7);
  const header = printRow("Gift", "Quantity");
  const subheader = printRow(
    "-".repeat(maxNameLength),
    "-".repeat(maxQuantityLength)
  );

  const giftRows = gifts.map((gift) =>
    printRow(gift.name, gift.quantity.toString())
  );

  return [top, header, subheader, ...giftRows, bottom].join("\n");
}

describe("Day 21", () => {
  test("Test 1", () => {
    expect(
      printTable([
        { name: "PlayStation 5", quantity: 9234782374892 },
        { name: "Book Learn Web Dev", quantity: 23531 },
      ])
    ).toBe(
      "++++++++++++++++++++++++++++++++++++++\n| Gift               | Quantity      |\n| ------------------ | ------------- |\n| PlayStation 5      | 9234782374892 |\n| Book Learn Web Dev | 23531         |\n**************************************"
    );
  });

  test("Test 2", () => {
    expect(
      printTable([
        { name: "Game", quantity: 2 },
        { name: "Bike", quantity: 1 },
        { name: "Book", quantity: 3 },
      ])
    ).toBe(
      "+++++++++++++++++++\n| Gift | Quantity |\n| ---- | -------- |\n| Game | 2        |\n| Bike | 1        |\n| Book | 3        |\n*******************"
    );
  });

  test("Test 3", () => {
    expect(printTable([{ name: "Game", quantity: 10000 }])).toBe(
      "+++++++++++++++++++\n| Gift | Quantity |\n| ---- | -------- |\n| Game | 10000    |\n*******************"
    );
  });

  test("Test 4", () => {
    expect(printTable([{ name: "Game", quantity: 1234567890 }])).toBe(
      "+++++++++++++++++++++\n| Gift | Quantity   |\n| ---- | ---------- |\n| Game | 1234567890 |\n*********************"
    );
  });

  test("Test 5", () => {
    expect(
      printTable([
        { name: "Toy", quantity: 12 },
        { name: "Mic", quantity: 123 },
      ])
    ).toBe(
      "+++++++++++++++++++\n| Gift | Quantity |\n| ---- | -------- |\n| Toy  | 12       |\n| Mic  | 123      |\n*******************"
    );
  });
});
