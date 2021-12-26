/**
 * https://adventjs.dev/challenges/17
 */
export default function countPackages(carriers, carrierID) {
    const [_, packages, carriersTeam] = carriers.find(([name]) => name === carrierID);
    return (
        packages + carriersTeam.reduce((total, carrierID) => total + countPackages(carriers, carrierID), 0)
    );
}