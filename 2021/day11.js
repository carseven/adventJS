/**
 * https://adventjs.dev/challenges/11
 */
export default function shouldBuyFidelity(times) {
  let fidelity = 0;
  for (var i = 1; i <= times; i++) {
    fidelity = fidelity + 12 * 0.75 ** i;
  }
  return 12 * times > 250 + fidelity;
}
