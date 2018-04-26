"use strict";
exports.__esModule = true;
var ack_1 = require("./ack");
function ack($var) {
    return ack_1.ack($var);
}
exports.ack = ack;
var error_1 = require("./error");
ack['error'] = error_1.method;
var number_1 = require("./number");
ack['number'] = number_1.method;
var string_1 = require("./string");
ack['string'] = string_1.method;
var binary_1 = require("./binary");
ack['binary'] = binary_1.method;
var base64_1 = require("./base64");
ack['base64'] = base64_1.method;
var object_1 = require("./object");
ack['object'] = object_1.method;
var array_1 = require("./array");
ack['array'] = array_1.method;
var queryObject_1 = require("./queryObject");
ack['queryObject'] = queryObject_1.method;
var week_1 = require("./week");
ack['week'] = week_1.method;
var month_1 = require("./month");
ack['month'] = month_1.method;
var year_1 = require("./year");
ack['year'] = year_1.method;
var date_1 = require("./date");
ack['date'] = date_1.method;
var time_1 = require("./time");
ack['time'] = time_1.method;
var method_1 = require("./method");
ack['method'] = method_1.method;
//declare var module: any;
//module.exports = ack
