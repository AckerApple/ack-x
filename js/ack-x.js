"use strict";
exports.__esModule = true;
var jc_1 = require("./jc");
//var jc = require('./js/jc'),//old old old library for Classes and Accessors
var ackInjector_1 = require("./ackInjector");
var ackP = require("ack-p");
var debug_1 = require("debug");
var ackObject = require("./object");
var ackExpose = /** @class */ (function () {
    function ackExpose($var) {
        //aka functions
        this.dump = ackExpose.prototype.stringify;
        /** $var[name] returned as ack Object. When null, null returned */
        this.byName = function (name) {
            var v = this.get(name);
            if (v != null)
                return exports.ack(v);
        };
        this.$var = $var;
        return this;
    }
    ackExpose.prototype.error = function () { return exports.ack.error(this.$var); };
    ackExpose.prototype.number = function () { return exports.ack.number(this.$var); };
    ackExpose.prototype.string = function () { return exports.ack.string(this.$var); };
    ackExpose.prototype.binary = function () { return exports.ack.binary(this.$var); };
    ackExpose.prototype.base64 = function () { return exports.ack.base64(this.$var); };
    ackExpose.prototype.method = function () { return exports.ack.method(this.$var); };
    ackExpose.prototype.array = function () { return exports.ack.array(this.$var); };
    ackExpose.prototype.queryObject = function () { return exports.ack.queryObject(this.$var); };
    ackExpose.prototype.week = function () { return exports.ack.week(this.$var); };
    ackExpose.prototype.month = function () { return exports.ack.month(this.$var); };
    ackExpose.prototype.year = function () { return exports.ack.year(this.$var); };
    ackExpose.prototype.date = function () { return exports.ack.date(this.$var); };
    ackExpose.prototype.time = function () { return exports.ack.time(this.$var); };
    //deprecate
    ackExpose.prototype["function"] = function () {
        return exports.ack['function'](this.$var);
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
        if (this.$var && this.$var[name] != null)
            return this.$var[name];
        //case insensative search
        var lcase = name.toLowerCase();
        for (var key in this.$var) {
            if (lcase == key.toLowerCase())
                return this.$var[key];
        }
        return def;
    };
    //deprecate this
    ackExpose.prototype["throw"] = function (msg, logTo) {
        exports.ack.logError(this.$var, msg, logTo);
        exports.ack.throwBy(this.$var, msg);
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
var partyModules = {
    ackP: ackP,
    debug: debug_1.debug
};
/** calling ack() as function, will return a module to work with almost any object */
exports.ack = function ($var) {
    return new ackExpose($var);
};
exports.ack.object = ackObject;
exports.ack.Expose = ackExpose; //Outsider's referense to expose factory
/* CORE MODULES */
exports.ack.modules = new ackInjector_1.ackInjector(exports.ack);
/*ack['class'] = function(cl, extendOrAccessors, accessors){
    return new jC(cl, extendOrAccessors, accessors)
}*/
exports.ack.accessors = function ($scope) {
    return new jc_1.Vm($scope);
};
exports.ack.injector = function ($scope) {
    return new ackInjector_1.ackInjector($scope);
};
exports.ack.promise = function (var0, var1, var2, var3) {
    var promise = ackP.start();
    return promise.set.apply(promise, arguments);
};
exports.ack.Promise = function (resolver) {
    return new ackP(resolver);
};
/* end: CORE MODULES */
/* end: MODULES */
/**
    - Organized debug logging that can be viewed ondemand by types of debug logging
    - See npm "debug" package for more information

    Basic Use Example
    ```
    ack.debug('my-app-name','item0','item1')
    ```

    Functional Example
    ```
    module.exports = ack.debug('my-app-name').debug
    ```
*/
var ackDebugMap = {}; //create storage of all loggers created
exports.ack.debug = function debug(name, log0, log1, log2) {
    var logger = partyModules.debug(name);
    exports.ack.debug.map[name] = logger; //store memory of logger for meta referencing
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments);
        args.shift(); //remove first
        logger.apply(logger, args);
    }
    logger.debug = function (subname, log0, log1, log2) {
        arguments[0] = name + ':' + subname;
        return exports.ack.debug.apply(exports.ack, arguments);
    };
    logger.sublog = logger.debug;
    return logger;
};
exports.ack.debug.map = ackDebugMap; //latch onto storage
/* END MODULES */
exports.ack.throwBy = function (ob, msg) {
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
exports.ack.logArrayTo = function (array, logTo) {
    logTo.apply(logTo, array);
};
exports.ack.logError = function (err, msg, logTo) {
    logTo = logTo || console.log;
    var drray = [];
    if (msg == null && err && err.stack) {
        msg = msg || err.stack.replace(/(\n|\t|\r)/g, '').split(/\s+at\s+/).shift(); //error stack as message
    }
    if (msg != null)
        drray.push(msg);
    if (err != null)
        drray.push(err);
    exports.ack.logErrorArray(drray, logTo);
};
