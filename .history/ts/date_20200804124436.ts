//import * as momentPackage from "moment/min/moment.min.js"
//import * as momentPackage from "moment"
//import * as momentPackage from "moment/moment.js"
import * as momentPackage from "moment-mini"
import { suffixByNumber } from "./number"

const moment = momentPackage["default"] ? momentPackage["default"] : momentPackage

export interface fromOptions {
  roundUpMins?: boolean
  roundDownMins?: boolean
  roundUpHours?: boolean
  roundDownHours?: boolean
}

export interface dateStats {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

/* everything operates on a scale of 1-12 NOT 0-11 OR 1-31 NOT 0-30 ... Weeks are 1-53 */
export class AckDate {
  date: Date

  constructor(date?, format?) {
    this.date = toDate(date, format)
    return this
  }

  /* convenience functions for AckDate to act like a date */
  getTime(): number {
    return this.date.getTime()
  }

  getHours(): number {
    return this.date.getHours()
  }

  getMinutes(): number {
    return this.date.getMinutes()
  }

  getMilliseconds(): number {
    return this.date.getMilliseconds()
  }
  /* end */

  /** takes current Date and returns casted to utc set Date object */
  getUtcDate(): Date {
    return new Date(
      this.date.getUTCFullYear(),
      this.date.getUTCMonth(),
      this.date.getUTCDate(),
      this.date.getUTCHours(),
      this.date.getUTCMinutes(),
      this.date.getUTCSeconds()
    )
  }

  /** takes current Date and returns casted utc set Date number */
  utc(): number {
    return this.date.getTime()
    //return this.getUtcDate().getTime()
  }

  /** takes current Date and casts to utc set Date number. Returns this */
  toUtc(): AckDate {
    this.date = this.getUtcDate()
    return this
  }

  setDateByString(date): AckDate {
    this.date = dateStringToDate(date)
    return this
  }

  getTimezoneStamp(sep) {
    return getTimezoneStamp(this.date, sep)
  }

  yearsFromNow(): number {
    return this.dateYearDiff(Date.now())
  }

  monthsFromNow(): number {
    return this.dateMonthDiff(Date.now())
  }

  daysFromNow(): number {
    return this.dateDayDiff(Date.now())
  }

  /** see moment http://momentjs.com/docs/#/displaying/fromnow/  */
  fromNow(hideSuffix): string {
    return moment(this.date).fromNow(hideSuffix)
  }

  /** see moment http://momentjs.com/docs/#/displaying/fromnow/  */
  fromToday(hideSuffix) {
    const fDate = new AckDate().now().gotoSod().date
    const mDate = new AckDate(this.date).gotoSod().date
    return moment(mDate).from(fDate, hideSuffix)
  }

  /** see moment http://momentjs.com/docs/#/displaying/from/ */
  from(d, hideSuffix, options?: fromOptions) {
    const m = moment(toDate(d))
    const m2 = moment(this.date)

    const mDateDiff = momentDateDiff(m, m2, options)

    return moment(0).from(mDateDiff, hideSuffix)
  }

  diffStats(d): dateStats {
    d = toDate(d)

    const yearsDiff = dateYearDiffFloor(this.date, d)
    const months = dateMonthDiffFloor(this.date, d)
    console.log("months", months)
    const monthsDiff = months % 12

    const days = new AckDate(this.date.getTime()).addMonths(months).dateDayDiff(d)
    const dayDiff = days === 1 ? 1 : (Math.floor(days / 7) % 4 % 7)

    const weeks = Math.floor(days / 7)
    const weekDiff = weeks === 4 && monthsDiff === 0 ? 4 : (weeks % 4)

    return {
      years: yearsDiff,
      months: monthsDiff,
      weeks: weekDiff,
      days: dayDiff,
      hours: this.dateHourDiff(d) % 24,
      minutes: this.dateMinuteDiff(d) % 60,
      seconds: this.dateSecondDiff(d) % 60
    }
  }

