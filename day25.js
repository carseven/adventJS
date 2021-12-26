/**
 * https://adventjs.dev/challenges/23
 */
export default function canReconfigure(from, to) {
    if (from.length !== to.length) return false;

    let seenFromLetter = {}
    let seenToLetter = {}

    for (var i = 0; i < from.length; i++) {
        const fromCase = from[i];
        const toCase = to[i];

        if (seenToLetter[toCase] && seenToLetter[toCase] !== fromCase) return false;

        if (seenFromLetter[fromCase] && seenFromLetter[fromCase] !== toCase) return false;
        seenFromLetter[fromCase] = toCase;
        seenToLetter[toCase] = fromCase;
    }
    return true
}