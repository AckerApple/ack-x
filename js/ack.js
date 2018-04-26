"use strict";
exports.__esModule = true;
var ackInjector_1 = require("./ackInjector");
var debug_1 = require("debug");
var ackP = require("ack-p");
var ackObject = require("./object");
/** calling ack() as function, will return a module to work with almost any object */
function ack($var) {
    return new ackExpose($var);
}
exports.ack = ack;
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
        if (msg == null && err && err.stack) { //?no message
            msg = msg || err.stack.replace(/(\n|\t|\r)/g, '').split(/\s+at\s+/).shift(); //error stack as message
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
    debug: function (name, log0, log1, log2) {
        var logger = debug_1.debug(name);
        this.map = this.map || {};
        this.map[name] = logger; //store memory of logger for meta referencing
        if (arguments.length > 1) { //logging intended to go with
            var args = Array.prototype.slice.call(arguments);
            args.shift(); //remove first
            logger.apply(logger, args);
        }
        var temp = this;
        logger.debug = function (subname, log0, log1, log2) {
            arguments[0] = name + ':' + subname;
            return temp.ackit('debug').apply(ack, arguments);
        };
        logger.sublog = logger.debug;
        return logger;
    }
};
for (var x in exports.ackAppends) {
    ack[x] = exports.ackAppends[x];
}
var ackExpose = /** @class */ (function () {
    function ackExpose($var) {
        //aka functions
        this.dump = ackExpose.prototype.stringify;
        this.$var = $var;
        return this;
    }
    ackExpose.prototype.ackit = function (name) {
        return ack[name];
    };
    ackExpose.prototype.ackGet = function (name) {
        return this.ackit(name)(this.$var);
    };
    ackExpose.prototype.error = function () { return this.ackGet('error'); };
    ackExpose.prototype.number = function () { return this.ackGet('number'); };
    ackExpose.prototype.string = function () { return this.ackGet('string'); };
    ackExpose.prototype.binary = function () { return this.ackGet('binary'); };
    ackExpose.prototype.base64 = function () { return this.ackGet('base64'); };
    ackExpose.prototype.method = function () { return this.ackGet('method'); };
    ackExpose.prototype.array = function () { return this.ackGet('array'); };
    ackExpose.prototype.queryObject = function () { return this.ackGet('queryObject'); };
    ackExpose.prototype.week = function () { return this.ackGet('week'); };
    ackExpose.prototype.month = function () { return this.ackGet('month'); };
    ackExpose.prototype.year = function () { return this.ackGet('year'); };
    ackExpose.prototype.date = function () { return this.ackGet('date'); };
    ackExpose.prototype.time = function () { return this.ackGet('time'); };
    //deprecate
    ackExpose.prototype["function"] = function () {
        return this.ackGet('function');
    };
    ackExpose.prototype.getSimpleClone = function () {
        var target = {};
        for (var i in this.$var) {
            target[i] = this.$var[i];
        }
        return target;
    };
    /** get at raw variable within target variable with case insensativity */
    ackExpose.prototype.get = function (name, def) {
        if (!name)
            return this.$var;
        if (this.$var && this.$var[name] != null) //try exact match first
            return this.$var[name];
        //case insensative search
        var lcase = name.toLowerCase();
        for (var key in this.$var) {
            if (lcase == key.toLowerCase())
                return this.$var[key];
        }
        return def;
    };
    /** $var[name] returned as ack Object. When null, null returned */
    ackExpose.prototype.byName = function (name) {
        var v = this.get(name);
        if (v != null) {
            return ack(v);
        }
    };
    //deprecate this
    ackExpose.prototype["throw"] = function (msg, logTo) {
        this.ackit('logError')(this.$var, msg, logTo);
        this.ackit('throwBy')(this.$var, msg);
        return this;
    };
    /** JSON.stringify with default spacing=2 */
    ackExpose.prototype.stringify = function (spacing) {
        spacing = spacing == null ? 2 : spacing;
        return JSON.stringify(this.$var, null, spacing);
    };
    /** negative numbers will be 0  */
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
    /** reduces variable to a true/false */
    ackExpose.prototype.getBoolean = function () {
        if (this.$var == null || !this.$var.constructor)
            return false;
        var a = this.$var;
        if (a.constructor == String) {
            a = a.toLowerCase(); //makes TRUE:true and yes/no true
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