  now(): AckDate {
    this.date = new Date()
    return this
  }

  param(): AckDate {
    this.date = this.date || new Date()
    return this
  }

  /** 1.25 1.5 1.75 */
  hourMinuteDecimalDiff(date): number {
    const h = this.dateHourDiff(date)
    const m = ((this.dateMinuteDiff(date) % 60) / 60)
    return toDecimal(h + m)
  }

  /** 0:00:01 */
  hourMinSecDiff(date, sep = ":"): string {
    return this.dateHourDiff(date) + sep + ('0' + (this.dateMinuteDiff(date) % 60)).slice(-2) + sep + ('0' + (this.dateSecondDiff(date) % 60)).slice(-2)
  }

  /** 00:01 */
  minSecDiff(date, sep = ":"): string {
    return ('0' + this.dateMinuteDiff(date)).slice(-2) + sep + ('0' + (this.dateSecondDiff(date) % 60)).slice(-2)
  }

  dateYearDiff(date): number {
    date = toDate(date)
    return dateYearDiff(date, this.date)
  }

  dateMonthDiff(date): number {
    date = toDate(date)
    return dateMonthDiff(this.date, date)
  }

  dateWeekDiff(date): number {
    return dateWeekDiff(this.date, date)
  }

  /** always absolute number */
  dateDayDiff(date): number {
    return dateDayDiff(this.date, date)
  }

  /** returns no negative numbers */
  dateHourDiff(date?) {
    const diffTime = dateObjectBy(date == null ? new Date() : date).getTime()
    const calcDate = this.date.getTime() - diffTime
    return Math.floor(Math.abs(calcDate) / 36e5);
    //return Math.floor( Math.abs(calcDate) / 1000 / 60 / 60 );
  }
  dateHoursDiff = this.dateHourDiff//alias

  isDaylightSavings() {
    if (!this.date) return;
    return this.date.getTimezoneOffset() < stdTimezoneOffset(this.date);
  }
  isDst = this.isDaylightSavings//alias

  /** amount daylight savings */
  daylightSavings() {
    var d = new Date()
    return (stdTimezoneOffset(d) - d.getTimezoneOffset()) / 60
  }

  /** true/false if argument is greater than defined date */
  greater(otherDate) {
    return new AckDate(otherDate).date > this.date ? true : false
  }

  /** true/false if argument is lesser than defined date */
  lesser = function (otherDate) {
    return new AckDate(otherDate).date < this.date ? true : false
  }

  //returns years.months (32.11 is 32 years and 11 months && 32.1 is 32 years 1 month)
  getAgeDisplay() {
    var d = this.date
    var toDate = new Date()
    var local: any = {}

    local.isValBirthdate = d != null && isDate(d);

    if (!local.isValBirthdate) return 0;


    local.isBorn = this.greater(toDate)
    if (local.isBorn) {
      local.lesserDate = d
      local.greaterDate = toDate
    } else {
      local.lesserDate = toDate
      local.greaterDate = d
    }

    local.cYear = yearByDate(local.greaterDate)
    local.lastBirthdate = dateAddDay(local.lesserDate, -365)
    local.years = dateYearDiff(local.lesserDate, local.greaterDate)
    local.months = dateMonthDiff(local.lastBirthdate, local.greaterDate)

    if (local.months >= 12)
      local.months = local.months % 12

    local.format = 1;
    if (local.months >= 10)
      local.format = 2

    var rtnNum = Number(local.years + '.' + local.months)

    local.result = (function (n: number, p) {
      var m = Math.pow(10, p);
      return (Math.round(n * m) / m).toFixed(p)
    })(rtnNum, local.format)

    if (!local.isBorn) local.result = -local.result;

    return local.result;
  }

  gt(date) {
    date = dateObjectBy(date)
    return this.date > date
  }

  lt(date) {
    date = dateObjectBy(date)
    return this.date < date
  }

  clone() {
    return new AckDate(new Date(this.date.getTime()))
  }

