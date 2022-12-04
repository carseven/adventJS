/*
Santa Claus needs to review his gift boxes to make sure he can pack them all in his sleigh. He has a series of boxes of different sizes, characterized by their length, width, and height.
Your task is to write a function that, given a list of boxes with their sizes, determines whether it is possible to pack all the boxes in one so that each box contains another (which in turn contains another, and so on).
Each box represents its measures with an object. For example: {l: 2, w: 3, h: 2}. This means that the box has a length of 2, a width of 3 and a height of 2.
A box fits into another box if all the sides of the first are smaller than the sides of the second. The elves have told us that the boxes cannot be rotated, so you cannot put a box of 2x3x2 in a box of 3x2x2. Let's see some examples:
```
fitsInOneBox([
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 }
]) // true
```
In the previous example, the smallest box fits into the largest box. Therefore, it is possible to pack all the boxes in one. Now let's see a case that does not:
```
const boxes = [
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 },
  { l: 3, w: 1, h: 3 }
]

fitsInOneBox(boxes) // false
```
In the previous example, the smallest box fits into the middle box, but the middle box does not fit into the largest box. Therefore, it is not possible to pack all the boxes in one.
Note that the boxes may not come in order:
```
const boxes = [
  { l: 1, w: 1, h: 1 },
  { l: 3, w: 3, h: 3 },
  { l: 2, w: 2, h: 2 }
]

fitsInOneBox(boxes) // true
```
In the previous example, the first box fits into the third, and the third into the second. Therefore, it is possible to pack all the boxes in one.
Things to keep in mind:
The boxes cannot be rotated because the elves have told us that the machine is not ready.
The boxes may come in any order.
The boxes are not always squares, they could be rectangles.
*/

type GiftBox = { l: number; w: number; h: number };

function fitsInOneBox(boxes: GiftBox[]): boolean {
  boxes.sort((a, b) => getGiftPerimeter(b) - getGiftPerimeter(a));
  for (let i = 1; i < boxes.length; i++) {
    const actualGift = boxes[i];
    const previousGift = boxes[i - 1];
    if (getGiftPerimeter(actualGift) >= getGiftPerimeter(previousGift)) {
      return false;
    }

    if (actualGift.h >= previousGift.h) {
      return false;
    }

    if (actualGift.l >= previousGift.l) {
      return false;
    }

    if (actualGift.w >= previousGift.w) {
      return false;
    }
  }
  return true;
}

function fitsInOneBox2(boxes) {
  return boxes
    .sort((a, b) => getGiftPerimeter(a) - getGiftPerimeter(b))
    .every((box, i) => {
      if (i === 0) return true;
      return (
        box.l > boxes[i - 1].l &&
        box.w > boxes[i - 1].w &&
        box.h > boxes[i - 1].h
      );
    });
}

function getGiftPerimeter(gift: GiftBox): number {
  return gift.h + gift.l + gift.w;
}

describe("Day 4", () => {
  test("Test 1", () => {
    expect(
      fitsInOneBox([
        { l: 1, w: 1, h: 1 },
        { l: 2, w: 2, h: 2 },
      ])
    ).toBeTruthy();
  });

  test("Test 2", () => {
    expect(
      fitsInOneBox([
        { l: 1, w: 1, h: 1 },
        { l: 2, w: 2, h: 2 },
        { l: 3, w: 1, h: 3 },
      ])
    ).toBeFalsy();
  });

  test("Test 3", () => {
    expect(
      fitsInOneBox([
        { l: 1, w: 1, h: 1 },
        { l: 2, w: 2, h: 2 },
        { l: 2, w: 10, h: 2 },
      ])
    ).toBeFalsy();
  });

  test("Test 4", () => {
    expect(
      fitsInOneBox([
        { l: 1, w: 1, h: 1 },
        { l: 3, w: 3, h: 3 },
        { l: 2, w: 2, h: 2 },
      ])
    ).toBeTruthy();
  });
});
