export namespace UseDatepicker {
  export type DayNumber = NonNullable<number> & 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

  export type Month = NonNullable<number> & 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

  export type Year = NonNullable<number>;

  export type LanguageCode = NonNullable<string> & "ar-SA" | "cs-CZ" | "da-DK" | "de-DE" | "el-GR" | "en-AU" | "en-GB" | "en-IE" | "en-US" | "en-ZA" | "es-ES" | "es-MX" | "fi-FI" | "fr-CA" | "fr-FR" | "he-IL" | "hi-IN" | "hu-HU" | "id-ID" | "it-IT" | "ja-JP" | "ko-KR" | "nl-BE" | "nl-NL" | "no-NO" | "pl-PL" | "pt-BR" | "pt-PT" | "ro-RO" | "ru-RU" | "sk-SK" | "sv-SE" | "th-TH" | "tr-TR" | "zh-CN" | "zh-HK" | "zh-TW";

  export type Cursor = [Month, Year];

  export interface Options {
    defaultValue?: string | Date,
    filterDate?: (date: Date) => boolean,
    locale?: LanguageCode
  }

  export interface Day {
    date: Date,
    id: string
    value: DayNumber
    isSelected: boolean
    isPrevMonth: boolean
    isCurrentMonth: boolean
    isNextMonth: boolean
    isDisabled: boolean
  }
}
