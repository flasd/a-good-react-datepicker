import { UseDatepicker } from "../types";

// get year and month as input
// get weeks for given month and year
// fill weeks with with objects that contain
// - the date (dayDate),
// - day number (dayDate),
// - unique id for each day (dayDate),
// - isSelected (currentValue, dayDate),
// - isPrevMonth (cursor, dayDate),
// - isNextMonth (cursor, dayDate),
// - isCurrentMonth (cursor, dayDate),
// - isDisabled (dayDate, filterFn)

export default function getDay(
  dayDate: Date,
  currentValue: Date,
  cursor: UseDatepicker.Cursor,
  filterFn?: (Date) => boolean
): UseDatepicker.Day {
  const day = dayDate.getDate();
  const month = dayDate.getMonth();
  const year = dayDate.getFullYear();

  const currentDay = currentValue.getDate();
  const currentMonth = currentValue.getMonth();
  const currentYear = currentValue.getFullYear();

  const monthOffset = cursor[1] === year
    ? (month - cursor[0])
    : (year - cursor[1]);

  return {
    date: dayDate,
    value: day as UseDatepicker.DayNumber,
    id: `${day}${month}${year}`,
    isSelected: day === currentDay
      && month === currentMonth
      && year === currentYear,
    isPrevMonth: monthOffset === -1,
    isNextMonth: monthOffset === 1,
    isCurrentMonth: monthOffset === 0,
    isDisabled: !(filterFn(dayDate))
  }
}