/**
 * https://adventjs.dev/challenges/19
 */
export default function learn(time, courses) {
  let bestResult = [];
  for (let i = 0; i < courses.length - 1; i++)
    for (let j = i + 1; j < courses.length; j++) {
      bestResult =
        courses[i] + courses[j] > time ||
        bestResult.reduce((acc, r) => acc + courses[r], 0) >
          courses[i] + courses[j]
          ? bestResult
          : [i, j];
      if (bestResult.reduce((acc, r) => acc + courses[r], 0) === time)
        return bestResult;
    }
  return bestResult.length ? bestResult : null;
}
