/**
 * https://adventjs.dev/challenges/14
 */
export default function missingReindeer(ids) {
    ids.sort((a, b) => a - b)

    let missingReindeerId;
    let index = 0
    do {
        console.log(`${index}:${ids[index]}`)
        if (index !== ids[index]) {
            missingReindeerId = ids[index] - 1;
        }
        index++;
    } while (!missingReindeerId && index <= ids.length - 1);
    if (!missingReindeerId && missingReindeerId !== 0) {
        missingReindeerId = ids.length;
    }
    return missingReindeerId;
}