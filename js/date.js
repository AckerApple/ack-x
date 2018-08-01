"use strict";
exports.__esModule = true;
var momentPackage = require("moment");
var number_1 = require("./number");
var moment = momentPackage["default"] ? momentPackage["default"] : momentPackage;
/* everything operates on a scale of 1-12 NOT 0-11 OR 1-31 NOT 0-30 ... Weeks are 1-53 */
var AckDate = /** @class */ (function () {
    function AckDate(date, format) {
        this.dateYearDiff = function (date) {
            date = toDate(date);
            return dateYearDiff(date, this.date);
        };
        this.dateHoursDiff = this.dateHourDiff; //alias
        this.isDst = this.isDaylightSavings; //alias
        /** true/false if argument is lesser than defined date */
        this.lesser = function (otherDate) {
            return new AckDate(otherDate).date < this.date ? true : false;
        };
        //return natural Date object
        this.getDate = function () {
            return this.date.getDate();
        };
        //sets day of month
        this.setDate = function (n) {
            var d = this.date;
            d = d.setDate(n);
            this.date = new Date(d);
            return this;
        };
        this.setDayOfMonth = this.setDate; //aka
        this.getYear = this.year;
        this.addYear = this.nextYear;
        this.addYears = this.nextYear;
        this.getMonth = this.month;
        this.addMonths = this.nextMonth;
        this.nextDay = this.addDays; //multi alias
        this.priorDay = this.prevDay; //aka for naming consistency
        this.getWeek = this.week;
        this.gotoFirstDayOfWeek = this.gotoSunday;
        this.gotoLastDayOfWeek = this.gotoSaturday;
        this.gotoMondayOfWeek = this.gotoMonday;
        this.gotoFridayOfWeek = this.gotoFriday;
        this.gotoEndOfDate = this.gotoEod;
        this.gotoStartOfDate = this.gotoSod;
        this.dateSecondsDiff = this.dateSecondDiff; //alias
        this.dateMinutesDiff = this.dateMinuteDiff; //alias
        this.date = toDate(date, format);
        return this;
    }
    //convenience of date as number
    AckDate.prototype.getTime = function () {
        return this.date.getTime();
    };
    /** takes current Date and returns casted utc set Date object */
    AckDate.prototype.getUtcDate = function () {
        return new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate(), this.date.getUTCHours(), this.date.getUTCMinutes(), this.date.getUTCSeconds());
    };
    /** takes current Date and returns casted utc set Date number */
    AckDate.prototype.utc = function () {
        return this.getUtcDate().getTime();
    };
    /** takes current Date and casts to utc set Date number. Returns this */
    AckDate.prototype.toUtc = function () {
        this.date = this.getUtcDate();
        return this;
    };
    AckDate.prototype.setDateByString = function (date) {
        this.date = dateStringToDate(date);
        return this;
    };
    AckDate.prototype.getTimezoneStamp = function (sep) {
        return getTimezoneStamp(this.date, sep);
    };
    AckDate.prototype.yearsFromNow = function () {
        return this.dateYearDiff(Date.now());
    };
    AckDate.prototype.monthsFromNow = function () {
        return this.dateMonthDiff(Date.now());
    };
    AckDate.prototype.daysFromNow = function () {
        return this.dateDayDiff(Date.now());
    };
    /** see moment http://momentjs.com/docs/#/displaying/fromnow/  */
    AckDate.prototype.fromNow = function (hideSuffix) {
        return moment(this.date).fromNow(hideSuffix);
    };
    /** see moment http://momentjs.com/docs/#/displaying/fromnow/  */
    AckDate.prototype.fromToday = function (hideSuffix) {
        var fDate = new AckDate().now().gotoSod().date;
        var mDate = new AckDate(this.date).gotoSod().date;
        return moment(mDate).from(fDate, hideSuffix);
    };
    /** see moment http://momentjs.com/docs/#/displaying/from/ */
    AckDate.prototype.from = function (d, hideSuffix, options) {
        var m = moment(toDate(d));
        var m2 = moment(this.date);
        var mDateDiff = momentDateDiff(m, m2, options);
        return moment(0).from(mDateDiff, hideSuffix);
    };
    AckDate.prototype.now = function () {
        this.date = new Date();
        return this;
    };
    AckDate.prototype.param = function () {
        this.date = this.date || new Date();
        return this;
    };
    AckDate.prototype.dateMonthDiff = function (date) {
        return dateMonthDiff(this.date, date);
    };
    AckDate.prototype.dateWeekDiff = function (date) {
        return dateWeekDiff(this.date, date);
    };
    /** always absolute number */
    AckDate.prototype.dateDayDiff = function (date) {
        //return Math.abs(parseInt((this.date - AckDate.toDate(date))/(24*3600*1000)))
        var dateCalc = this.date.getTime() - toDate(date).getTime();
        var calc = Math.floor((dateCalc) / 86400000);
        return Math.abs(calc);
    };
    /** returns no negative numbers */
    AckDate.prototype.dateHourDiff = function (date) {
        var calcDate = this.date.getTime() - dateObjectBy(date || new Date());
        return Math.abs(calcDate) / 36e5;
    };
    AckDate.prototype.isDaylightSavings = function () {
        if (!this.date)
            return;
        return this.date.getTimezoneOffset() < stdTimezoneOffset(this.date);
    };
    /** amount daylight savings */
    AckDate.prototype.daylightSavings = function () {
        var d = new Date();
        return (stdTimezoneOffset(d) - d.getTimezoneOffset()) / 60;
    };
    /** true/false if argument is greater than defined date */
    AckDate.prototype.greater = function (otherDate) {
        return new AckDate(otherDate).date > this.date ? true : false;
    };
    //returns years.months (32.11 is 32 years and 11 months && 32.1 is 32 years 1 month)
    AckDate.prototype.getAgeDisplay = function () {
        var d = this.date;
        var toDate = new Date();
        var local = {};
        local.isValBirthdate = d != null && isDate(d);
        if (!local.isValBirthdate)
            return 0;
        local.isBorn = this.greater(toDate);
        if (local.isBorn) {
            local.lesserDate = d;
            local.greaterDate = toDate;
        }
        else {
            local.lesserDate = toDate;
            local.greaterDate = d;
        }
        local.cYear = yearByDate(local.greaterDate);
        local.lastBirthdate = dateAddDay(local.lesserDate, -365);
        local.years = dateYearDiff(local.lesserDate, local.greaterDate);
        local.months = dateMonthDiff(local.lastBirthdate, local.greaterDate);
        if (local.months >= 12)
            local.months = local.months % 12;
        local.format = 1;
        if (local.months >= 10)
            local.format = 2;
        var rtnNum = Number(local.years + '.' + local.months);
        local.result = (function (n, p) {
            var m = Math.pow(10, p);
            return (Math.round(n * m) / m).toFixed(p);
        })(rtnNum, local.format);
        if (!local.isBorn)
            local.result = -local.result;
        return local.result;
    };
    AckDate.prototype.gt = function (date) {
        date = dateObjectBy(date);
        return this.date > date;
    };
    AckDate.prototype.lt = function (date) {
        date = dateObjectBy(date);
        return this.date < date;
    };
    AckDate.prototype.clone = function () {
        return new AckDate(new Date(this.date.getTime()));
    };
    AckDate.prototype.isDate = function (date) {
        return isDate(date || this.date);
    };
    /* YEARS */
    AckDate.prototype.Year = function () {
        return this.year();
    };
    AckDate.prototype.year = function () {
        return yearByDate(this.date);
    };
    AckDate.prototype.setYear = function (n) {
        this.date.setFullYear(n);
        return this;
    };
    AckDate.prototype.dayOfYear = function () {
        var d = new AckDate(this.date).gotoEod().date;
        var compareDate = new Date(d.getFullYear(), 0, 1).getTime();
        return Math.ceil((d.getTime() - compareDate) / 86400000);
    };
    AckDate.prototype.getNextYear = function (y) {
        y = y == null ? 1 : Number(y);
        return this.year() + y;
    };
    AckDate.prototype.nextYear = function (y) {
        if (y === void 0) { y = 1; }
        this.setYear(this.getNextYear(y));
        return this;
    };
    AckDate.prototype.getPriorYear = function (y) {
        y = y == null ? 1 : Number(y);
        return this.year() - Math.abs(y);
    };
    AckDate.prototype.priorYear = function (y) {
        this.setYear(this.getPriorYear(y));
        return this;
    };
    /* MONTHS */
    /** Jan, Feb, Mar */
    AckDate.prototype.getMonthAbbr = function () {
        return exports.monthAbbrArray[this.date.getMonth()];
    };
    /** 1st 2nd 3rc of the month */
    AckDate.prototype.getMonthDateProperNumber = function () {
        return this.date.getDate() + this.getMonthDateNumberSuffix();
    };
    /** st || nd || rd. Used for 1st 2nd 3rc of the month */
    AckDate.prototype.getMonthDateNumberSuffix = function () {
        return number_1.suffixByNumber(this.date.getDate());
    };
    AckDate.prototype.fullWeeksLeftInMonth = function () {
        var eDate = this.getLastDateOfMonth();
        var diff = this.dateDayDiff(eDate);
        return Math.floor(diff / 7);
    };
    AckDate.prototype.weekInMonth = function () {
        var firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        return Math.ceil((this.date.getDate() + firstDay) / 7);
    };
    AckDate.prototype.getMonthDayCount = function () {
        return new Date(this.year(), this.month(), 0).getDate();
    };
    AckDate.prototype.getMonthName = function () {
        return exports.monthNameArray[this.month() - 1];
    };
    AckDate.prototype.getMonthNameArray = function () {
        return exports.monthNameArray;
    };
    AckDate.prototype.month = function () {
        return this.date.getMonth() + 1;
    };
    AckDate.prototype.priorMonth = function (amount) {
        if (amount === void 0) { amount = 1; }
        return this.nextMonth(-Math.abs(amount));
    };
    AckDate.prototype.nextMonth = function (amount) {
        if (amount === void 0) { amount = 1; }
        this.date = new Date(this.date.setMonth(this.date.getMonth() + amount));
        return this;
    };
    AckDate.prototype.getLastDateOfMonth = function () {
        var nd = new Date(this.date.getTime());
        var EDate = new AckDate(nd);
        return EDate.nextMonth().gotoFirstDayOfMonth().prevDay().date;
    };
    AckDate.prototype.setMonth = function (n) {
        var d = this.date.setMonth(n - 1);
        this.date = new Date(d);
        return this;
    };
    AckDate.prototype.gotoFirstDayOfMonth = function () {
        this.prevDay(this.date.getDate() - 1);
        return this;
    };
    AckDate.prototype.gotoLastDayOfMonth = function () {
        return this.nextMonth().gotoFirstDayOfMonth().priorDay();
    };
    /* DAYS */
    AckDate.prototype.daysInMonth = function () {
        return new Date(this.year(), this.month(), 0).getDate();
    };
    AckDate.prototype.addDays = function (amount) {
        var nd = dateAddDay(this.date, amount);
        this.date = new Date(nd.getTime());
        return this;
    };
    AckDate.prototype.prevDay = function (amount) {
        if (amount === void 0) { amount = 1; }
        var d = new Date(this.date.getTime());
        this.date = new Date(d.setDate(d.getDate() - amount));
        return this;
    };
    /* WEEKS */
    AckDate.prototype.isWeekend = function () {
        return [1, 7].indexOf(this.dayOfWeek()) >= 0;
    };
    /** getWeekInYear */
    AckDate.prototype.week = function () {
        return weekOfDate(this.date);
    };
    AckDate.prototype.dayOfWeek = function () {
        var d = this.date;
        return d.getDay() + 1;
    };
    AckDate.prototype.gotoSunday = function () {
        this.prevDay(this.dayOfWeek() - 1);
        return this;
    };
    AckDate.prototype.gotoSaturday = function () {
        return this.nextWeek().gotoFirstDayOfWeek().prevDay();
    };
    AckDate.prototype.gotoMonday = function () {
        this.gotoFirstDayOfWeek().nextDay();
        return this;
    };
    AckDate.prototype.gotoFriday = function () {
        this.gotoFirstDayOfWeek().nextDay(5);
        return this;
    };
    AckDate.prototype.gotoWeek = function (week) {
        var thisWk = this.week();
        this.nextWeek(week - thisWk);
        return this;
    };
    AckDate.prototype.priorWeek = function (amount) {
        if (amount === void 0) { amount = 1; }
        return this.nextWeek(-Math.abs(amount));
    };
    AckDate.prototype.nextWeek = function (amount) {
        if (amount === void 0) { amount = 1; }
        this.nextDay(amount * 7);
        return this;
    };
    AckDate.prototype.getDateWeekStart = function () {
        var date = this.date;
        var dw = this.dayOfWeek() - 1;
        return new Date(date.setDate(date.getDate() - dw));
    };
    AckDate.prototype.getDateWeekStop = function () {
        var date = this.getDateWeekStart();
        date = date.setDate(date.getDate() + 6);
        return endOfDateDay(date);
    };
    /** goto end of day. Just sets time to 23:59:59.999 */
    AckDate.prototype.gotoEod = function () {
        this.date = endOfDateDay(this.date);
        return this;
    };
    /** goto start of day. Just sets time to 0:0:0.0 */
    AckDate.prototype.gotoSod = function () {
        this.date = startOfDateDay(this.date);
        return this;
    };
    AckDate.prototype.FirstWeekday = function () {
        var amount = -this.dayOfWeek() + 2, nd = this.date, nd = new Date(nd.getTime()) //clone
        , Nd = new AckDate(nd).nextDay(amount);
        return Nd;
    };
    AckDate.prototype.getDateOfFirstWeekday = function () {
        return new Date(this.FirstWeekday().date.getTime());
    };
    /** method(weekNum, AckDate) */
    AckDate.prototype.eachWeekInYear = function (method) {
        var num = this.getWeeksInYear(), year = this.year();
        for (var x = 1; x <= num; ++x) {
            var ExD = new AckDate(this.date).setYear(year).gotoWeek(x);
            ExD.gotoFirstDayOfWeek();
            method(x, ExD);
        }
        return this;
    };
    AckDate.prototype.eachWeekWithMondayInYear = function (method) {
        this.eachWeekInYear(function (num, AckDate) {
            method(num, AckDate.gotoMondayOfWeek());
        });
        return this;
    };
    /** returns array of date exposed objects representing each week in a year */
    AckDate.prototype.getWeeksWithMondayInYearExposedArray = function () {
        var rtnArray = [];
        this.eachWeekWithMondayInYear(function (weekNum, AckDate) {
            rtnArray.push(AckDate);
        });
        return rtnArray;
    };
    /** returns array of date objects representing each week in a year */
    AckDate.prototype.getWeeksWithMondayInYearArray = function () {
        var rtnArray = [];
        this.eachWeekWithMondayInYear(function (weekNum, AckDate) {
            rtnArray.push(AckDate.date);
        });
        return rtnArray;
    };
    AckDate.prototype.getWeeksInYear = function (y) {
        y = y ? y : this.year();
        var d, isLeap;
        d = new Date(y, 0, 1);
        isLeap = new Date(y, 1, 29).getMonth() === 1;
        //check for a Jan 1 that's a Thursday or a leap year that has a
        //Wednesday jan 1. Otherwise it's 52
        return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
    };
    /* ! TIME METHODS ! */
    AckDate.prototype.setTimeByString = function (string) {
        if (!this.date || !string)
            return this;
        if (string.split) {
            var parsed = parseTimeString(string);
            var change = this.date.setHours(parsed.hour);
            change = new Date(change).setMinutes(parsed.minute);
            this.date = new Date(change);
        }
        return this;
    };
    /** alters this.date and return this */
    AckDate.prototype.addHours = function (n) {
        if (this.date) {
            this.date.setHours(this.date.getHours() + n);
        }
        return this;
    };
    /** alters this.date and return this */
    AckDate.prototype.addMinutes = function (n) {
        if (this.date)
            this.date = new Date(this.date.getTime() + n * 60000);
        return this;
    };
    AckDate.prototype.minuteOfDay = function () {
        return (60 * this.date.getHours()) + this.date.getMinutes();
    };
    /** alters this.date and return this */
    AckDate.prototype.addSeconds = function (n) {
        return this.addMilliseconds(n * 1000);
    };
    /** alters this.date and return this */
    AckDate.prototype.addMilliseconds = function (n) {
        if (this.date)
            this.date = new Date(this.date.getTime() + n);
        return this;
    };
    /** Does not return negative numbers.
      @date - not required, default = new Date()
      @decimals - not required, default = false (no decimals causes decimal rounding)
    */
    AckDate.prototype.dateSecondDiff = function (date, decimals) {
        return datesSecondDiff(this.date, date, decimals);
    };
    //no negative numbers
    AckDate.prototype.dateMinuteDiff = function (date) {
        return datesMinuteDiff(this.date, date);
    };
    /* FORMATTING */
    AckDate.prototype.format = function (format) {
        return moment(this.date).format(format);
    };
    AckDate.prototype.getDayName = function () {
        if (!this.date)
            return '';
        return exports.dayNameArray[this.date.getDay()];
    };
    AckDate.prototype.getDayAbbr = function () {
        if (!this.date)
            return '';
        return exports.dayAbbrArray[this.date.getDay()];
    };
    /** Febuary 24th 2016 */
    AckDate.prototype.mmmmdyyyy = function () {
        if (!this.date)
            return '';
        return this.getMonthName() + ' ' + this.getMonthDateProperNumber() + ' ' + this.date.getFullYear();
    };
    /** 01:20.220 */
    AckDate.prototype.hhmmssl = function (timeSep, milsecSep) {
        if (timeSep === void 0) { timeSep = ':'; }
        if (milsecSep === void 0) { milsecSep = '.'; }
        if (!this.date)
            return '';
        var d = this.date;
        var h = d.getHours();
        var m = d.getMinutes();
        m = m < 10 ? '0' + m : m;
        h = ('0' + h).slice(-2);
        var s = ('0' + d.getSeconds()).slice(-2);
        return h + timeSep + m + timeSep + s + milsecSep + d.getMilliseconds();
    };
    AckDate.prototype.hhmmsl = function (timeSep, milsecSep) {
        if (!this.date)
            return '';
        var d = this.date;
        var timeSep = timeSep || ':';
        var milsecSep = milsecSep || '.';
        var h = d.getHours();
        var m = d.getMinutes();
        m = m < 10 ? '0' + m : m;
        h = ('0' + h).slice(-2);
        return h + timeSep + m + timeSep + d.getSeconds() + milsecSep + d.getMilliseconds();
    };
    AckDate.prototype.hmmtt = function () {
        if (!this.date)
            return '';
        var d = this.date;
        var h = d.getHours();
        var t = 'AM';
        var m = d.getMinutes();
        m = m < 10 ? '0' + m : m;
        h = h >= 12 ? (t = 'PM', h - 12 || 12) : (h == 0 ? 12 : h);
        return h + ':' + m + ' ' + t;
    };
    AckDate.prototype.mmddyyyyhhmmtt = function (dateSep, spaceSep, timeSep, ttSep) {
        if (spaceSep === void 0) { spaceSep = ' '; }
        if (!this.date)
            return '';
        return this.mmddyyyy(dateSep) + spaceSep + this.hhmmtt(timeSep, ttSep);
    };
    AckDate.prototype.hhmmtt = function (timeSep, ttSep) {
        if (!this.date)
            return '';
        var d = this.date;
        var timeSep = timeSep || ':';
        var ttSep = ttSep == null ? ' ' : ttSep;
        var h = d.getHours();
        var t = 'AM';
        var m = d.getMinutes();
        m = m < 10 ? '0' + m : m;
        h = h >= 12 ? (t = 'PM', h - 12 || 12) : (h == 0 ? 12 : h);
        return ('0' + h).slice(-2) + timeSep + m + ttSep + t;
    };
    AckDate.prototype.hhmmsstt = function (timeSep, ttSep) {
        if (!this.date)
            return '';
        var d = this.date;
        var timeSep = timeSep || ':';
        var ttSep = ttSep == null ? ' ' : ttSep;
        var h = d.getHours();
        var t = 'AM';
        var m = d.getMinutes();
        m = m < 10 ? '0' + m : m;
        h = h >= 12 ? (t = 'PM', h - 12 || 12) : (h == 0 ? 12 : h);
        var s = ('0' + d.getSeconds()).slice(-2);
        return ('0' + h).slice(-2) + timeSep + m + timeSep + s + ttSep + t;
    };
    //yyyy-mm-dd hh:nn:ss:l aka serverFormat
    AckDate.prototype.storageFormat = function (dateSep, spaceSep, timeSep, milsecSep) {
        if (dateSep === void 0) { dateSep = '-'; }
        if (spaceSep === void 0) { spaceSep = ' '; }
        if (!this.date)
            return '';
        return this.date.getFullYear() + dateSep + this.mmdd(dateSep) + spaceSep + this.hhmmssl(timeSep, milsecSep);
    };
    AckDate.prototype.yyyymmdd = function (sep) {
        if (!this.date)
            return '';
        sep = sep == null ? '' : sep;
        return this.year() + sep + this.mmdd(sep);
    };
    AckDate.prototype.mmddyyyy = function (sep) {
        if (!this.date)
            return '';
        sep = sep == null ? '/' : sep;
        var d = this.date;
        return this.mmdd(sep) + sep + d.getFullYear();
    };
    AckDate.prototype.mdyyyy = function (sep) {
        if (!this.date)
            return '';
        sep = sep == null ? '/' : sep;
        var d = this.date;
        return this.md(sep) + sep + d.getFullYear();
    };
    AckDate.prototype.mdyy = function (sep) {
        if (!this.date)
            return '';
        sep = sep == null ? '/' : sep;
        var d = this.date;
        return this.md(sep) + sep + this.yy();
    };
    AckDate.prototype.mmddyy = function (sep) {
        if (!this.date)
            return '';
        var r = this.mmddyyyy();
        return r.substring(0, r.length - 4) + r.substring(r.length - 2, r.length);
    };
    AckDate.prototype.yy = function () {
        if (!this.date)
            return '';
        return this.date.getFullYear().toString().substring(2, 4);
    };
    AckDate.prototype.mmdd = function (sep) {
        if (!this.date)
            return '';
        sep = sep == null ? '/' : sep;
        var d = this.date;
        return twoDigit(d.getMonth() + 1) + sep + twoDigit(d.getDate());
    };
    AckDate.prototype.md = function (sep) {
        if (!this.date)
            return '';
        sep = sep == null ? '/' : sep;
        var d = this.date;
        return (d.getMonth() + 1) + sep + d.getDate();
    };
    return AckDate;
}());
exports.AckDate = AckDate;
function dateObjectBy(date, format) {
    if (date != null) {
        switch (date.constructor) {
            case AckDate: return date.date;
            case Date: return date;
            case String: return dateStringToDate(date, format);
            default: return new Date(date); //convert string to date object
        }
    }
    return date || new Date();
}
exports.dateObjectBy = dateObjectBy;
function toDate(date, format) {
    return date === null ? null : (date == null ? new Date() : dateObjectBy(date, format));
}
exports.toDate = toDate;
function getTimezoneStamp(date, seperator) {
    date = date || new Date();
    var value = new Date(date).toString().match(/([-\+][0-9]+)\s/)[1];
    if (seperator) {
        value = value.substring(0, value.length - 2) + seperator + value.substring(value.length - 2, value.length);
    }
    return value;
}
exports.getTimezoneStamp = getTimezoneStamp;
function dateAddDay(d, amount) {
    if (amount === void 0) { amount = 1; }
    var dat = new Date(d);
    dat.setDate(dat.getDate() + amount);
    return dat;
}
exports.dateAddDay = dateAddDay;
function startOfDateDay(date) {
    date = new Date(new Date(date).setHours(0));
    date = new Date(date.setMinutes(0));
    date = new Date(date.setSeconds(0));
    return new Date(date.setMilliseconds(0));
}
exports.startOfDateDay = startOfDateDay;
function endOfDateDay(date) {
    date = new Date(new Date(date).setHours(23));
    date = new Date(date.setMinutes(59));
    date = new Date(date.setSeconds(59));
    return new Date(date.setMilliseconds(999));
}
exports.endOfDateDay = endOfDateDay;
/** Without format argument, auto detection is by placement of year */
function dateStringToDate(date, format) {
    if (format) {
        return new Date(moment(date, format));
    }
    var isZoned = date.substring(date.length - 1, date.length) == 'Z';
    var isFirstFourDigits = date.length > 8 && !isNaN(date.substring(0, 4)) && !isZoned;
    var slash = date.substring(4, 5);
    if (isFirstFourDigits && isNaN(slash)) {
        var dateSplit = date.split(slash);
        var month = dateSplit[1];
        var day = dateSplit[2];
        var year = dateSplit[0];
        var dateOnly = dateSplit.length == 3;
        dateSplit[0] = year;
        dateSplit[1] = month;
        dateSplit[2] = day;
        //fails on safari 10.1.2
        //dateSplit[0] = month
        //dateSplit[1] = day
        //dateSplit[2] = year
        date = dateSplit.join(slash);
        if (dateOnly) {
            return new Date(year, month - 1, day);
        }
    }
    return new Date(date);
}
exports.dateStringToDate = dateStringToDate;
//NON PROTOTYPE METHODS
function twoDigit(n) {
    return ('0' + n).slice(-2);
}
exports.twoDigit = twoDigit;
function isDate(date) {
    if (!date)
        return false;
    var isRawDate = date.constructor == Date && !isNaN(date.getTime());
    if (isRawDate)
        return true;
    if (date.search) //string
        return date.search(/^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/) >= 0;
    return false;
}
exports.isDate = isDate;
function yearByDate(d) {
    return d.getFullYear();
}
exports.yearByDate = yearByDate;
function getMonthIndexByString(mon) {
    return exports.monthLcaseNameArray.indexOf(mon.toLowerCase());
}
exports.getMonthIndexByString = getMonthIndexByString;
exports.monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
exports.monthAbbrArray = ['Jan', 'Feb', 'Mar', 'Apr', 'Ma', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
exports.dayNameArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
exports.dayAbbrArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function dateYearDiff(d0, d1) {
    return Math.abs(d0.getFullYear() - d1.getFullYear());
}
exports.dateYearDiff = dateYearDiff;
var stdTimezoneOffset = function (d) {
    var jan = new Date(d.getFullYear(), 0, 1);
    var jul = new Date(d.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};
function dateMonthDiff(date0, date1) {
    date0 = new Date(date0);
    date1 = new Date(date1);
    return Math.abs((date1.getMonth() + 12 * date1.getFullYear()) - (date0.getMonth() + 12 * date0.getFullYear()));
}
exports.dateMonthDiff = dateMonthDiff;
function dateWeekDiff(date0, date1) {
    date0 = toDate(date0);
    date1 = toDate(date1);
    return Math.abs((weekOfDate(date1) + 52 * date1.getFullYear()) - (weekOfDate(date0) + 52 * date0.getFullYear()));
    //  return Math.abs( weekOfDate( date0 ) - weekOfDate( date1 ) )
}
exports.dateWeekDiff = dateWeekDiff;
function weekOfDate(date) {
    var d = startOfDateDay(toDate(date));
    var onejan = new Date(d.getFullYear(), 0, 1);
    var nowDate = d.getTime();
    var calc = (((nowDate - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7;
    return Math.ceil(calc);
}
exports.weekOfDate = weekOfDate;
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
    return new AckDate(date);
};
function parseTimeString(date) {
    var dDate = new Date(date);
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
            var isPm = tt.toLowerCase() == 'pm';
            if (hour <= 11 && isPm) {
                hour = Number(hour) + 12;
            }
            else if (hour == 12 && !isPm) {
                hour = 0;
            }
        }
        minute = Number(minute[0]);
    }
    return { hour: hour, minute: minute };
}
exports.parseTimeString = parseTimeString;
function toDecimal(n, p) {
    var m = Math.pow(10, p);
    return (Math.round(n * m) / m).toFixed(p);
}
exports.toDecimal = toDecimal;
function method(d) {
    return new AckDate(d);
}
exports.method = method;
function datesSecondDiff(date, date2, decimals) {
    date2 = dateObjectBy(date2 || new Date());
    var dif = date.getTime() - date2.getTime();
    var Seconds_from_T1_to_T2 = dif / 1000;
    var rtn = Math.abs(Seconds_from_T1_to_T2);
    if (decimals) {
        decimals = Number(decimals) && !isNaN(decimals) ? decimals : 2;
        rtn = toDecimal(rtn, decimals);
    }
    else {
        rtn = Math.round(rtn);
    }
    return rtn;
}
exports.datesSecondDiff = datesSecondDiff;
function datesMinuteDiff(date, date2) {
    date2 = toDate(date2 || new Date());
    var hourDiff = date2 - date.getTime(); //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var hours = Math.floor(hDiff);
    var mins = minDiff - 60 * hours;
    var calc = Math.abs(hours * 60 + mins);
    return Math.round(calc);
}
exports.datesMinuteDiff = datesMinuteDiff;
function momentDateDiff(m, m2, options) {
    var mDate = m.toDate();
    var m2Date = m2.toDate();
    var diffDate = new Date(Math.abs(mDate.getTime() - m2Date.getTime()));
    var mDiffDate = moment(diffDate);
    if (!options)
        return mDiffDate;
    if (options.roundUpMins) {
        var needsRounding = diffDate.getSeconds() > 0;
        if (needsRounding) {
            mDiffDate.add(1, 'minute').startOf('minute');
        }
    }
    if (options.roundDownMins) {
        var needsRounding = diffDate.getSeconds() > 0;
        if (needsRounding) {
            mDiffDate.add(-1, 'minute').startOf('minute');
        }
    }
    if (options.roundUpHours) {
        var needsRounding = (datesMinuteDiff(mDate, m2Date) % 60) > 0;
        if (needsRounding) {
            mDiffDate.add(1, 'hour').startOf('hour');
        }
    }
    if (options.roundDownHours) {
        var needsRounding = (datesMinuteDiff(mDate, m2Date) % 60) > 0;
        if (needsRounding) {
            mDiffDate.add(-1, 'hour').startOf('hour');
        }
    }
    return mDiffDate;
}
exports.momentDateDiff = momentDateDiff;
