"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = exports.toDate = exports.dateObjectBy = exports.ackTime = void 0;
var date_1 = require("./date");
var ackTime = (function () {
    function ackTime(date) {
        this.date = toDate(date);
        return this;
    }
    return ackTime;
}());
exports.ackTime = ackTime;
function dateObjectBy(date) {
    if (date) {
        if (date.constructor == ackTime) {
            return date.date;
        }
        if (date.constructor == Date)
            return date;
        if (date.split) {
            return stringToDate(date);
        }
        return new Date(date);
    }
    return date || new Date();
}
exports.dateObjectBy = dateObjectBy;
function toDate(date) {
    return date != null ? dateObjectBy(date) : null;
}
exports.toDate = toDate;
function stringToDate(date) {
    var dDate = new Date(date);
    if (dDate != 'Invalid Date') {
        return date;
    }
    var parsed = date_1.parseTimeString(date);
    var newDate = new Date().setHours(parsed.hour);
    newDate = new Date(newDate).setMinutes(parsed.minute);
    return new Date(newDate);
}
var eackTime = function (date) {
    var date = new ackTime(date).date;
    return new date_1.AckDate(date);
};
function method(d) {
    return eackTime(d);
}
exports.method = method;
