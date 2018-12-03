export interface fromOptions {
    roundUpMins?: boolean;
    roundDownMins?: boolean;
    roundUpHours?: boolean;
    roundDownHours?: boolean;
}
export declare class AckDate {
    date: Date;
    constructor(date?: any, format?: any);
    getTime(): number;
    getHours(): number;
    getMinutes(): number;
    getMilliseconds(): number;
    getUtcDate(): Date;
    utc(): number;
    toUtc(): AckDate;
    setDateByString(date: any): AckDate;
    getTimezoneStamp(sep: any): string;
    yearsFromNow(): number;
    monthsFromNow(): number;
    daysFromNow(): number;
    fromNow(hideSuffix: any): string;
    fromToday(hideSuffix: any): any;
    from(d: any, hideSuffix: any, options?: fromOptions): any;
    now(): AckDate;
    param(): AckDate;
    hourMinSecDiff(date: any, sep?: string): string;
    minSecDiff(date: any, sep?: string): string;
    dateYearDiff(date: any): number;
    dateMonthDiff(date: any): number;
    dateWeekDiff(date: any): number;
    dateDayDiff(date: any): number;
    dateHourDiff(date: any): number;
    dateHoursDiff: (date: any) => number;
    isDaylightSavings(): boolean;
    isDst: () => boolean;
    daylightSavings(): number;
    greater(otherDate: any): boolean;
    lesser: (otherDate: any) => boolean;
    getAgeDisplay(): any;
    gt(date: any): boolean;
    lt(date: any): boolean;
    clone(): AckDate;
    isDate(date?: any): boolean;
    getDate: () => any;
    setDate: (n: any) => AckDate;
    setDayOfMonth: (n: any) => AckDate;
    Year(): any;
    year(): any;
    getYear: () => any;
    setYear(n: any): AckDate;
    dayOfYear(): number;
    getNextYear(y: any): any;
    nextYear(y?: number): AckDate;
    addYear: (y?: number) => AckDate;
    addYears: (y?: number) => AckDate;
    getPriorYear(y: any): number;
    priorYear(y: any): AckDate;
    getMonthAbbr(): string;
    getMonthDateProperNumber(): string;
    getMonthDateNumberSuffix(): string;
    fullWeeksLeftInMonth(): number;
    weekInMonth(): number;
    getMonthDayCount(): number;
    getMonthName(): string;
    getMonthNameArray(): string[];
    month(): number;
    getMonth: () => number;
    priorMonth(amount?: number): AckDate;
    nextMonth(amount?: number): AckDate;
    addMonths: (amount?: number) => AckDate;
    getLastDateOfMonth(): Date;
    setMonth(n: any): AckDate;
    gotoFirstDayOfMonth(): AckDate;
    gotoLastDayOfMonth(): AckDate;
    daysInMonth(): number;
    addDays(amount?: any): AckDate;
    nextDay: (amount?: any) => AckDate;
    prevDay(amount?: number): AckDate;
    priorDay: (amount?: number) => AckDate;
    isWeekend(): boolean;
    week(): number;
    getWeek: () => number;
    dayOfWeek(): number;
    gotoSunday(): AckDate;
    gotoFirstDayOfWeek: () => AckDate;
    gotoSaturday(): AckDate;
    gotoLastDayOfWeek: () => AckDate;
    gotoMonday(): AckDate;
    gotoMondayOfWeek: () => AckDate;
    gotoFriday(): AckDate;
    gotoFridayOfWeek: () => AckDate;
    gotoWeek(week: any): AckDate;
    priorWeek(amount?: number): AckDate;
    nextWeek(amount?: number): AckDate;
    getDateWeekStart(): Date;
    getDateWeekStop(): Date;
    gotoEod(): AckDate;
    gotoEndOfDate: () => AckDate;
    gotoSod(): AckDate;
    gotoStartOfDate: () => AckDate;
    gotoStartOfWeek(): AckDate;
    gotoEndOfWeek(): AckDate;
    FirstWeekday(): AckDate;
    getDateOfFirstWeekday(): Date;
    eachWeekInYear(method: any): AckDate;
    eachWeekWithMondayInYear(method: any): AckDate;
    getWeeksWithMondayInYearExposedArray(): any[];
    getWeeksWithMondayInYearArray(): any[];
    getWeeksInYear(y?: any): 52 | 53;
    setTimeByString(string: any): AckDate;
    addHours(n: any): AckDate;
    addMinutes(n: any): AckDate;
    minuteOfDay(): number;
    addSeconds(n: any): AckDate;
    addMilliseconds(n: any): AckDate;
    dateSecondDiff(date: any, decimals?: any): any;
    dateSecondsDiff: (date: any, decimals?: any) => any;
    dateMinuteDiff(date: any): number;
    dateMinutesDiff: (date: any) => number;
    format(format: any): any;
    getDayName(): string;
    getDayAbbr(): string;
    mmmmdyyyy(): string;
    hhmmssl(timeSep?: string, milsecSep?: string): string;
    hhmmsl(timeSep: any, milsecSep: any): any;
    hmmtt(): string;
    mmddyyyyhhmmtt(dateSep?: any, spaceSep?: string, timeSep?: any, ttSep?: any): string;
    hhmm(timeSep?: string): string;
    hhmmtt(timeSep?: string, ttSep?: string): string;
    hhmmsstt(timeSep: any, ttSep: any): string;
    storageFormat(dateSep?: string, spaceSep?: string, timeSep?: any, milsecSep?: any): string;
    yyyymmdd(sep: any): string;
    mmddyyyy(sep?: any): string;
    mdyyyy(sep: any): any;
    mdyy(sep: any): string;
    mmddyy(sep: any): string;
    yy(): string;
    mmdd(sep: any): string;
    md(sep: any): any;
}
export declare function dateObjectBy(date: any, format?: any): any;
export declare function toDate(date: any, format?: any): any;
export declare function getTimezoneStamp(date: any, seperator: any): string;
export declare function dateAddDay(d: any, amount?: number): Date;
export declare function startOfDateDay(date: any): Date;
export declare function endOfDateDay(date: any): Date;
export declare function dateStringToDate(date: any, format?: any): Date;
export declare function twoDigit(n: any): string;
export declare function isDate(date: any): boolean;
export declare function yearByDate(d: any): any;
export declare function getMonthIndexByString(mon: any): number;
export declare const monthNameArray: string[];
export declare const monthLcaseNameArray: string[];
export declare const monthAbbrArray: string[];
export declare const dayNameArray: string[];
export declare const dayAbbrArray: string[];
export declare function dateYearDiff(d0: any, d1: any): number;
export declare function dateMonthDiff(date0: any, date1: any): number;
export declare function dateWeekDiff(date0: any, date1: any): number;
export declare function weekOfDate(date: any): number;
export declare function parseTimeString(date: any): {
    hour: any;
    minute: any;
};
export declare function toDecimal(n: any, p: any): string;
export declare function method(d?: any): AckDate;
export declare function datesSecondDiff(date: any, date2: any, decimals?: any): any;
export declare function datesMinuteDiff(date: any, date2: any): number;
export declare function momentDateDiff(m: any, m2: any, options: any): number;
