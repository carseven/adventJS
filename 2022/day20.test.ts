/*
Santa Claus has realized that even with the collaboration of all the elves he will not be able to deliver all the gifts in time. That's why he will ask for help from his friends at Autentia.
From Autentia they have indicated that they need a program to know which team of reindeer to send to each country. There are different types of reindeer and each one of them can carry a weight of gifts. For example:

```
const reindeerTypes = [
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]
```

In Santa Claus' list of gifts, the weight of each gift and its destination country are expressed. The weight of the gifts is always a natural number. For example:

```
const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'France', weight: 17 },
  { country: 'Italy', weight: 50 }
]
```

Autentia tells us that, for the team of reindeer to send to each country to be optimal, we should:
* Send the maximum number of reindeer possible of greater load capacity
* Make the most of the weight that each reindeer can carry.
* The reindeer have a rather strange character and do not accept that in the team there are more reindeer of a type than reindeer of the next type in descending order of load capacity.

For example. To France (17) you would not send seventeen diesel reindeer (17 * 1). There are reindeer with greater load capacity, but you would not send a nuclear reindeer (50), since you would be wasting its capacity. An electric reindeer (10) would be sent, one gasoline (5) and two diesel (2 * 1).

To Spain (37) you could not send a team made up of three electric reindeer (3 * 10), one gasoline (5) and two diesel (2 * 1), since there cannot be more electric reindeer than gasoline. Nor two electric reindeer (2 * 10), three gasoline (3 * 5) and two diesel (2 * 1), since there cannot be more gasoline than diesel. You would have to send two electric reindeer (2 * 10), two gasoline (2 * 5) and seven diesel (7 * 1).

```
const reindeerTypes = [
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]

const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'France', weight: 17 },
  { country: 'Italy', weight: 50 }
]

howManyReindeers(reindeerTypes, gifts)
// [{
//   country: 'Spain',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }, {
//   country: 'France',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 1 },
//     { type: 'Diesel', num: 2 }
//   ]
//  }, {
//   country: 'Italy',
//   reindeers: [
//     { type: 'Electric', num: 3 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }]
```
To take into account:
* There will always be a reindeer type with a load capacity of 1.
* There will always be at least two types of reindeer available.
There is no limit to the number of reindeer of the same type to send as long as it complies with the restrictions previously stated.
* Your function should return the reindeers types sorted by weight capacity in descending order.
*/

function howManyReindeers(reindeerTypes, gifts) {
  const getReindeers = (/** @type {number} */ weight) => {
    const allowedReindeersTypes = reindeerTypes.filter(
      (reindeerType) => reindeerType.weightCapacity < weight
    );

    let totalWeightCapacity = allowedReindeersTypes.reduce(
      (acc, reindeerType) => acc + reindeerType.weightCapacity,
      0
    );

    return allowedReindeersTypes
      .map((reindeerType) => {
        const num = Math.floor(weight / totalWeightCapacity);

        weight -= num * reindeerType.weightCapacity;
        totalWeightCapacity -= reindeerType.weightCapacity;

        return {
          type: reindeerType.type,
          num,
        };
      })
      .filter((reindeerType) => reindeerType.num > 0);
  };

  reindeerTypes.sort((a, b) => b.weightCapacity - a.weightCapacity);

  return gifts.map((gift) => ({
    country: gift.country,
    reindeers: getReindeers(gift.weight),
  }));
}

describe("Day 20", () => {
  test("Test 1", () => {
    expect(
      howManyReindeers(
        [
          { type: "Nuclear", weightCapacity: 50 },
          { type: "Electric", weightCapacity: 10 },
          { type: "Gasoline", weightCapacity: 5 },
          { type: "Diesel", weightCapacity: 1 },
        ],
        [
          { country: "Spain", weight: 30 },
          { country: "France", weight: 17 },
          { country: "Italy", weight: 50 },
        ]
      )
    ).toEqual([
      {
        country: "Spain",
        reindeers: [
          {
            type: "Electric",
            num: 1,
          },
          {
            type: "Gasoline",
            num: 3,
          },
          {
            type: "Diesel",
            num: 5,
          },
        ],
      },
      {
        country: "France",
        reindeers: [
          {
            type: "Electric",
            num: 1,
          },
          {
            type: "Gasoline",
            num: 1,
          },
          {
            type: "Diesel",
            num: 2,
          },
        ],
      },
      {
        country: "Italy",
        reindeers: [
          {
            type: "Electric",
            num: 3,
          },
          {
            type: "Gasoline",
            num: 3,
          },
          {
            type: "Diesel",
            num: 5,
          },
        ],
      },
    ]);
  });

  test("Test 2", () => {
    expect(
      howManyReindeers(
        [
          { type: "Electric", weightCapacity: 10 },
          { type: "Gasoline", weightCapacity: 5 },
          { type: "Diesel", weightCapacity: 1 },
        ],
        [{ country: "Spain", weight: 37 }]
      )
    ).toEqual([
      {
        country: "Spain",
        reindeers: [
          {
            type: "Electric",
            num: 2,
          },
          {
            type: "Gasoline",
            num: 2,
          },
          {
            type: "Diesel",
            num: 7,
          },
        ],
      },
    ]);
  });

  test("Test 3", () => {
    expect(
      howManyReindeers(
        [
          { type: "Nuclear", weightCapacity: 50 },
          { type: "Electric", weightCapacity: 10 },
          { type: "Gasoline", weightCapacity: 5 },
          { type: "Diesel", weightCapacity: 1 },
        ],
        [
          { country: "Spain", weight: 30 },
          { country: "Germany", weight: 7 },
          { country: "France", weight: 17 },
          { country: "Italy", weight: 50 },
        ]
      )
    ).toEqual([
      {
        country: "Spain",
        reindeers: [
          {
            type: "Electric",
            num: 1,
          },
          {
            type: "Gasoline",
            num: 3,
          },
          {
            type: "Diesel",
            num: 5,
          },
        ],
      },
      {
        country: "Germany",
        reindeers: [
          {
            type: "Gasoline",
            num: 1,
          },
          {
            type: "Diesel",
            num: 2,
          },
        ],
      },
      {
        country: "France",
        reindeers: [
          {
            type: "Electric",
            num: 1,
          },
          {
            type: "Gasoline",
            num: 1,
          },
          {
            type: "Diesel",
            num: 2,
          },
        ],
      },
      {
        country: "Italy",
        reindeers: [
          {
            type: "Electric",
            num: 3,
          },
          {
            type: "Gasoline",
            num: 3,
          },
          {
            type: "Diesel",
            num: 5,
          },
        ],
      },
    ]);
  });
});
