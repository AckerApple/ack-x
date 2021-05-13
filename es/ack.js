import { method as objectMethod } from "./object";
import { method as numberMethod } from "./number";
import { method as stringMethod } from "./string";
import { method as binaryMethod } from "./binary";
import { method as base64Method } from "./base64";
import { method as arrayMethod } from "./array";
import { method as queryObjectMethod } from "./queryObject";
import { method as weekMethod } from "./week";
import { method as monthMethod } from "./month";
import { method as yearMethod } from "./year";
import { method as dateMethod } from "./date";
import { method as timeMethod } from "./time";
import { method as methodMethod } from "./method";
import { ackInjector } from "./ackInjector";
import * as ackP from "ack-p";
import { jError } from "./error";
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
        return new ackInjector($scope);
    };
    ackExpose.promise = function (var0, var1, var2, var3) {
        var promise = ackP.start();
        return promise.set.apply(promise, arguments);
    };
    ackExpose.Promise = function (resolver) {
        return new ackP(resolver);
    };
    ackExpose.error = function (v) { return new jError(v); };
    ackExpose.number = function (v) { return numberMethod(v); };
    ackExpose.object = function (v) { return objectMethod(v); };
    ackExpose.string = function (v) { return stringMethod(v); };
    ackExpose.binary = function (v) { return binaryMethod(v); };
    ackExpose.base64 = function (v) { return base64Method(v); };
    ackExpose.method = function (v) { return methodMethod(v); };
    ackExpose.array = function (v) { return arrayMethod(v); };
    ackExpose.queryObject = function (v) { return queryObjectMethod(v); };
    ackExpose.week = function (v) { return weekMethod(v); };
    ackExpose.month = function (v) { return monthMethod(v); };
    ackExpose.year = function (v) { return yearMethod(v); };
    ackExpose.date = function (v) { return dateMethod(v); };
    ackExpose.time = function (v) { return timeMethod(v); };
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
export { ackExpose };
