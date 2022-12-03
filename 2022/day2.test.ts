import { describe, expect, test } from "@jest/globals";

/*
  A millionaire has bought a social network and it doesn't bring good news. He has
  announced that each time a working day is lost due to a holiday, it will have to
  be compensated with two extra hours another day of the same year.
  
  Obviously the people who work in the company have not made the slightest joke
  and are preparing a program that tells them the number of extra hours they would
  do in the year if the new rule were applied.
  Since it is office work, their working hours are from Monday to Friday. So you
  only have to worry about the holidays that fall on those days.

  Given a year and an array with the dates of the holidays, return the number of
  extra hours that would be done that year:

  ```
    const year = 2022
    const holidays = ['01/06', '04/01', '12/25'] // format MM/DD

    // 01/06 is January 6, Thursday. Count.
    // 04/01 is April 1, Friday. Count.
    // 12/25 is December 25, Sunday. Do not count.

    countHours(year, holidays) // 2 days -> 4 extra hours in the year
  ```

  Things to keep in mind:
  The year can be a leap year. Make the checks you need for it, if necessary.
  Although the holiday is December 31, the extra hours will be done the same year.
  Date.getDay() method returns the day of the week of a date. 0 is Sunday, 1 is
  Monday, etc.
*/

type IsWorkingDate = { [day: number]: boolean };

function countHours(year: number, holidays: string[]): number {
  console.log("start");
  const isWorkingDay: IsWorkingDate = {
    0: false, // Sunday
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: false, // Saturday
  };
  const extraHoursPerHoliday = 2;
  let extraWorkHoursFromYear = 0;
  for (let i = 0; i < holidays.length; i++) {
    const holidayDayIndex = new Date(`${year}/${holidays[i]}`).getDay();
    if (isWorkingDay[holidayDayIndex]) {
      extraWorkHoursFromYear++;
      console.log("Count " + extraWorkHoursFromYear);
    }
  }
  return extraWorkHoursFromYear * extraHoursPerHoliday;
}

function countHours1(year: number, holidays: string[]): number {
  return (
    holidays.reduce((acc, holiday) => {
      const holidayDayIndex = new Date(`${year}/${holiday}`).getDay();
      if (holidayDayIndex !== 0 && holidayDayIndex !== 6) {
        return acc + 1;
      }
      return acc;
    }, 0) * 2
  );
}

function countHours2(year: number, holidays: string[]): number {
  return (
    holidays.reduce((acc, holiday) => {
      const holidayDayIndex = new Date(`${year}/${holiday}`).getDay();
      if (holidayDayIndex !== 0 && holidayDayIndex !== 6) {
        return acc + 1;
      }
      return acc;
    }, 0) * 2
  );
}

describe("day 2", () => {
  test("Test 1", () => {
    // Arrange
    const year = 2022;
    const holidays = ["01/06", "04/01", "12/25"]; // format MM/DD

    // Act
    const extraHours = countHours(year, holidays);

    // Assert
    expect(extraHours).toBe(4);
  });

  test("Test 2", () => {
    // Act
    const extraHours = countHours(2023, ["01/06", "04/01", "12/25"]);

    // Assert
    expect(extraHours).toBe(4);
  });

  test("Test 3", () => {
    // Act
    const extraHours = countHours(2022, ["01/06", "04/01", "12/25"]);

    // Assert
    expect(extraHours).toBe(4);
  });

  test("Test 4", () => {
    // Act
    const extraHours = countHours(1985, [
      "01/01",
      "01/06",
      "02/02",
      "02/17",
      "02/28",
      "06/03",
      "12/06",
      "12/25",
    ]);

    // Assert
    expect(extraHours).toBe(10);
  });

  test("Test 5", () => {
    // Act
    const extraHours = countHours(2000, ["01/01"]);

    // Assert
    expect(extraHours).toBe(0);
  });
});