  isDate(date?) {
    return isDate(date || this.date)
  }

  //return natural Date object
  getDate = function () {
    return this.date.getDate()
  }

  //sets day of month
  setDate = function (n): AckDate {
    var d = this.date
    d = d.setDate(n)
    this.date = new Date(d)
    return this
  }
  setDayOfMonth = this.setDate//aka

  /* YEARS */
  Year() {
    return this.year()
  }

  year() {
    return yearByDate(this.date)
  }
  getYear = this.year

  setYear(n): AckDate {
    this.date.setFullYear(n)
    return this
  }

  dayOfYear() {
    var d = new AckDate(this.date).gotoEod().date
    const compareDate = new Date(d.getFullYear(), 0, 1).getTime()
    return Math.ceil((d.getTime() - compareDate) / 86400000)
  }

  getNextYear(y) {
    y = y == null ? 1 : Number(y)
    return this.year() + y
  }

  nextYear(y = 1): AckDate {
    this.setYear(this.getNextYear(y))
    return this
  }
  addYear = this.nextYear
  addYears = this.nextYear

  getPriorYear(y) {
    y = y == null ? 1 : Number(y)
    return this.year() - Math.abs(y)
  }

  priorYear(y): AckDate {
    this.setYear(this.getPriorYear(y))
    return this
  }

  /* MONTHS */

  /** Jan, Feb, Mar */
  getMonthAbbr() {
    return monthAbbrArray[this.date.getMonth()]
  }

  /** 1st 2nd 3rc of the month */
  getMonthDateProperNumber(): string {
    return this.date.getDate() + this.getMonthDateNumberSuffix()
  }

  /** st || nd || rd. Used for 1st 2nd 3rc of the month */
  getMonthDateNumberSuffix(): string {
    return suffixByNumber(this.date.getDate())
  }

  fullWeeksLeftInMonth() {
    var eDate = this.getLastDateOfMonth()
    var diff = this.dateDayDiff(eDate)
    return Math.floor(diff / 7)
  }

  weekInMonth() {
    var firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    return Math.ceil((this.date.getDate() + firstDay) / 7)
  }

  getMonthDayCount() {
    return new Date(this.year(), this.month(), 0).getDate();
  }

  getMonthName() {
    return monthNameArray[this.month() - 1]
  }

  getMonthNameArray() {
    return monthNameArray
  }

  month() {
    return this.date.getMonth() + 1
  }
  getMonth = this.month

  priorMonth(amount = 1) {
    return this.nextMonth(-Math.abs(amount))
  }

