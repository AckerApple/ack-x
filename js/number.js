"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jXNumber = (function () {
    function jXNumber(number) {
        this.number = number;
        return this;
    }
    jXNumber.prototype.getSuffix = function () {
        return this.number == null ? '' : suffixByNumber(this.number);
    };
    jXNumber.prototype.decimalFormat = function (p) {
        p = p == null ? 2 : p;
        var m = Math.pow(10, p), n = this.number;
        return (Math.round(n * m) / m).toFixed(p);
    };
    jXNumber.prototype.asMinutesToDateTime = function (options) {
        options = options || {};
        var minute = this.number;
        var iDate = options.date || new Date();
        var date = new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), 0, minute);
        return date;
    };
    jXNumber.prototype.asMinutesToTime = function (options) {
        options = options || {};
        options.timeDelim = options.timeDelim || ':';
        options.dayPeriodDelim = options.dayPeriodDelim || ' ';
        var d = this.asMinutesToDateTime(options);
        var hour = d.getHours();
        var tt = 'AM';
        var mins = d.getMinutes();
        if (hour > 12) {
            tt = 'PM';
            hour = hour - 12;
        }
        mins = mins.toString().length == 1 ? '0' + mins : mins;
        return hour + options.timeDelim + mins + options.dayPeriodDelim + tt;
    };
    return jXNumber;
}());
exports.jXNumber = jXNumber;
function suffixByNumber(i) {
    if (!i)
        return '';
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}
exports.suffixByNumber = suffixByNumber;
function method(path) {
    return new jXNumber(path);
}
exports.method = method;
