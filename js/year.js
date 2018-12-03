"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("./date");
var ackYear = (function () {
    function ackYear(yyyy) {
        this.getMonth = this.month;
        this.getWeek = this.week;
        this.year = this.getYear;
        if (yyyy != null)
            this.setStartDate(yyyy);
        return this;
    }
    ackYear.prototype.setStartDate = function (date) {
        var isObject = typeof (date) == 'object', isYearString = !isObject && !isNaN(Number(date)), isYear = isYearString || (!date_1.method(date).isDate() && !isNaN(date));
        if (isYear) {
            date = new Date(new Date('1/1/2011').setFullYear(date));
        }
        this.date = date;
        return this;
    };
    ackYear.prototype.getStartDate = function () {
        if (this.date)
            return this.date;
        var d = '1/1/' + date_1.method(new Date()).year();
        this.date = new Date(d);
        return this.date;
    };
    ackYear.prototype.setEndDate = function (date) {
        if (!date_1.method(date).isDate() && !isNaN(date))
            this.date = new Date('12/31/' + date);
        else
            this.date = date;
        return this;
    };
    ackYear.prototype.getEndDate = function () {
        if (this.endDate)
            return this.endDate;
        var d = '12/31/' + this.getYear();
        this.endDate = new Date(d);
        return this.endDate;
    };
    ackYear.prototype.StartDate = function (isClone) {
        var startDate = !isClone ? this.getStartDate() : this.getStartDate();
        return date_1.method(startDate);
    };
    ackYear.prototype.xDate = function () {
        return date_1.method(this.getStartDate());
    };
    ackYear.prototype.month = function () {
        return this.StartDate().month();
    };
    ackYear.prototype.week = function () {
        return this.StartDate().week();
    };
    ackYear.prototype.getYear = function () {
        var d = this.getStartDate();
        return date_1.method(d).year();
    };
    ackYear.prototype.setYear = function (yyyy) {
        var ExYy = date_1.method(yyyy);
        if (isNaN(yyyy) && ExYy.isDate())
            yyyy = ExYy.year();
        var date = this.getStartDate();
        date = new Date(date.setFullYear(yyyy));
        this.setStartDate(date);
        return this;
    };
    ackYear.prototype.getDateOfLastWeekday = function () {
        var d = this.getStartDate(), addAmount = -date_1.method(d).dayOfWeek() + 6, dateA = new Date(d.setDate(d.getDate() + addAmount));
        dateA = new Date(dateA.setHours(23));
        dateA = new Date(dateA.setMinutes(59));
        dateA = new Date(dateA.setSeconds(59));
        return dateA;
    };
    return ackYear;
}());
exports.ackYear = ackYear;
function method(path) {
    return new ackYear(path);
}
exports.method = method;
