/**
 * https://adventjs.dev/challenges/10
 */
export default function getCoins(change) {
  const coins = [50, 20, 10, 5, 2, 1];
  const changeCoins = [0, 0, 0, 0, 0, 0];
  let index = 0;
  coins.forEach((coin) => {
    while (change >= coin) {
      changeCoins[index]++;
      change -= coin;
    }
    index++;
  });
  return changeCoins.reverse();
}
