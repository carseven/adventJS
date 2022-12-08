/*
In the Santa Claus stores they are doing inventory. There are three stores (which is represented as an Array each). In each store there are gifts.
We have been asked to write a program that tells us what gifts we have to buy to replenish our stores now that Christmas is approaching. A gift must be replenished when there is only stock in one of the three stores.
For example, if we have the following stores:
```
const a1 = ['bike', 'car', 'bike', 'bike']
const a2 = ['car', 'bike', 'doll', 'car']
const a3 = ['bike', 'pc', 'pc']

// The store a1 has "bike" and "car".
// The store a2 has "car", "bike" and "doll".
// The store a3 has "bike" and "pc".

// The gift "doll" and "pc" are only  in the stores a2 and a3 respectively.

const gifts = getGiftsToRefill(a1, a2, a3) // ['doll', 'pc']
```
As you can see, the stores can have the same gift repeated several times. But, no matter how many existences there are in a store, if we do not have it in the other two, we must replenish it to have better distribution.
📝 En resumen
Create a function getGiftsToRefill that receives three Array as parameters.
The function must return an Array with the gifts to be replenished.
A gift must be replenished when there is only stock in one of the three stores.
If there is no gift to replenish, the function must return an empty Array.
If there is more than one gift to replenish, the function must return an Array with all the gifts that need to be replenished.
*/

function getGiftsToRefill1(a1: string[], a2: string[], a3: string[]): string[] {
  const stores = [a1, a2, a3];
  const toReFillGifts = {};
  stores.forEach((store, storeIndex) => {
    const othersStore = [...stores];
    othersStore.splice(storeIndex);
    store.forEach((gift) => {
      let isGiftOnOtherStore = false;
      othersStore.forEach((otherStore) => {
        if (otherStore.includes(gift)) {
          isGiftOnOtherStore = true;
        }
      });
      if (isGiftOnOtherStore) {
        toReFillGifts[gift] = true;
      }
    });
  });

  return Object.keys(toReFillGifts);
}

function getGiftsToRefill(a1: string[], a2: string[], a3: string[]): string[] {
  const stores = [a1, a2, a3];
  const gifts = [...new Set(stores.flat())];
  let numStoresGiftINcluded = 0;
  return gifts.filter((gift) => {
    numStoresGiftINcluded = 0;
    stores.forEach((store) => {
      numStoresGiftINcluded += Number(store.includes(gift));
    });
    return numStoresGiftINcluded === 1;
  });
}

describe("Day 7", () => {
  test("Test 1", () => {
    const a1 = ["bike", "car", "bike", "bike"];
    const a2 = ["car", "bike", "doll", "car"];
    const a3 = ["bike", "pc", "pc"];
    expect(getGiftsToRefill(a1, a2, a3)).toEqual(["doll", "pc"]);
  });

  test("Test 2", () => {
    expect(getGiftsToRefill([], [], [])).toEqual([]);
  });

  test("Test 3", () => {
    expect(getGiftsToRefill(["a", "a"], ["a", "a"], ["a", "a"])).toEqual([]);
  });

  test("Test 4", () => {
    expect(getGiftsToRefill(["a", "a"], ["b", "b"], ["c", "c"])).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  test("Test 5", () => {
    expect(getGiftsToRefill(["a", "b"], ["c", "d"], ["e", "f"])).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ]);
  });
});
