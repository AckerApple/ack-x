"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ack = exports.ackExpose = exports.ackAppends = void 0;
var ackInjector_1 = require("./ackInjector");
var ackP = require("ack-p");
var ackObject = require("./object");
var error_1 = require("./error");
exports.ackAppends = {
    modules: new ackInjector_1.ackInjector(ack),
    object: ackObject,
    throwBy: function (ob, msg) {
        if (ob) {
            throw (ob);
        }
        else if (msg) {
            throw new Error(msg);
        }
        else {
            throw new Error('An unexpected error has occured');
        }
    },
    logArrayTo: function (array, logTo) {
        logTo.apply(logTo, array);
    },
    logError: function (err, msg, logTo) {
        logTo = logTo || console.log;
        var drray = [];
        if (msg == null && err && err.stack) {
            msg = msg || err.stack.replace(/(\n|\t|\r)/g, '').split(/\s+at\s+/).shift();
        }
        if (msg != null)
            drray.push(msg);
        if (err != null)
            drray.push(err);
        this.ackit('logErrorArray')(drray, logTo);
    },
    injector: function ($scope) {
        return new ackInjector_1.ackInjector($scope);
    },
    promise: function (var0, var1, var2, var3) {
        var promise = ackP.start();
        return promise.set.apply(promise, arguments);
    },
    Promise: function (resolver) {
        return new ackP(resolver);
    },
};
for (var x in exports.ackAppends) {
    ack[x] = exports.ackAppends[x];
}
var ackExpose = (function () {
    function ackExpose($var) {
        this.throwBy = exports.ackAppends.throwBy;
        this.logArrayTo = exports.ackAppends.logArrayTo;
        this.logError = exports.ackAppends.logError;
        this.injector = exports.ackAppends.injector;
        this.promise = exports.ackAppends.promise;
        this.Promise = exports.ackAppends.Promise;
        if (!this)
            return new ackExpose($var);
        this.$var = $var;
        return this;
    }
    ackExpose.prototype.ackit = function (name) {
        return ack[name];
    };
    ackExpose.ackit = function (name) {
        return ack[name];
    };
    ackExpose.prototype.ackGet = function (name) {
        return this.ackit(name)(this.$var);
    };
    ackExpose.prototype.error = function (v) { return new error_1.jError(v); };
    ackExpose.prototype.number = function (v) { return ackExpose.ackit('number')(v); };
    ackExpose.prototype.string = function (v) { return ackExpose.ackit('string')(v); };
    ackExpose.prototype.binary = function (v) { return ackExpose.ackit('binary')(v); };
    ackExpose.prototype.base64 = function (v) { return ackExpose.ackit('base64')(v); };
    ackExpose.prototype.method = function (v) { return ackExpose.ackit('method')(v); };
    ackExpose.prototype.array = function (v) { return ackExpose.ackit('array')(v); };
    ackExpose.prototype.queryObject = function (v) { return ackExpose.ackit('queryObject')(v); };
    ackExpose.prototype.week = function (v) { return ackExpose.ackit('week')(v); };
    ackExpose.prototype.month = function (v) { return ackExpose.ackit('month')(v); };
    ackExpose.prototype.year = function (v) { return ackExpose.ackit('year')(v); };
    ackExpose.prototype.date = function (v) { return ackExpose.ackit('date')(v); };
    ackExpose.prototype.time = function (v) { return ackExpose.ackit('time')(v); };
    ackExpose.prototype.function = function () {
        return this.ackGet('function');
    };
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
    ackExpose.prototype.byName = function (name) {
        var v = this.get(name);
        if (v != null) {
            return ack(v);
        }
    };
    ackExpose.prototype.throw = function (msg, logTo) {
        this.ackit('logError')(this.$var, msg, logTo);
        this.ackit('throwBy')(this.$var, msg);
        return this;
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
function ack($var) {
    return new ackExpose($var);
}
exports.ack = ack;
ack.error = ackExpose.prototype.error;