  nextMonth(amount = 1): AckDate {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + amount))
    return this
  }
  addMonths = this.nextMonth

  getLastDateOfMonth() {
    var nd = new Date(this.date.getTime())
    var EDate = new AckDate(nd)
    return EDate.nextMonth().gotoFirstDayOfMonth().prevDay().date
  }

  setMonth(n): AckDate {
    var d = this.date.setMonth(n - 1)
    this.date = new Date(d)
    return this
  }

  gotoFirstDayOfMonth(): AckDate {
    this.prevDay(this.date.getDate() - 1)
    return this
  }

  gotoLastDayOfMonth() {
    return this.nextMonth().gotoFirstDayOfMonth().priorDay()
  }



  /* DAYS */

  daysInMonth() {
    return new Date(this.year(), this.month(), 0).getDate()
  }

  addDays(amount?): AckDate {
    var nd = dateAddDay(this.date, amount)
    this.date = new Date(nd.getTime())
    return this
  }
  nextDay = this.addDays//multi alias

  prevDay(amount = 1): AckDate {
    var d = new Date(this.date.getTime())
    this.date = new Date(d.setDate(d.getDate() - amount))
    return this
  }
  priorDay = this.prevDay//aka for naming consistency

  /* WEEKS */

  isWeekend() {
    return [1, 7].indexOf(this.dayOfWeek()) >= 0
  }

  /** getWeekInYear */
  week() {
    return weekOfDate(this.date)
  }
  getWeek = this.week

  dayOfWeek() {
    var d = this.date
    return d.getDay() + 1
  }

  gotoSunday(): AckDate {
    this.prevDay(this.dayOfWeek() - 1)
    return this
  }
  gotoFirstDayOfWeek = this.gotoSunday

  gotoSaturday() {
    return this.nextWeek().gotoFirstDayOfWeek().prevDay()
  }
  gotoLastDayOfWeek = this.gotoSaturday

  gotoMonday(): AckDate {
    this.gotoFirstDayOfWeek().nextDay()
    return this
  }
  gotoMondayOfWeek = this.gotoMonday

  gotoFriday(): AckDate {
    this.gotoFirstDayOfWeek().nextDay(5)
    return this
  }
  gotoFridayOfWeek = this.gotoFriday

  gotoWeek(week): AckDate {
    var thisWk = this.week()
    this.nextWeek(week - thisWk)
    return this
  }

  priorWeek(amount = 1): AckDate {
    return this.nextWeek(-Math.abs(amount))
  }

  nextWeek(amount = 1): AckDate {
    this.nextDay(amount * 7)
    return this
  }

  getDateWeekStart(): Date {
    var date = this.date
    var dw = this.dayOfWeek() - 1;
    return new Date(date.setDate(date.getDate() - dw))
  }

  getDateWeekStop() {
    var date: any = this.getDateWeekStart()
    date = date.setDate(date.getDate() + 6)
    return endOfDateDay(date)
  }

  /** goto end of day. Just sets time to 23:59:59.999 */
  gotoEod(): AckDate {
    this.date = endOfDateDay(this.date)
    return this
  }
  gotoEndOfDate = this.gotoEod

  /** goto start of day. Just sets time to 0:0:0.0 */
  gotoSod(): AckDate {
    this.date = startOfDateDay(this.date)
    return this
  }
  gotoStartOfDate = this.gotoSod

  gotoStartOfWeek(): AckDate {
    this.date = this.getDateWeekStart()
    return this.gotoSod()
  }

  gotoEndOfWeek(): AckDate {
    this.date = this.getDateWeekStop()
    return this.gotoEod()
  }

  FirstWeekday() {
    var amount = -this.dayOfWeek() + 2
      , nd = this.date
      , nd = new Date(nd.getTime())//clone
      , Nd = new AckDate(nd).nextDay(amount)
    return Nd
  }

  getDateOfFirstWeekday() {
    return new Date(this.FirstWeekday().date.getTime())
  }

  /** method(weekNum, AckDate) */
  eachWeekInYear(method): AckDate {
    var num = this.getWeeksInYear()
      , year = this.year()

    for (var x = 1; x <= num; ++x) {
      var ExD = new AckDate(this.date).setYear(year).gotoWeek(x)
      ExD.gotoFirstDayOfWeek()
      method(x, ExD)
    }
    return this
  }

  eachWeekWithMondayInYear(method): AckDate {
    this.eachWeekInYear(function (num, AckDate) {
      method(num, AckDate.gotoMondayOfWeek())
    })
    return this
  }

  /** returns array of date exposed objects representing each week in a year */
  getWeeksWithMondayInYearExposedArray() {
    var rtnArray = []
    this.eachWeekWithMondayInYear(function (weekNum, AckDate) {
      rtnArray.push(AckDate)
    })
    return rtnArray
  }

  /** returns array of date objects representing each week in a year */
  getWeeksWithMondayInYearArray() {
    var rtnArray = []
    this.eachWeekWithMondayInYear(function (weekNum, AckDate) {
      rtnArray.push(AckDate.date)
    })
    return rtnArray
  }

  getWeeksInYear(y?) {
    y = y ? y : this.year()
    var d, isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
  }



  /* ! TIME METHODS ! */

  setTimeByString(string): AckDate {
    if (!this.date || !string) return this

    if (string.split) {
      var parsed = parseTimeString(string)
      var change: number = this.date.setHours(parsed.hour)
      change = new Date(change).setMinutes(parsed.minute)
      this.date = new Date(change)
    }

    return this
  }

  /** alters this.date and return this */
  addHours(n): AckDate {
    if (this.date) {
      this.date.setHours(this.date.getHours() + n)
    }
    return this
  }

  /** alters this.date and return this */
  addMinutes(n): AckDate {
    if (this.date) this.date = new Date(this.date.getTime() + n * 60000)
    return this
  }

  minuteOfDay() {
    return (60 * this.date.getHours()) + this.date.getMinutes()
  }

  /** alters this.date and return this */
  addSeconds(n) {
    return this.addMilliseconds(n * 1000)
  }

  /** alters this.date and return this */
  addMilliseconds(n): AckDate {
    if (this.date) this.date = new Date(this.date.getTime() + n)
    return this
  }

  /** Does not return negative numbers.
    @date - not required, default = new Date()
    @decimals - not required, default = false (no decimals causes decimal rounding)
  */
  dateSecondDiff(date, decimals?) {
    return datesSecondDiff(this.date, date, decimals)
  }
  dateSecondsDiff = this.dateSecondDiff//alias

  //no negative numbers
  dateMinuteDiff(date, roundUp = false) {
    return datesMinuteDiff(this.date, date, roundUp)
  }
  dateMinutesDiff = this.dateMinuteDiff//alias

  /* FORMATTING */
  format(format) {
    return moment(this.date).format(format)
  }

  getDayName() {
    if (!this.date) return ''
    return dayNameArray[this.date.getDay()]
  }

  getDayAbbr() {
    if (!this.date) return ''
    return dayAbbrArray[this.date.getDay()]
  }

  /** Febuary 24th 2016 */
  mmmmdyyyy() {
    if (!this.date) return ''
    return this.getMonthName() + ' ' + this.getMonthDateProperNumber() + ' ' + this.date.getFullYear()
  }

  /** 01:20.220 */
  hhmmssl(timeSep = ':', milsecSep = '.') {
    if (!this.date) return ''
    var d = this.date
    var h: any = d.getHours()
    var m: any = d.getMinutes()

    m = m < 10 ? '0' + m : m
    h = ('0' + h).slice(-2)

    var s = ('0' + d.getSeconds()).slice(-2)
    return h + timeSep + m + timeSep + s + milsecSep + d.getMilliseconds()
  }

  hhmmsl(timeSep, milsecSep) {
    if (!this.date) return ''
    var d = this.date
    var timeSep = timeSep || ':'
    var milsecSep = milsecSep || '.'
    var h: any = d.getHours()
    var m: any = d.getMinutes()

    m = m < 10 ? '0' + m : m
    h = ('0' + h).slice(-2)

    return h + timeSep + m + timeSep + d.getSeconds() + milsecSep + d.getMilliseconds()
  }

  hmmtt() {
    if (!this.date) return ''

    var d = this.date
    var h = d.getHours()
    var t = 'AM'
    var m: any = d.getMinutes()

    m = m < 10 ? '0' + m : m
    h = h >= 12 ? (t = 'PM', h - 12 || 12) : (h == 0 ? 12 : h)
    return h + ':' + m + ' ' + t
  }

  mmddyyyyhhmmtt(dateSep?, spaceSep = ' ', timeSep?, ttSep?) {
    if (!this.date) return ''
    return this.mmddyyyy(dateSep) + spaceSep + this.hhmmtt(timeSep, ttSep)
  }

  hhmm(timeSep = ':') {
    if (!this.date) return ''
    var d = this.date
    var timeSep = timeSep || ':'
    var h = d.getHours()
    var m: any = d.getMinutes()

    m = m < 10 ? '0' + m : m;
    h = h >= 12 ? (h - 12 || 12) : (h == 0 ? 12 : h)
    return ('0' + h).slice(-2) + timeSep + m
  }

  hhmmtt(timeSep = ':', ttSep = ' ') {
    if (!this.date) return ''
    var d = this.date
    var h = d.getHours()
    var t = 'AM'
    var m: any = d.getMinutes()

    m = m < 10 ? '0' + m : m;
    h = h >= 12 ? (t = 'PM', h - 12 || 12) : (h == 0 ? 12 : h)
    return ('0' + h).slice(-2) + timeSep + m + ttSep + t
  }

  hhmmsstt(timeSep, ttSep) {
    if (!this.date) return ''

    var d = this.date
    var timeSep = timeSep || ':'
    var ttSep = ttSep == null ? ' ' : ttSep
    var h = d.getHours()
    var t = 'AM'
    var m: any = d.getMinutes()

    m = m < 10 ? '0' + m : m;
    h = h >= 12 ? (t = 'PM', h - 12 || 12) : (h == 0 ? 12 : h)
    var s = ('0' + d.getSeconds()).slice(-2)
    return ('0' + h).slice(-2) + timeSep + m + timeSep + s + ttSep + t
  }

  //yyyy-mm-dd hh:nn:ss:l aka serverFormat
  storageFormat(dateSep: string = '-', spaceSep: string = ' ', timeSep?, milsecSep?) {
    if (!this.date) return '';
    return this.date.getFullYear() + dateSep + this.mmdd(dateSep) + spaceSep + this.hhmmssl(timeSep, milsecSep)
  }

  yyyymmdd(sep = "/") {
    if (!this.date) return '';
    return this.year() + sep + this.mmdd(sep)
  }

  mmddyyyy(sep = "/") {
    if (!this.date) return '';
    var d = this.date
    return this.mmdd(sep) + sep + d.getFullYear()
  }

  mdyyyy(sep = "/") {
    if (!this.date) return '';
    var d = this.date
    return this.md(sep) + sep + d.getFullYear()
  }

  mdyy(sep = "/") {
    if (!this.date) return '';
    var d = this.date
    return this.md(sep) + sep + this.yy()
  }

  mmddyy(sep = "/") {
    if (!this.date) return '';
    var r = this.mmddyyyy(sep)
    return r.substring(0, r.length - 4) + r.substring(r.length - 2, r.length)
  }

  yy() {
    if (!this.date) return '';
    return this.date.getFullYear().toString().substring(2, 4)
  }

  mmdd(sep) {
    if (!this.date) return '';
    sep = sep == null ? '/' : sep
    var d = this.date
    return twoDigit(d.getMonth() + 1) + sep + twoDigit(d.getDate())
  }

  md(sep) {
    if (!this.date) return '';
    sep = sep == null ? '/' : sep
    var d = this.date
    return (d.getMonth() + 1) + sep + d.getDate()
  }
}

