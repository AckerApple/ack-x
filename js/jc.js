"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vm = exports.runNullOp = exports.param = exports.get = exports.init = exports.setByAccessor = exports.set = exports.paramdata = exports.clear = exports.each = exports.isF = void 0;
function isF(f) {
    return typeof (f) == 'function';
}
exports.isF = isF;
function each(a, meth, context) {
    if (!a)
        return;
    if (a.constructor == Array) {
        var m = (context == null) ? meth : function (v, i) { meth.call(context, v, i); };
        for (var x = 0; x < a.length; ++x)
            m(a[x], x);
    }
    else {
        var m = (context == null) ? meth : function (n, v) { meth.call(context, n, v); };
        for (var n in a)
            m(n, a[n]);
    }
    return a;
}
exports.each = each;
function clear(s) {
    for (var x in s)
        delete s[x];
}
exports.clear = clear;
function paramdata() {
    if (this.data == null)
        this.data = {};
    return this;
}
exports.paramdata = paramdata;
function set(nameOrInitStruct, value) {
    if (typeof (nameOrInitStruct) == 'string') {
        paramdata.call(this);
        var keyName = nameOrInitStruct;
        this.data[keyName] = value;
    }
    else {
        each(nameOrInitStruct, set, this);
    }
    return this;
}
exports.set = set;
function setByAccessor(nameOrInitStruct, value) {
    if (typeof (nameOrInitStruct) == 'string') {
        if (this['set' + nameOrInitStruct]) {
            this['set' + nameOrInitStruct].call(this, value);
            return this;
        }
        var lCaseKey = nameOrInitStruct.toLowerCase();
        var mySetKey = 'set' + lCaseKey;
        for (var key in this)
            if (key.length == mySetKey.length && key.toLowerCase() == mySetKey) {
                this[key].call(this, value);
                return this;
            }
        paramdata.call(this);
        this.data[nameOrInitStruct] = value;
    }
    else
        each(nameOrInitStruct, setByAccessor, this);
    return this;
}
exports.setByAccessor = setByAccessor;
function init($scope) {
    this.data = $scope == null ? {} : $scope;
    setByAccessor.call(this, $scope);
    this.init = null;
    delete this.init;
    return this;
}
exports.init = init;
function get(name, def, stick, nullop) {
    return param.call(this, name, def, stick, nullop);
}
exports.get = get;
function param(name, def, stick, nullop) {
    this.data = this.data != null ? this.data : {};
    if (typeof (this.data[name]) == 'undefined')
        var r = nullop ? nullop.call(this, def, stick) : runNullOp.call(this, name, def, stick);
    else {
        var r = this.data[name];
    }
    return r;
}
exports.param = param;
function runNullOp(name, def, stick, dM) {
    if (dM == null) {
        var dm = function () { };
    }
    else if (isF(dM)) {
        var dm = dM;
    }
    else {
        var dm = function () { return dM; };
    }
    var r = def == null ? dm["call"](this) : def;
    if ((stick == null || stick) && (r != null || this.data[name] != null)) {
        setByAccessor.call(this, name, r);
    }
    return r;
}
exports.runNullOp = runNullOp;
var Vm = (function () {
    function Vm(args) {
        this.set = setByAccessor;
        this.get = function (name) {
            var r = get.apply(this, arguments);
            if (r != null)
                return r;
            var eName = this.defined(name);
            return this.data[eName];
        };
        this.getExactName = this.defined;
        this.remove = function (name) {
            var n = name.toLowerCase();
            for (var x in this.data) {
                if (x.toLowerCase() == n) {
                    this.data[x] = null;
                    delete this.data[x];
                }
            }
            return this;
        };
        this.clearVars = function () {
            clear(this.data);
            return this;
        };
        this.setNewData = function (value) {
            this.clearVars();
            set.call(this, value);
            return this;
        };
        return init.apply(this, arguments);
    }
    Vm.prototype.defined = function (name) {
        if (this.data[name] != null)
            return name;
        var n = name.toLowerCase();
        for (var x in this.data) {
            if (x.toLowerCase() == n) {
                return x;
            }
        }
    };
    Vm.prototype.param = function (name, def) {
        var r = this.get(name);
        if (r != null)
            return r;
        return param.apply(this, arguments);
    };
    return Vm;
}());
exports.Vm = Vm;
