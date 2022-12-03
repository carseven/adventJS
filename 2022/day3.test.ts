/*
You are given a pack of Christmas gifts that Santa Claus wants to deliver to the children. Each gift is represented by a string. Santa Claus has a sleigh that can carry a limited weight, and each gift inside the pack has a weight that is equal to the number of letters in the gift's name.
Santa Claus also has a list of reindeer that can help him deliver the gifts. Each reindeer has a maximum weight limit that it can carry. The maximum weight limit of each reindeer is equal to twice the number of letters in its name.
Your task is to implement a function distributeGifts(packOfGifts, reindeers) that receives a pack of gifts and a list of reindeer and returns the maximum number of gifts that Santa Claus can deliver. Packs of gifts can't be splitted.

```
  const packOfGifts = ["book", "doll", "ball"]
  const reindeers = ["dasher", "dancer"]

  // pack weights 4 + 4 + 4 = 12
  // reindeers can carry (2 * 6) + (2 * 6) = 24
  distributeGifts(packOfGifts, reindeers) // 2
```

Things to keep in mind:
The pack of gifts can't be splitted.
Gifts and reindeers names length will always be greater than 0.
*/

// O(n*m) solution
function distributeGifts(packOfGifts: string[], reindeers: string[]): number {
  const giftsWeight = packOfGifts.reduce(
    (acc, gift) => acc + getNumberOfWords(gift),
    0
  );
  const reindeerMaxWeight = reindeers.reduce(
    (acc, reindeer) => acc + getNumberOfWords(reindeer) * 2,
    0
  );
  return Math.trunc(reindeerMaxWeight / giftsWeight);
}

function getNumberOfWords(word: string): number {
  return word.length;
}

// More complexity but is O(n) and not O(m * n)
function distributeGifts2(packOfGifts: string[], reindeers: string[]): number {
  const giftsNum = packOfGifts.length;
  const reindeersNum = reindeers.length;
  const maxArrayNum = giftsNum > reindeersNum ? giftsNum : reindeersNum;
  let giftsWeight = 0;
  let reindeersMaxWeight = 0;
  for (let i = 0; i < maxArrayNum; i++) {
    if (i < reindeersNum) reindeersMaxWeight += reindeers[i].length * 2;
    if (i < giftsNum) giftsWeight += packOfGifts[i].length;
  }

  return Math.trunc(reindeersMaxWeight / giftsWeight);
}

describe("Day 3", () => {
  test("Test 1", () => {
    // Arrange
    const packOfGifts = ["book", "doll", "ball"];
    const reindeers = ["dasher", "dancer"];

    // Act
    const result = distributeGifts(packOfGifts, reindeers);

    // Assert
    expect(result).toBe(2);
  });

  test("Test 2", () => {
    // Arrange
    const packOfGifts = ["a", "c", "d"];
    const reindeers = ["b", "e"];

    // Act
    const result = distributeGifts(packOfGifts, reindeers);

    // Assert
    expect(result).toBe(1);
  });

  test("Test 3", () => {
    // Act
    const result = distributeGifts(["videogames", "console"], ["midu"]);

    // Assert
    expect(result).toBe(0);
  });

  test("Test 4", () => {
    // Act
    const result = distributeGifts(
      ["game", "videoconsole", "computer"],
      [
        "midudev",
        "pheralb",
        "codingwithdani",
        "carlosble",
        "blasco",
        "facundocapua",
        "madeval",
        "memxd",
      ]
    );

    // Assert
    expect(result).toBe(5);
  });

  test("Test 5", () => {
    // Act
    const result = distributeGifts(
      ["music"],
      [
        "midudev",
        "pheralb",
        "codingwithdani",
        "carlosble",
        "blasco",
        "facundocapua",
        "madeval",
        "memxd",
      ]
    );

    // Assert
    expect(result).toBe(26);
  });
});