export function dateObjectBy(date, format?) {
  if (date != null) {
    switch (date.constructor) {
      case AckDate: return date.date
      case Date: return date
      case String: return dateStringToDate(date, format)
      default: return new Date(date)//convert string to date object
    }
  }
  return date || new Date()
}

export function toDate(date, format?) {
  return date === null ? null : (date == null ? new Date() : dateObjectBy(date, format))
}

export function getTimezoneStamp(date, seperator) {
  date = date || new Date()
  var value = new Date(date).toString().match(/([-\+][0-9]+)\s/)[1]
  if (seperator) {
    value = value.substring(0, value.length - 2) + seperator + value.substring(value.length - 2, value.length)
  }
  return value
}

export function dateAddDay(d, amount = 1) {
  var dat = new Date(d);
  dat.setDate(dat.getDate() + amount);
  return dat;
}

export function startOfDateDay(date) {
  date = new Date(new Date(date).setHours(0))
  date = new Date(date.setMinutes(0))
  date = new Date(date.setSeconds(0))
  return new Date(date.setMilliseconds(0))
}

export function endOfDateDay(date) {
  date = new Date(new Date(date).setHours(23))
  date = new Date(date.setMinutes(59))
  date = new Date(date.setSeconds(59))
  return new Date(date.setMilliseconds(999))
}

