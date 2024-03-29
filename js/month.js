"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = exports.Month = exports.monthLcaseNameArray = exports.AckDate = void 0;
var date_1 = require("./date");
var date_2 = require("./date");
Object.defineProperty(exports, "AckDate", { enumerable: true, get: function () { return date_2.AckDate; } });
exports.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var Month = (function (_super) {
    __extends(Month, _super);
    function Month(num) {
        var _this = _super.call(this) || this;
        _this.monthLcaseNameArray = exports.monthLcaseNameArray;
        if (num != null) {
            _this.setStartDate(num);
        }
        return _this;
    }
    Month.prototype.setStartDate = function (date) {
        var jDate = (0, date_1.method)();
        if (!jDate.isDate(date)) {
            var num = Number(date);
            if (!isNaN(num)) {
                date = (0, date_1.method)().now().setDate(1).setMonth(date).date;
            }
            else {
                var i = this.getMonthIndexByString(date);
                date = (0, date_1.method)(new Date()).setDate(1).setMonth(i + 1).date;
            }
        }
        this.date = date;
        return this;
    };
    Month.prototype.getMonthIndexByString = function (mon) {
        return exports.monthLcaseNameArray.indexOf(mon.toLowerCase());
    };
    Month.prototype.StartDate = function (isClone) {
        var startDate = !isClone ? this.getStartDate() : this.getStartDate();
        return (0, date_1.method)(startDate);
    };
    Month.prototype.xDate = function () {
        return (0, date_1.method)(this.getStartDate());
    };
    Month.prototype.getStartDate = function () {
        if (this.date)
            return this.date;
        this.date = new Date(new Date().setDate(1));
        return this;
    };
    Month.prototype.setEndDate = function (date) {
        if (!(0, date_1.method)(date).isDate() && !isNaN(date))
            this.endDate = (0, date_1.method)(new Date()).setMonth(date).getLastDateOfMonth();
        else
            this.endDate = date;
        return this;
    };
    Month.prototype.getEndDate = function () {
        if (this.endDate)
            return this.endDate;
        var d = '12/31/' + this.getYear();
        this.endDate = new Date(d);
        return this.endDate;
    };
    return Month;
}(date_1.AckDate));
exports.Month = Month;
function method(num) {
    return new Month(num);
}
exports.method = method;
