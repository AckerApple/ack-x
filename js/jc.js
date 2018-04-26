"use strict";
exports.__esModule = true;
function isF(f) {
    return typeof (f) == 'function';
}
exports.isF = isF;
//loops arrays(value,index,context) or objects(name,value,context)
function each(a, meth, context) {
    if (!a)
        return; //null abort
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
//assumptions: .data exists && keyName will be found in lowercase
function set(nameOrInitStruct, value) {
    if (typeof (nameOrInitStruct) == 'string') { //is arg1 name
        paramdata.call(this); //ensure this.data is defined
        var keyName = nameOrInitStruct; //nameOrInitStruct.toLowerCase()
        this.data[keyName] = value;
    }
    else {
        each(nameOrInitStruct, set, this); //arg1 is object||array
    }
    return this;
}
exports.set = set;
//very specific and tuned function to set variables using setMethods
function setByAccessor(nameOrInitStruct, value) {
    if (typeof (nameOrInitStruct) == 'string') {
        if (this['set' + nameOrInitStruct]) { //exact key case found
            this['set' + nameOrInitStruct].call(this, value);
            return this;
        }
        /* look at all keys for set function */
        var lCaseKey = nameOrInitStruct.toLowerCase();
        var mySetKey = 'set' + lCaseKey;
        for (var key in this)
            if (key.length == mySetKey.length && key.toLowerCase() == mySetKey) {
                this[key].call(this, value);
                return this;
            }
        //may require updating as they use implied scope (perhaps 3rd argument is $scope)
        paramdata.call(this);
        this.data[nameOrInitStruct] = value;
        //this.data[lCaseKey] = value
        /* end */
    }
    else
        each(nameOrInitStruct, setByAccessor, this); //arg1 is object||array
    return this;
}
exports.setByAccessor = setByAccessor;
function init($scope) {
    this.data = $scope == null ? {} : $scope;
    setByAccessor.call(this, $scope); //convert keys to case
    this.init = null;
    delete this.init; //self destruct init method
    return this;
}
exports.init = init;
//!!!!TODO:This should no longer param and just get the value regardless of null or anything else
function get(name, def, stick, nullop) {
    return param.call(this, name, def, stick, nullop);
}
exports.get = get;
function param(name, def, stick, nullop) {
    this.data = this.data != null ? this.data : {}; //param data scope
    if (typeof (this.data[name]) == 'undefined')
        var r = nullop ? nullop.call(this, def, stick) : runNullOp.call(this, name, def, stick);
    else {
        var r = this.data[name];
    }
    return r;
}
exports.param = param;
//if name-value undefined, return value based on defaulting defintiion
function runNullOp(name, def, stick, dM) {
    if (dM == null) {
        var dm = function () { }; //make dm reliable as always something
    }
    else if (isF(dM)) {
        var dm = dM; //dm is already function
    }
    else {
        var dm = function () { return dM; }; //dm will return a static value
    }
    var r = def == null ? dm["call"](this) : def;
    if ((stick == null || stick) && (r != null || this.data[name] != null)) {
        setByAccessor.call(this, name, r); //call this['set'+name] incase it has a preset
        //this.data[name.toLowerCase()] = r//this wont call this['set'+name]
    }
    return r;
}
exports.runNullOp = runNullOp;
//ValueMemory: Object for case-insensitive name/value pair management
var Vm = /** @class */ (function () {
    function Vm(args) {
        this.set = setByAccessor;
        this.get = function (name) {
            var r = get.apply(this, arguments);
            if (r != null)
                return r;
            var eName = this.defined(name);
            return this.data[eName];
        };
        /** deprecated name alias */
        this.getExactName = this.defined;
        //removes all case-insensative matching keys
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
    /** if name is defined, returns actual case sensative name */
    Vm.prototype.defined = function (name) {
        if (this.data[name] != null)
            return name;
        //get by lowercase keyname match
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
