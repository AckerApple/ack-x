"use strict";
exports.__esModule = true;
var jXArray = /** @class */ (function () {
    function jXArray(array) {
        this.union = this.appendArray;
        this.array = array;
        return this;
    }
    /**
        Intended for high performance by looping an array only once but performing multiple actions.
        Run multiple functions for each iteration of an array.

        Example: array.each(countTeacher, countChild) instead of two loops array.each(countTeacher) + array.each(countChild)
    */
    jXArray.prototype.each = function (method0, method1, method2, method3) {
        if (!this.array)
            return this;
        for (var x = 0; x < this.array.length; ++x) {
            for (var a = 0; a < arguments.length; ++a) {
                arguments[a].call(null, this.array[x], x, this.array.length);
            }
            this.array[x];
        }
        return this;
    };
    /** reduce array down to only distinct items
        @method - optional, returned value is used to determine distinctness
    */
    jXArray.prototype.distinct = function (method) {
        if (!this.array)
            return this;
        var distincts = [];
        method = method || function (v) { return v; };
        for (var x = 0; x < this.array.length; ++x) {
            var a0 = this.array[x];
            var isDef = false;
            for (var xd = distincts.length - 1; xd >= 0; --xd) {
                var item = distincts[xd];
                if (method(a0) == method(item)) {
                    isDef = true;
                    break;
                }
            }
            if (!isDef)
                distincts.push(a0);
        }
        this.array = distincts;
        return this;
    };
    //pivets array of objects to object of arrays
    jXArray.prototype.objectify = function () {
        if (!this.array.length)
            return {};
        var x, n, s, r = {};
        s = this.array[0];
        for (n in s) {
            r[n] = [];
        }
        for (x = this.array.length - 1; x >= 0; --x) {
            s = this.array[x];
            for (n in s) {
                r[n].unshift(s[n]);
            }
        }
        return r;
    };
    //append an array's items onto the end of this array
    jXArray.prototype.appendArray = function () {
        //each argument maybe another array
        for (var argIn = 0; argIn < arguments.length; ++argIn) {
            var array = arguments[argIn];
            for (var aI = 0; aI < array.length; ++aI) {
                this.array.push(array[aI]);
            }
        }
        return this;
    };
    //prepend an array's items onto the front of this array
    jXArray.prototype.prependArray = function () {
        //each argument maybe another array
        for (var argIn = 0; argIn < arguments.length; ++argIn) {
            var array = arguments[argIn];
            for (var aI = array.length - 1; aI >= 0; --aI) {
                this.array.unshift(array[aI]);
            }
        }
        return this;
    };
    jXArray.prototype.reduce = function (method, initValue) {
        var x = 0;
        if (!initValue) {
            initValue = this.array[0];
            ++x;
        }
        for (; x < this.array.length; ++x) {
            initValue = method(initValue, this.array[x], x, this.array);
        }
        return initValue;
    };
    /** ads an array all up
        @method - optional. Returned value is used to sum
    */
    jXArray.prototype.sum = function (method) {
        return this.reduce(function (acc, val) { return acc + val; }, 0);
    };
    /** produces an average number using array of numbers
        @method - optional. Returned value is used to sum
    */
    jXArray.prototype.average = function (method) {
        var numArray = method ? this.map(method) : this.array;
        var map = new jXArray(numArray).map(function (c, i, arr) { return c / arr.length; });
        return new jXArray(map).reduce(function (p, c) { return p + c; });
    };
    jXArray.prototype.map = function (method) {
        var newArray = [];
        for (var x = 0; x < this.array.length; ++x) {
            newArray.push(method(this.array[x], x, this.array));
        }
        return newArray;
    };
    /** break an array into buckets of arrays
        @isIndexValue=false - when true, buckets of arrays will be corresponding index values back to original array
        @grouptype='sequence' - ('sequence'||'struct') . sequence, array of arrays = [ [],[],[] ] . struct = {value0:[buckets...], value1:[buckets...]}
    */
    jXArray.prototype.group = function (method, isIndexValue, grouptype) {
        method = method ? method : function (v) { return v; };
        grouptype = grouptype ? grouptype : 'sequence';
        isIndexValue = isIndexValue == null ? 0 : isIndexValue;
        var array = this.array;
        if (grouptype == 'struct') {
            var struct = {};
            for (var x = 0; x < array.length; ++x) {
                var a = array[x];
                var v = method(a);
                if (struct[v] == null)
                    struct[v] = [];
                struct[v].push(isIndexValue ? x : a);
            }
            return struct;
        }
        var rArray = [[]];
        var cVal = 0;
        for (var x = 0; x < array.length; ++x) {
            var a = array[x];
            var v = method(a);
            if (cVal != v && x > 1)
                rArray.push([]);
            cVal = v;
            rArray[rArray.length - 1].push(isIndexValue ? x : a);
        }
        return rArray;
    };
    return jXArray;
}());
exports.jXArray = jXArray;
function method(path) {
    return new jXArray(path);
}
exports.method = method;
