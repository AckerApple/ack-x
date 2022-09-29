"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jXObject = exports.method = void 0;
function method(ob) {
    return new jXObject(ob);
}
exports.method = method;
var jXObject = (function () {
    function jXObject(object) {
        this.toCookieString = function () {
            var cookies = this.object;
            var cookieNameArray = Object.keys(cookies);
            if (cookieNameArray.length) {
                var cookieString = '';
                cookieNameArray.forEach(function (name, i) {
                    cookieString += '; ' + name + '=' + cookies[name];
                });
                cookieString = cookieString.substring(2, cookieString.length);
                return cookieString;
            }
            return '';
        };
        this.object = object;
        return this;
    }
    jXObject.prototype.forEach = function (method) {
        forEach(this.object, method);
        return this;
    };
    jXObject.prototype.assign = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        assign.apply(assign, __spreadArray([this.object], args, true));
        return this;
    };
    jXObject.prototype.deepAssign = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        deepAssign.apply(deepAssign, __spreadArray([this.object], args, true));
        return this;
    };
    jXObject.prototype.map = function (method) {
        return map(this.object, method);
    };
    jXObject.prototype.isArray = function () {
        return isArray(this.object);
    };
    jXObject.prototype.getTypeMap = function (mapper) {
        var type = typeof (this.object);
        var isObject = type == 'object';
        mapper = mapper || function (type, subs, name) {
            if (subs) {
                if (type == 'array')
                    return [subs];
                return subs;
            }
            return type;
        };
        if (!isObject)
            return mapper(type);
        var isArray = this.isArray();
        var uniqueMap = isArray ? [] : {};
        this.map(function (item, index, object) {
            if (item === null)
                return 'null';
            var subType = typeof (item);
            var isSubOb = subType == 'object';
            var jxSub = new jXObject(item);
            var isSubArray = isSubOb && jxSub.isArray();
            var subs = jxSub.getTypeMap(mapper);
            if (isArray) {
                if (isSubArray) {
                    subType = 'array';
                    uniqueMap[index] = mapper(subType, subs[0], index);
                }
                else if (isSubOb) {
                    if (!uniqueMap[0]) {
                        uniqueMap[0] = mapper(subType, subs, index);
                    }
                    else {
                        deepAssign(uniqueMap[0], mapper(subType, subs, index));
                    }
                }
            }
            else {
                if (isObject && isSubOb) {
                    if (isSubArray) {
                        subType = 'array';
                        uniqueMap[index] = mapper(subType, subs[0] || {}, index);
                    }
                    else {
                        uniqueMap[index] = uniqueMap[index] || {};
                        uniqueMap[index] = deepAssign(uniqueMap[index], mapper(subType, subs, index));
                    }
                }
                else {
                    uniqueMap[index] = mapper(subType, undefined, index);
                }
            }
        });
        return uniqueMap;
    };
    jXObject.prototype.isCyclic = function () {
        var seenObjects = [];
        function detect(obj) {
            if (obj && typeof obj === 'object') {
                if (seenObjects.indexOf(obj) !== -1) {
                    return true;
                }
                seenObjects.push(obj);
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && detect(obj[key])) {
                        return true;
                    }
                }
            }
            return false;
        }
        return detect(this.object);
    };
    return jXObject;
}());
exports.jXObject = jXObject;
function map(ob, method) {
    if (ob.constructor && ob.contructor == Array) {
        return mapArray(ob, method);
    }
    var res = {};
    for (var x in ob) {
        res[x] = method(ob[x], x, ob);
    }
    return res;
}
function mapArray(ob, method) {
    var res = [];
    for (var x = 0; x < ob.length; ++x) {
        res[x] = method(ob[x], x, ob);
    }
    return res;
}
function forEach(ob, method) {
    if (ob.constructor == Array) {
        for (var x in ob) {
            method(ob[x], x, ob);
        }
    }
    else {
        for (var x_1 = 0; x_1 < ob.length; ++x_1) {
            method(ob[x_1], x_1, ob);
        }
    }
    return ob;
}
function isArray(ob) {
    return ob.constructor && ob.constructor == Array;
}
function assign(target, firstSource) {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }
    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
            continue;
        }
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }
    return to;
}
function deepAssign(target, firstSource) {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }
    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
            continue;
        }
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
                if (nextSource[nextKey] != null && typeof (nextSource[nextKey]) == 'object') {
                    if (nextSource[nextKey].constructor == Array) {
                        to[nextKey] = duplicateArray(nextSource[nextKey]);
                    }
                    else {
                        to[nextKey] = to[nextKey] || {};
                        deepAssign(to[nextKey], nextSource[nextKey]);
                    }
                }
                else {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
function duplicateArray(a) {
    return a.map(function (v, i) {
        switch (typeof (v)) {
            case 'object': {
                if (v.constructor === Array) {
                    return duplicateArray(v);
                }
                return deepAssign({}, v);
            }
        }
        return v;
    });
}
