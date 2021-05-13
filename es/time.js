import { AckDate, parseTimeString } from "./date";
var ackTime = (function () {
    function ackTime(date) {
        this.date = toDate(date);
        return this;
    }
    return ackTime;
}());
export { ackTime };
export function dateObjectBy(date) {
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
export function toDate(date) {
    return date != null ? dateObjectBy(date) : null;
}
function stringToDate(date) {
    var dDate = new Date(date);
    if (dDate != 'Invalid Date') {
        return date;
    }
    var parsed = parseTimeString(date);
    var newDate = new Date().setHours(parsed.hour);
    newDate = new Date(newDate).setMinutes(parsed.minute);
    return new Date(newDate);
}
var eackTime = function (date) {
    var date = new ackTime(date).date;
    return new AckDate(date);
};
export function method(d) {
    return eackTime(d);
}
