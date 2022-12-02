/**
 * https://adventjs.dev/challenges/08
 */
export default function maxProfit(prices) {
  let maxProfit = 0;
  let operationProfit;
  for (let i = 0; i < prices.length; i++) {
    for (let y = prices.length - 1; y > i; y--) {
      operationProfit = prices[y] - prices[i];
      if (operationProfit > maxProfit) {
        console.log(operationProfit);
        maxProfit = operationProfit;
      }
    }
  }
  return maxProfit > 0 ? maxProfit : -1;
}
