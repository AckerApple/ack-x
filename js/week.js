"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var month_1 = require("./month");
var date_1 = require("./date");
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
        if (!date_1.method(date).isDate() && !isNaN(date))
            this.endDate = date_1.method(new Date()).setMonth(date).getLastDateOfMonth();
        else
            this.endDate = date;
        return this;
    };
    Week.prototype.setStartDate = function (date) {
        if (!isNaN(date) && date.constructor != Date)
            this.date = date_1.method(new Date()).gotoWeek(date).date;
        else
            this.date = date;
        return this;
    };
    Week.prototype.getStartDate = function () {
        if (!this.date)
            this.date = date_1.method(new Date()).getDateWeekStart();
        return this.date;
    };
    return Week;
}(month_1.Month));
exports.Week = Week;
function method(path) {
    return new Week(path);
}
exports.method = method;
