import { UseDatepicker } from "../types";


type MonthsWindow = [[Date, Date], [Date, Date], [Date, Date]];

type Calendar = Date[][];


const WEEK_DAYS_ARRAY = Object.freeze(new Array(7).fill('x'));

function getMonthsWindow(month: UseDatepicker.Month, year: UseDatepicker.Year): MonthsWindow {
  return [
    [null, new Date(year, month, 0)],
    [new Date(year, month, 1), new Date(year, month + 1, 0)],
    [new Date(year, month + 1, 1), null]
  ];
}

function getXCalendar(currentMonthLastDay: Date): Array<Array<number>> {
  const dayCount = currentMonthLastDay.getDate();

  return new Array(Math.ceil(dayCount / 7)).fill(WEEK_DAYS_ARRAY);
}

function getDate(year: UseDatepicker.Year, month: UseDatepicker.Year, day: UseDatepicker.DayNumber): Date {
  return new Date(year, month, day, 0, 0, 0, 0);
}


export default function getWeeks(cursor: UseDatepicker.Cursor): Calendar {
  const [
    [, lastMonthLastDay],
    [currentMonthFirstDay, currentMonthLastDay],
    [nextMonthFirstDay]
  ] = getMonthsWindow(...cursor);

  const firstWeekDay = currentMonthFirstDay.getDay();
  const xCalendar = getXCalendar(currentMonthLastDay);

  return xCalendar.map(
    // weekNumber is 0 indexed
    (week, weekNumber) => week.map(
      (x, weekDay) => {
        // monthDay is 1 indexed, weekDay is 0 indexed
        // we subtract the firstWeekDay make the offset proper
        const monthDay = weekDay + 1 - firstWeekDay;

        if (weekNumber === 0) {
          // We are on the first week of the month, so
          // we can we in a day from the past month.

          if ((weekDay) < firstWeekDay) {
            // We are in a day from previuos month
            // We use weekDay because firstWeekDay is zeroIndexed

            // How far from first day are we?
            const distance = firstWeekDay - monthDay;

            const prevMonthLastDay = lastMonthLastDay.getDate();

            // So we get prevMonthLastDay and subtract away the distance.
            const lastMonthCurrentDay = prevMonthLastDay - distance;

            return getDate(
              lastMonthLastDay.getFullYear(),
              lastMonthLastDay.getMonth(),
              lastMonthCurrentDay as UseDatepicker.DayNumber,
            );
          }

          // We are not in the past month, so we must be in the current one!
          return getDate(
            currentMonthFirstDay.getFullYear(),
            currentMonthFirstDay.getMonth(),
            // since we are in the first week, we don't need to calculate week offset!
            monthDay - 1 as UseDatepicker.DayNumber,
          );
        }

        // We calculate the current day
        const currentDay = monthDay + (weekNumber * 7);

        // Are we in the last week of the month?
        // If we go over the currentMonthLastDay, we are in the next month!
        if (weekNumber === (xCalendar.length - 1) && currentDay > currentMonthLastDay.getDate()) {
          return getDate(
            nextMonthFirstDay.getFullYear(),
            nextMonthFirstDay.getMonth(),
            currentDay - currentMonthLastDay.getDate() as UseDatepicker.DayNumber,
          );
        }

        return getDate(
          currentMonthFirstDay.getFullYear(),
          currentMonthFirstDay.getMonth(),
          currentDay as UseDatepicker.DayNumber,
        );
      },
    ),
  );
}