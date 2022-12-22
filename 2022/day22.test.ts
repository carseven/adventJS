/* 
Verify that all independent sequences of Christmas lighting systems are in strictly increasing order. We have two arrays: systemNames and stepNumbers.
systemNames contains the names of the Christmas lighting systems, and stepNumbers contains the step numbers of each system.
We must verify that the stepNumbers of each system are in strictly increasing order. If this is true, return true; otherwise, return false.
For example:

```
const systemNames = ["tree_1", "tree_2", "house", "tree_1", "tree_2", "house"]
const stepNumbers = [1, 33, 10, 2, 44, 20]

checkStepNumbers(systemNames, stepNumbers) // => true

// tree_1 has steps: [1, 2]
// tree_2 has steps: [33, 44]
// house has steps: [10, 20]

// true: The steps of each system are in strictly increasing order

checkStepNumbers(["tree_1", "tree_1", "house"], [2, 1, 10]) // => false

// tree_1 has steps: [2, 1]
// house has steps: [10]

// false: tree_1 has steps in decreasing order
```

Note that:
* The position of the system name in systemNames and the step number in stepNumbers correspond to the same system.
* The steps in stepNumbers can be repeated for different systems.
*/

function checkStepNumbers(systemNames: string[], stepNumbers: number[]) {
  const lastSteps = {};
  return systemNames.every((stepName, index) => {
    const lastStepNumber = lastSteps[stepName];
    const stepNumber = stepNumbers[index];
    lastSteps[stepName] = stepNumber;
    return !lastStepNumber || lastStepNumber <= stepNumber;
  });
}

describe("Day 22", () => {
  test("Test 1", () => {
    expect(
      checkStepNumbers(
        ["tree_1", "tree_2", "house", "tree_1", "tree_2", "house"],
        [1, 33, 10, 2, 44, 20]
      )
    ).toBeTruthy();
  });

  test("Test 2", () => {
    expect(
      checkStepNumbers(["tree_1", "tree_1", "house"], [2, 1, 10])
    ).toBeFalsy();
  });

  test("Test 3", () => {
    expect(
      checkStepNumbers(["tree_1", "tree_1", "house"], [1, 2, 10])
    ).toBeTruthy();
  });

  test("Test 4", () => {
    expect(
      checkStepNumbers(
        [
          "house",
          "house",
          "tree_1",
          "tree_1",
          "house",
          "tree_2",
          "tree_2",
          "tree_3",
        ],
        [5, 2, 1, 2, 3, 4, 5, 6]
      )
    ).toBeFalsy();
  });
});
