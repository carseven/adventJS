/**
 * https://adventjs.dev/challenges/05
 */
export default function daysToXmas(date) {
    const christmasDay = new Date('Dec 25, 2021')
    return Math.ceil((christmasDay.getTime() - date.getTime()) / (1000 * 3600 * 24))
}
