"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ackExpose = void 0;
var object_1 = require("./object");
var number_1 = require("./number");
var string_1 = require("./string");
var binary_1 = require("./binary");
var base64_1 = require("./base64");
var array_1 = require("./array");
var queryObject_1 = require("./queryObject");
var week_1 = require("./week");
var month_1 = require("./month");
var year_1 = require("./year");
var date_1 = require("./date");
var time_1 = require("./time");
var method_1 = require("./method");
var ackInjector_1 = require("./ackInjector");
var ackP = require("ack-p");
var error_1 = require("./error");
var ackExpose = (function () {
    function ackExpose($var) {
        if (!this)
            return new ackExpose($var);
        this.$var = $var;
        return this;
    }
    ackExpose.prototype.throwBy = function (ob, msg) {
        if (ob) {
            throw (ob);
        }
        else if (msg) {
            throw new Error(msg);
        }
        else {
            throw new Error('An unexpected error has occured');
        }
    };
    ackExpose.prototype.logArrayTo = function (array, logTo) {
        logTo.apply(logTo, array);
    };
    ackExpose.injector = function ($scope) {
        return new ackInjector_1.ackInjector($scope);
    };
    ackExpose.promise = function (var0, var1, var2, var3) {
        var promise = ackP.start();
        return promise.set.apply(promise, arguments);
    };
    ackExpose.Promise = function (resolver) {
        return new ackP(resolver);
    };
    ackExpose.error = function (v) { return new error_1.jError(v); };
    ackExpose.number = function (v) { return number_1.method(v); };
    ackExpose.object = function (v) { return object_1.method(v); };
    ackExpose.string = function (v) { return string_1.method(v); };
    ackExpose.binary = function (v) { return binary_1.method(v); };
    ackExpose.base64 = function (v) { return base64_1.method(v); };
    ackExpose.method = function (v) { return method_1.method(v); };
    ackExpose.array = function (v) { return array_1.method(v); };
    ackExpose.queryObject = function (v) { return queryObject_1.method(v); };
    ackExpose.week = function (v) { return week_1.method(v); };
    ackExpose.month = function (v) { return month_1.method(v); };
    ackExpose.year = function (v) { return year_1.method(v); };
    ackExpose.date = function (v) { return date_1.method(v); };
    ackExpose.time = function (v) { return time_1.method(v); };
    ackExpose.prototype.getSimpleClone = function () {
        var target = {};
        for (var i in this.$var) {
            target[i] = this.$var[i];
        }
        return target;
    };
    ackExpose.prototype.get = function (name, def) {
        if (!name)
            return this.$var;
        if (this.$var && this.$var[name] != null)
            return this.$var[name];
        var lcase = name.toLowerCase();
        for (var key in this.$var) {
            if (lcase == key.toLowerCase())
                return this.$var[key];
        }
        return def;
    };
    ackExpose.prototype.stringify = function (spacing) {
        spacing = spacing == null ? 2 : spacing;
        return JSON.stringify(this.$var, null, spacing);
    };
    ackExpose.prototype.dump = function (spacing) {
        return this.stringify(spacing);
    };
    ackExpose.prototype.getBit = function () {
        var b = this.getBoolean();
        if (b && b.constructor == Number && b < 0) {
            b = 0;
        }
        return b ? 1 : 0;
    };
    ackExpose.prototype.nullsToEmptyString = function () {
        for (var key in this.$var) {
            if (this.$var[key] == null) {
                this.$var[key] = '';
            }
        }
        return this;
    };
    ackExpose.prototype.getBoolean = function () {
        if (this.$var == null || !this.$var.constructor)
            return false;
        var a = this.$var;
        if (a.constructor == String) {
            a = a.toLowerCase();
            if (a === 'y' || a === 'yes') {
                return true;
            }
            if (a === 'no' || a === 'n') {
                return false;
            }
            try {
                a = JSON.parse(a);
            }
            catch (e) {
                return null;
            }
        }
        if (a != null && (a.constructor == Number || a.constructor == Boolean)) {
            return a;
        }
        return null;
    };
    ackExpose.prototype.isBooleanLike = function () {
        if (this.$var == null || !this.$var.constructor)
            return false;
        return this.getBoolean() !== null;
    };
    return ackExpose;
}());
exports.ackExpose = ackExpose;