/** Without format argument, auto detection is by placement of year */
export function dateStringToDate(date, format?) {
  if (format) {
    return new Date(moment(date, format))
  }

  const num = Number(date)
  if (!isNaN(num)) {
    return new Date(num)
  }

  var isZoned = date.substring(date.length - 1, date.length) == 'Z'
  var isFirstFourDigits = date.length > 8 && !isNaN(date.substring(0, 4)) && !isZoned
  var slash = date.substring(4, 5)

  if (isFirstFourDigits && isNaN(slash)) {
    var dateSplit = date.split(slash)
    var month = dateSplit[1]
    var day = dateSplit[2]
    var year = dateSplit[0]
    var dateOnly = dateSplit.length == 3

    dateSplit[0] = year
    dateSplit[1] = month
    dateSplit[2] = day


    //fails on safari 10.1.2
    //dateSplit[0] = month
    //dateSplit[1] = day
    //dateSplit[2] = year

    date = dateSplit.join(slash)
    if (dateOnly) {
      return new Date(year, month - 1, day)
    }
  }

  return new Date(date)
}

//NON PROTOTYPE METHODS
export function twoDigit(n) {
  return ('0' + n).slice(-2)
}

export function isDate(date) {
  if (!date) return false

  var isRawDate = date.constructor == Date && !isNaN(date.getTime())
  if (isRawDate) return true

  if (date.search)//string
    return date.search(/^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/) >= 0

  return false
}

