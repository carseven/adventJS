
/**
 * https://adventjs.dev/challenges/02
 */
export default function listGifs(letter) {
    const gifts = {}
    letter
        .trim()
        .split(' ')
        .filter(it => !it.includes('_'))
        .forEach(it => gifts[it] ? gifts[it] += 1 : gifts[it] = 1);
    return gifts;
}