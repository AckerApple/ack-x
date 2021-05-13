var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AckDate, method as xDate } from "./date";
export { AckDate } from "./date";
export var monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var Month = (function (_super) {
    __extends(Month, _super);
    function Month(num) {
        var _this = _super.call(this) || this;
        _this.monthLcaseNameArray = monthLcaseNameArray;
        if (num != null) {
            _this.setStartDate(num);
        }
        return _this;
    }
    Month.prototype.setStartDate = function (date) {
        var jDate = xDate();
        if (!jDate.isDate(date)) {
            var num = Number(date);
            if (!isNaN(num)) {
                date = xDate().now().setDate(1).setMonth(date).date;
            }
            else {
                var i = this.getMonthIndexByString(date);
                date = xDate(new Date()).setDate(1).setMonth(i + 1).date;
            }
        }
        this.date = date;
        return this;
    };
    Month.prototype.getMonthIndexByString = function (mon) {
        return monthLcaseNameArray.indexOf(mon.toLowerCase());
    };
    Month.prototype.StartDate = function (isClone) {
        var startDate = !isClone ? this.getStartDate() : this.getStartDate();
        return xDate(startDate);
    };
    Month.prototype.xDate = function () {
        return xDate(this.getStartDate());
    };
    Month.prototype.getStartDate = function () {
        if (this.date)
            return this.date;
        this.date = new Date(new Date().setDate(1));
        return this;
    };
    Month.prototype.setEndDate = function (date) {
        if (!xDate(date).isDate() && !isNaN(date))
            this.endDate = xDate(new Date()).setMonth(date).getLastDateOfMonth();
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
}(AckDate));
export { Month };
export function method(num) {
    return new Month(num);
}
