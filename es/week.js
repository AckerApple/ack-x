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
import { Month } from "./month";
import { method as AckDate } from "./date";
var Week = (function (_super) {
    __extends(Week, _super);
    function Week() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Week.prototype.getEndDate = function () {
        if (this.endDate)
            return this.endDate;
        this.endDate = new Date(this.getStartDate().getDate() + 6);
        return this.endDate;
    };
    Week.prototype.setEndDate = function (date) {
        if (!AckDate(date).isDate() && !isNaN(date))
            this.endDate = AckDate(new Date()).setMonth(date).getLastDateOfMonth();
        else
            this.endDate = date;
        return this;
    };
    Week.prototype.setStartDate = function (date) {
        if (!isNaN(date) && date.constructor != Date)
            this.date = AckDate(new Date()).gotoWeek(date).date;
        else
            this.date = date;
        return this;
    };
    Week.prototype.getStartDate = function () {
        if (!this.date)
            this.date = AckDate(new Date()).getDateWeekStart();
        return this.date;
    };
    return Week;
}(Month));
export { Week };
export function method(path) {
    return new Week(path);
}
