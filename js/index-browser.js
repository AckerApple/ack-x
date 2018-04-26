"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ack_1 = require("./ack");
var error_1 = require("./error");
var number_1 = require("./number");
var string_1 = require("./string");
var binary_1 = require("./binary");
var base64_1 = require("./base64");
var object_1 = require("./object");
var array_1 = require("./array");
var queryObject_1 = require("./queryObject");
var week_1 = require("./week");
var month_1 = require("./month");
var year_1 = require("./year");
var date_1 = require("./date");
var time_1 = require("./time");
var method_1 = require("./method");
var ack = /** @class */ (function (_super) {
    __extends(ack, _super);
    function ack($var) {
        var _this = _super.call(this, $var) || this;
        return _this;
    }
    ack.prototype.ackit = function (name) {
        return ack[name];
    };
    ack.error = error_1.method;
    ack.number = number_1.method;
    ack.string = string_1.method;
    ack.binary = binary_1.method;
    ack.base64 = base64_1.method;
    ack.object = object_1.method;
    ack.array = array_1.method;
    ack.queryObject = queryObject_1.method;
    ack.week = week_1.method;
    ack.month = month_1.method;
    ack.year = year_1.method;
    ack.date = date_1.method;
    ack.time = time_1.method;
    ack.method = method_1.method;
    return ack;
}(ack_1.ackExpose));
exports.ack = ack;
