/**
 * https://adventjs.dev/challenges/06
 */
export default function sumPairs(numbers, result) {
    for (let i = 0; i < numbers.length; i++) {
        for (let y = 0; y < numbers.length; y++) {
            console.log(numbers[i])
            if (i !== y && numbers[i] + numbers[y] === result) {
                return [
                    numbers[i],
                    numbers[y]
                ]
            }
        }
    }
    return null;
}
