/**
 * https://adventjs.dev/challenges/16
 */
export default function decodeNumber(symbols) {
    const symbolsMap = {
        '.': 1,
        ',': 5,
        ':': 10,
        ';': 50,
        '!': 100
    }
    let decodedSymbols = 0;
    for (var index = 0; index < symbols.length; index++) {
        if (!symbolsMap[symbols[index]]) return NaN;
        decodedSymbols += symbolsMap[symbols[index + 1]] && symbolsMap[symbols[index + 1]] > symbolsMap[symbols[index]] ? -1 * Math.abs(symbolsMap[symbols[index]]) : symbolsMap[symbols[index]];
    }
    return decodedSymbols;
}