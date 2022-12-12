/*
Create a program that checks if Santa's sleigh makes a parabola jump between cities. You receive a number array that represents the height at which the sleigh is at each moment.
For the parabola to be correct, the sleigh's trip must be ascending at the beginning and descending at the end. It cannot go up again once it has gone down, nor can it start the trip going down. Let's see some examples:

```
const heights = [1, 3, 8, 5, 2]
checkJump(heights) // true

/*
It's `true`.
The jump goes up-down.

    8 (highest point)
   ↗ ↘
  3   5
 ↗     ↘
1       2


const heights = [1, 7, 3, 5]
checkJump(heights) // false


It's `false`.
It goes up-down-up.

  7   5 
 ↗ ↘ ↗
1   3
```

We need the program to return a boolean that indicates whether the sleigh makes a parabola or not.
Things to keep in mind
* The jump is valid if it goes up once and down once. If the sleigh stays at the same height between two positions, the parabola continues.
* It is not necessary for the starting and ending points to be the same (cities can be at different heights).
*/
function checkJump(heights: number[]): boolean {
  const maxheight = Math.max(...heights);

  const maxheightIndex = heights.indexOf(maxheight);

  if (maxheightIndex !== 0) {
    for (let index = maxheightIndex; index >= 0; index--) {
      if (heights[index - 1] >= heights[index]) {
        return false;
      }
    }
  }
  // Buscar que desde la izquierda van todos en orden
  for (let index = maxheightIndex; index < heights.length - 1; index++) {
    if (heights[index + 1] >= heights[index]) {
      return false;
    }
  }
  return true;
}

function checkJumpOptimazed(heights: number[]): boolean {
  const maxHeightindex = heights.indexOf(Math.max(...heights));
  const up = heights.slice(0, maxHeightindex);
  const down = heights.slice(maxHeightindex + 1);
  const hasBeenDown = down
    .slice(1)
    .every((height, index) => height <= down[index]);
  const hasBeenUp = up.slice(1).every((height, index) => height >= up[index]);
  return !!down.length && !!up.length && hasBeenDown && hasBeenUp;
}

describe("Day 10", () => {
  test("Test 1", () => {
    expect(checkJump([1, 3, 8, 5, 2])).toBeTruthy();
  });

  test("Test 2", () => {
    expect(checkJump([1, 7, 3, 5])).toBeFalsy();
  });
});
