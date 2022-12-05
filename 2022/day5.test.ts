/*
To not tire the reindeer, Papa Noel wants to leave the maximum number of gifts by making the least number of trips possible.
He has an array of cities where each element is the number of gifts he can leave there. For example, [12, 3, 11, 5, 7]. He also has a limit on the number of gifts that can fit in his bag, and finally, the maximum number of cities that his reindeer can visit.
As he doesn't want to leave a city half-way, if he can't leave all the gifts that are from that city, he doesn't leave any there.
Create a program that tells him the highest sum of gifts that he could distribute, taking into account the maximum number of gifts and the maximum number of cities he can visit. For example:
```
const giftsCities = [12, 3, 11, 5, 7]
const maxGifts = 20
const maxCities = 3

// the highest sum of gifts to distribute
// visiting a maximum of 3 cities
// is 20: [12, 3, 5]

// the highest sum would be [12, 7, 11]
// but it exceeds the limit of 20 gifts and he
// would have to leave a city half-way.

getMaxGifts(giftsCities, maxGifts, maxCities) // 20 (12 + 3 + 5)
```
If it is not possible to make any trips that satisfies everything, the result should be 0. More examples:
```
getMaxGifts([12, 3, 11, 5, 7], 20, 3) // 20
getMaxGifts([50], 15, 1) // 0
getMaxGifts([50], 100, 1) // 50
getMaxGifts([50, 70], 100, 1) // 70
getMaxGifts([50, 70, 30], 100, 2) // 100
getMaxGifts([50, 70, 30], 100, 3) // 100
getMaxGifts([50, 70, 30], 100, 4) // 100
```
To consider:
* maxGifts >= 1
* giftsCities.length >= 1
* maxCities >= 1 
* The number of maxCities can be greater than giftsCities.length
*/

function getMaxGifts(
  giftsCities: number[],
  maxGifts: number,
  maxCities: number
): number {
  const POSSIBLE_COMBINTAIONS = 2 ** giftsCities.length;

  // Documentation: https://algotree.org/algorithms/numeric/subsets_bitwise/
  // Original solution to find the combination: https://github.com/mamunoz-dev/adventjs-2022/blob/main/day5.md
  const validCombinations = new Array(POSSIBLE_COMBINTAIONS)
    .fill() // Creates an empty arrray
    // Create each possible combination
    .map((_, finalArrayIndex) => {
      return giftsCities.filter((_, originalArrayIndex) => {
        // For each index, validate if it's covered by the mask (Read the documentation)
        const MASK = 2 ** originalArrayIndex;
        // If the condition is true, we return the element wich is in the
        // original array at the current index originalArrayIndex.
        return finalArrayIndex & MASK;
      });
    })
    // Remove combinations that exceed the cities limit
    .filter((combination) => combination.length <= maxCities)
    // Get the sum of each combination
    .map((combination) => combination.reduce((acc, curr) => acc + curr, 0))
    // Remove combinations that exceed the gifts limit
    .filter((sum) => sum <= maxGifts)
    .sort((a, b) => a - b);

  return validCombinations[validCombinations.length - 1];
}

function getMaxGifts(giftsCities, maxGifts, maxCities) {
  return solve(giftsCities, maxGifts, maxCities);
}

function solve(
  giftsCities,
  maxGifts,
  maxCities,
  i = 0,
  countOfGifts = 0,
  currentCities = 0
) {
  if (currentCities == maxCities || i == giftsCities.length)
    return countOfGifts;

  if (countOfGifts + giftsCities[i] <= maxGifts)
    return Math.max(
      solve(
        giftsCities,
        maxGifts,
        maxCities,
        i + 1,
        countOfGifts + giftsCities[i],
        currentCities + 1
      ),
      solve(
        giftsCities,
        maxGifts,
        maxCities,
        i + 1,
        countOfGifts,
        currentCities
      )
    );

  return solve(
    giftsCities,
    maxGifts,
    maxCities,
    i + 1,
    countOfGifts,
    currentCities
  );
}

describe("Day 5", () => {
  test("Test 1", () => {
    const giftsCities = [12, 3, 11, 5, 7];
    const maxGifts = 20;
    const maxCities = 3;
    expect(getMaxGifts(giftsCities, maxGifts, maxCities)).toBe(20);
  });

  // test("Test 2", () => {
  //   expect(
  //     fitsInOneBox([
  //       { l: 1, w: 1, h: 1 },
  //       { l: 2, w: 2, h: 2 },
  //       { l: 3, w: 1, h: 3 },
  //     ])
  //   ).toBeFalsy();
  // });

  // test("Test 3", () => {
  //   expect(
  //     fitsInOneBox([
  //       { l: 1, w: 1, h: 1 },
  //       { l: 2, w: 2, h: 2 },
  //       { l: 2, w: 10, h: 2 },
  //     ])
  //   ).toBeFalsy();
  // });

  // test("Test 4", () => {
  //   expect(
  //     fitsInOneBox([
  //       { l: 1, w: 1, h: 1 },
  //       { l: 3, w: 3, h: 3 },
  //       { l: 2, w: 2, h: 2 },
  //     ])
  //   ).toBeTruthy();
  // });
});
