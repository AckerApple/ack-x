export interface fromOptions {
    roundUpMins?: boolean;
    roundDownMins?: boolean;
    roundUpHours?: boolean;
    roundDownHours?: boolean;
}
export declare class AckDate {
    date: Date;
    constructor(date?: any, format?: any);
    /** takes current Date and returns casted utc set Date object */
    getUtcDate(): Date;
    /** takes current Date and returns casted utc set Date number */
    utc(): number;
    /** takes current Date and casts to utc set Date number. Returns this */
    toUtc(): this;
    setDateByString(date: any): this;
    getTimezoneStamp(sep: any): string;
    yearsFromNow(): number;
    monthsFromNow(): number;
    daysFromNow(): number;
    /** see moment http://momentjs.com/docs/#/displaying/fromnow/  */
    fromNow(hideSuffix: any): any;
    /** see moment http://momentjs.com/docs/#/displaying/fromnow/  */
    fromToday(hideSuffix: any): any;
    /** see moment http://momentjs.com/docs/#/displaying/from/ */
    from(d: any, hideSuffix: any, options?: fromOptions): any;
    now(): this;
    param(): this;
    dateYearDiff: (date: any) => number;
    dateMonthDiff(date: any): number;
    /** always absolute number */
    dateDayDiff(date: any): number;
    /** returns no negative numbers */
    dateHourDiff(date: any): number;
    dateHoursDiff: (date: any) => number;
    isDaylightSavings(): boolean;
    isDst: () => boolean;
    /** amount daylight savings */
    daylightSavings(): number;
    /** true/false if argument is greater than defined date */
    greater(otherDate: any): boolean;
    /** true/false if argument is lesser than defined date */
    lesser: (otherDate: any) => boolean;
    getAgeDisplay(): any;
    gt(date: any): boolean;
    lt(date: any): boolean;
    clone(): AckDate;
    isDate(date?: any): boolean;
    getDate: () => any;
    setDate: (n: any) => any;
    setDayOfMonth: (n: any) => any;
    Year(): any;
    year(): any;
    getYear: () => any;
    setYear(n: any): this;
    dayOfYear(): number;
    getNextYear(y: any): any;
    nextYear(y: any): this;
    addYear: (y: any) => this;
    addYears: (y: any) => this;
    getPriorYear(y: any): number;
    priorYear(y: any): this;
    /** 1st 2nd 3rd of the month */
    getMonthAbbr(): string;
    getMonthDateProperNumber(): string;
    fullWeeksLeftInMonth(): number;
    weekInMonth(): number;
    getMonthDayCount(): number;
    getMonthName(): string;
    getMonthNameArray(): string[];
    month(): number;
    getMonth: () => number;
    priorMonth(amount?: number): this;
    nextMonth(amount?: number): this;
    addMonths: (amount?: number) => this;
    getLastDateOfMonth(): Date;
    setMonth(n: any): this;
    gotoFirstDayOfMonth(): this;
    daysInMonth(): number;
    addDays(amount?: any): AckDate;
    nextDay: (amount?: any) => AckDate;
    prevDay(amount?: number): this;
    priorDay: (amount?: number) => this;
    isWeekend(): boolean;
    /** getWeekInYear */
    week(): number;
    getWeek: () => number;
    dayOfWeek(): number;
    gotoSunday(): this;
    gotoFirstDayOfWeek: () => this;
    gotoMonday(): this;
    gotoMondayOfWeek: () => this;
    gotoFriday(): this;
    gotoFridayOfWeek: () => this;
    gotoWeek(week: any): this;
    priorWeek(amount: any): this;
    nextWeek(amount: any): this;
    getDateWeekStart(): Date;
    getDateWeekStop(): Date;
    /** goto end of day. Just sets time to 23:59:59.999 */
    gotoEod(): this;
    gotoEndOfDate: () => this;
    /** goto start of day. Just sets time to 0:0:0.0 */
    gotoSod(): this;
    gotoStartOfDate: () => this;
    FirstWeekday(): AckDate;
    getDateOfFirstWeekday(): Date;
    /** method(weekNum, AckDate) */
    eachWeekInYear(method: any): this;
    eachWeekWithMondayInYear(method: any): this;
    /** returns array of date exposed objects representing each week in a year */
    getWeeksWithMondayInYearExposedArray(): any[];
    /** returns array of date objects representing each week in a year */
    getWeeksWithMondayInYearArray(): any[];
    getWeeksInYear(y?: any): 53 | 52;
    setTimeByString(string: any): this;
    getTime(): number;
    /** alters this.date and return this */
    addHours(n: any): this;
    /** alters this.date and return this */
    addMinutes(n: any): this;
    minuteOfDay(): number;
    /** alters this.date and return this */
    addSeconds(n: any): this;
    /** alters this.date and return this */
    addMilliseconds(n: any): this;
    /** Does not return negative numbers.
      @date - not required, default = new Date()
      @decimals - not required, default = false (no decimals causes decimal rounding)
    */
    dateSecondDiff(date: any, decimals?: any): any;
    dateSecondsDiff: (date: any, decimals?: any) => any;
    dateMinuteDiff(date: any): number;
    dateMinutesDiff: (date: any) => number;
    format(format: any): any;
    getDayName(): string;
    getDayAbbr(): string;
    /** Febuary 24th 2016 */
    mmmmdyyyy(): string;
    /** 01:20.220 */
    hhmmssl(timeSep: any, milsecSep: any): string;
    hhmmsl(timeSep: any, milsecSep: any): any;
    hmmtt(): string;
    mmddyyyyhhmmtt(dateSep: any, spaceSep: any, timeSep: any, ttSep: any): string;
    hhmmtt(timeSep: any, ttSep: any): string;
    hhmmsstt(timeSep: any, ttSep: any): string;
    storageFormat(dateSep: any, spaceSep: any, timeSep: any, milsecSep: any): string;
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
export declare function suffixByNumber(i: any): string;
export declare function dateAddDay(d: any, amount?: number): Date;
export declare function startOfDateDay(date: any): Date;
export declare function endOfDateDay(date: any): Date;
/** Without format argument, auto detection is by placement of year */
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
export declare function parseTimeString(date: any): {
    hour: any;
    minute: any;
};
export declare function toDecimal(n: any, p: any): string;
export declare function method(d?: any): AckDate;
export declare function datesSecondDiff(date: any, date2: any, decimals?: any): any;
export declare function datesMinuteDiff(date: any, date2: any): number;
export declare function checkOptionsRoundMoments(options: any, m: any, m2: any): void;
