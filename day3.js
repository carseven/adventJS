/**
 * https://adventjs.dev/challenges/03 
 */
export default function isValid(letter) {
    if (letter.includes('{') || letter.includes('()') || letter.includes('[')) {
        return false;
    } else if (letter.includes('(') && letter.includes(')')) {
        if (letter.indexOf('(') < letter.indexOf(')'))
            return true;
    }
    return false;
}