export function yearByDate(d) {
  return d.getFullYear()
}

export function getMonthIndexByString(mon) {
  return monthLcaseNameArray.indexOf(mon.toLowerCase())
}

export const monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
export const monthAbbrArray = ['Jan', 'Feb', 'Mar', 'Apr', 'Ma', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
export const dayNameArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const dayAbbrArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


export function dateYearDiff(d0, d1) {
  return Math.abs(d0.getFullYear() - d1.getFullYear())
}

export function dateYearDiffFloor(d0, d1) {
  const diff = dateDayDiff(d0, d1)
  return Math.floor(diff / 365)
}

var stdTimezoneOffset = function (d) {
  var jan = new Date(d.getFullYear(), 0, 1);
  var jul = new Date(d.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

export function dateMonthDiff(date0, date1) {
  date0 = new Date(date0)
  date1 = new Date(date1)
  const result = (date1.getMonth() + 12 * date1.getFullYear()) - (date0.getMonth() + 12 * date0.getFullYear())
  return Math.abs(result)
}

export function dateMonthDiffFloor(date0, date1) {
  date0 = new Date(date0);
  date1 = new Date(date1);
  const monthsPlusYears0 = date0.getMonth() + 12 * date0.getFullYear();
  const monthsPlusYears1 = date1.getMonth() + 12 * date1.getFullYear();
  const result = monthsPlusYears1 - monthsPlusYears0;

  if (date0.getDate() > date1.getDate()) {
    return Math.abs(result - 1)
  }

  return Math.abs(result)
}

export function dateWeekDiff(date0, date1) {
  date0 = toDate(date0)
  date1 = toDate(date1)
  const diff = (weekOfDate(date1) + 52 * date1.getFullYear()) - (weekOfDate(date0) + 52 * date0.getFullYear())
  return Math.abs(diff)

  //  return Math.abs( weekOfDate( date0 ) - weekOfDate( date1 ) )
}

export function weekOfDate(date: any): number {
  var d = startOfDateDay(toDate(date))
  var onejan = new Date(d.getFullYear(), 0, 1)
  var nowDate = d.getTime()
  const calc = (((nowDate - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7
  return Math.ceil(calc)
}
/*
export function weekOfDate(d):number{
  const now = startOfDateDay(new Date(d))
  const onejan = new Date(now.getFullYear(), 0, 1)

  const timeApart = now.getTime() - onejan.getTime()
  const daysApart = timeApart / 86400000
  return Math.ceil( (daysApart + onejan.getDay() + 1) / 7 )
}

export function utcWeekOfDate(d):number{
  return moment(d).format("W")
}
*/








var eackDate = function (date) {
  return new AckDate(date)
}

export function parseTimeString(date) {
  var dDate: any = new Date(date);

  if (dDate != 'Invalid Date') {
    return { hour: dDate.getHours(), minute: dDate.getMinutes() };
  }

  var hour, minute, tt;
  var tArray = date.split(':');
  var hour = tArray[0];

  if (tArray.length > 1) {
    minute = tArray[1];
    minute = minute.split(' ');
    if (minute.length > 1) {
      tt = minute[1];
      var isPm = tt.toLowerCase() == 'pm'
      if (hour <= 11 && isPm) {
        hour = Number(hour) + 12;
      } else if (hour == 12 && !isPm) {
        hour = 0
      }
    }

    minute = Number(minute[0]);
  }

  return { hour: hour, minute: minute }
}


export function toDecimal(n, p = 2): number {
  var m = Math.pow(10, p);
  const f = (Math.round(n * m) / m).toFixed(p)
  return Number(f)
}

export function method(d?) {
  return new AckDate(d)
}

export function datesSecondDiff(
  date,
  date2,
  decimals?
): number {
  date2 = dateObjectBy(date2 || new Date())
  var dif = date.getTime() - date2.getTime()
  var Seconds_from_T1_to_T2 = dif / 1000;
  var rtn: any = Math.abs(Seconds_from_T1_to_T2)

  if (decimals) {
    decimals = Number(decimals) && !isNaN(decimals) ? decimals : 2;
    rtn = toDecimal(rtn, decimals)
  } else {
    rtn = Math.floor(rtn)
  }

  return rtn
}

export function datesMinuteDiff(
  date,
  date2,
  roundUp = false
) {
  date2 = toDate(date2 == null ? new Date() : date2)
  var hourDiff = date2 - date.getTime(); //in ms
  var secDiff = hourDiff / 1000; //in s
  var minDiff = hourDiff / 60 / 1000; //in minutes
  var hDiff = hourDiff / 3600 / 1000; //in hours
  var hours = Math.floor(hDiff);
  var mins = minDiff - 60 * hours
  const calc = Math.abs(hours * 60 + mins)
  return roundUp ? Math.ceil(calc) : Math.floor(calc)
}

export function momentDateDiff(m, m2, options): number {
  const mDate = m.toDate()
  const m2Date = m2.toDate()

  const diffDate = new Date(Math.abs(mDate.getTime() - m2Date.getTime()))
  const mDiffDate = moment(diffDate)

  if (!options) return mDiffDate

  if (options.roundUpMins) {
    const needsRounding = diffDate.getSeconds() > 0
    if (needsRounding) {
      mDiffDate.add(1, 'minute').startOf('minute')
    }
  }

  if (options.roundDownMins) {
    const needsRounding = diffDate.getSeconds() > 0
    if (needsRounding) {
      mDiffDate.add(-1, 'minute').startOf('minute')
    }
  }

  if (options.roundUpHours) {
    const needsRounding = (datesMinuteDiff(mDate, m2Date) % 60) > 0
    if (needsRounding) {
      mDiffDate.add(1, 'hour').startOf('hour')
    }
  }

  if (options.roundDownHours) {
    const needsRounding = (datesMinuteDiff(mDate, m2Date) % 60) > 0
    if (needsRounding) {
      mDiffDate.add(-1, 'hour').startOf('hour')
    }
  }

  return mDiffDate
}

export function dateDayDiff(date0, date): number {
  //return Math.abs(parseInt((this.date - AckDate.toDate(date))/(24*3600*1000)))
  const dateCalc = date0.getTime() - toDate(date).getTime()
  const calc = Math.floor((dateCalc) / 86400000)
  return Math.abs(calc)
}
