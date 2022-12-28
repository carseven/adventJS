/* 
It's the day! Today we're going to deliver gifts… but the warehouses are a maze and the elves are lost.
Indielfo Jones wants to write a program that, upon receiving a matrix, knows if it can quickly exit the maze from its entrance to the exit.
Mazes have the following positions:
W: It's a wall, you can't pass through there. S: Entry point to the warehouse. E: Exit point from the warehouse. : White spaces are where you can pass through.
Valid movements are from one position up, down, left, or right. You can't move diagonally.

```
canExit([
  [' ', ' ', 'W', ' ', 'S'],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', 'W', ' '],
  ['W', 'W', ' ', 'W', 'W'],
  [' ', ' ', ' ', ' ', 'E']
]) // -> true

// You can exit because you start at [0, 4]
// and there's a path to the exit which is [4, 4]

canExit([
  [' ', ' ', 'W', 'W', 'S'],
  [' ', ' ', ' ', 'W', ' '],
  [' ', ' ', ' ', 'W', ' '],
  ['W', 'W', ' ', 'W', 'W'],
  [' ', ' ', ' ', ' ', 'E']
]) // -> false

// There's no way to get from [0, 4] to [4, 4]
```

Remember that:
* You only have to return whether you can exit the maze with a boolean.
* You can't jump over W walls.
* You can't exit the limits of the matrix, you always have to follow an internal path.
*/

function canExit(maze: string[][]) {
  function replace(str) {
    return str
      .replace(/[S][\sE]/g, "SS")
      .replace(/[\sE][S]/g, "SS")
      .split("");
  }

  let x: string[][][] = [];
  new Array(maze[0].length * maze.length).fill(0).forEach(() => {
    let check = [...maze];
    maze.map((horizontal, i) => {
      maze[i] = replace(horizontal.join(""));
      let v = maze[0].map((_, i) => replace(maze.map((x) => x[i]).join("")));
      maze[i] = v.map((x) => x[i]);
    });
    check.flat().join("") == maze.flat().join("") && x.push(check);
  });

  return !x.flat(2).includes("E");
}

describe("Day 24", () => {
  test("Test 1", () => {
    expect(
      canExit([
        [" ", " ", "W", " ", "S"],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", "W", " "],
        ["W", "W", " ", "W", "W"],
        [" ", " ", " ", " ", "E"],
      ])
    ).toBeTruthy();
  });

  test("Test 2", () => {
    expect(
      canExit([
        [" ", " ", "W", "W", "S"],
        [" ", " ", " ", "W", " "],
        [" ", " ", " ", "W", " "],
        ["W", "W", " ", "W", "W"],
        [" ", " ", " ", " ", "E"],
      ])
    ).toBeFalsy();
  });

  test("Test 3", () => {
    expect(
      canExit([
        [" ", " ", "W", "W", "S"],
        [" ", " ", " ", "W", " "],
        [" ", " ", " ", "W", " "],
        ["W", "W", " ", " ", "W"],
        [" ", " ", " ", " ", "E"],
      ])
    ).toBeFalsy();
  });

  test("Test 4", () => {
    expect(canExit([["E", " ", " ", " ", "S"]])).toBeTruthy();
  });

  test("Test 5", () => {
    expect(canExit([["E", " ", "W", " ", "S"]])).toBeFalsy();
  });

  test("Test 6", () => {
    expect(canExit([["E", " ", "W", " ", "S"]])).toBeFalsy();
  });
});
