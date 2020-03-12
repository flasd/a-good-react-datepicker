import { useState, useRef, useCallback, useMemo } from 'react';
// import getMonth from './dates';
import { UseDatepicker } from '../types';
import getWeeks from './getWeeks';
import getDay from './getDay';


const defaultOptions: UseDatepicker.Options = {
  defaultValue: new Date().toISOString(),
  filterDate: () => true,
  locale: 'en-US'
}

function getISOString(possibleDefaultValue: any): NonNullable<string> {
  if (possibleDefaultValue instanceof Date) {
    return possibleDefaultValue.toISOString() as string;
  }

  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(possibleDefaultValue)) {
    return possibleDefaultValue as string;
  }

  return new Date().toISOString();
}


export default function useDatepicker(useDatepickerOptions: UseDatepicker.Options = {}) {
  const options: UseDatepicker.Options = { ...defaultOptions, ...useDatepickerOptions };

  // Handles input value
  const [value, internalSetValue] = useState(
    // will default to today
    getISOString(options.defaultValue)
  );

  const onChange = useCallback((nextValue: Date | string): void => {
    const nextProperValue = getISOString(nextValue);

    // wont change for a unintended date
    if (nextProperValue) {
      internalSetValue(nextProperValue);
    }
  }, [])

  // handles cursor
  const [cursor, setCursorDate] = useState([
    new Date(value).getMonth(),
    new Date(value).getFullYear(),
  ] as UseDatepicker.Cursor);

  const setCursor = useCallback(
    (nextCursor: UseDatepicker.Cursor): void => {
      if (Array.isArray(nextCursor)) {
        const [nextMonth, nextYear] = nextCursor;

        if (
          typeof nextMonth === 'number'
          && nextMonth >= 0
          && nextMonth <= 11
          && typeof nextYear === 'number'
          && nextYear >= 0
        ) {
          setCursorDate(nextCursor);
        }
      }
    },
    []
  );

  const weeks: UseDatepicker.Day[][] = getWeeks(cursor).map(
    week => week.map(
      day => getDay(day, new Date(value), cursor, options.filterDate),
    ),
  );


  return {
    value,
    // null at the begining, always an ISO string afterwards
    onChange,
    // when it recives a JS date or ISO string, sets value
    // else no.op
    cursor,
    // [always an int between 0 and 11, always a positive int]
    setCursor,
    // when it recives a [int between 0 and 11, int being year], sets current cursor
    // else no.op
    weeks,
    // Array<Array<>>
  };
}