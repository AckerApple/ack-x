"use strict";
exports.__esModule = true;
var jXMethod = /** @class */ (function () {
    function jXMethod(method, name) {
        this.method = method;
        this.name = name;
        return this;
    }
    /** sets a timeout and then runs set method in milsecs */
    jXMethod.prototype.runInMs = function (ms) {
        setTimeout(this.method, ms);
        return this;
    };
    /** returns array of argument names defined within set function */
    jXMethod.prototype.getArgNameArray = function () {
        var string = this.getDefinition();
        var argDef = /\(.+\)/.exec(string)[0];
        argDef = argDef.substring(1, argDef.length); //remove (
        argDef = argDef.substring(0, argDef.length - 1); //remove )
        argDef = argDef.replace(/\s|\t|\r|\n/g, '');
        return argDef.split(',');
    };
    /** get set functions inner definition */
    jXMethod.prototype.getDefinition = function () {
        var funcNameRegex = /(.*function[^\)]+\))/;
        var results = (funcNameRegex).exec(this.method.toString());
        return (results && results.length > 1) ? results[1] : null;
    };
    /** This is an option enhanced version of expectOne */
    jXMethod.prototype.expect = function (nameOrMap, value, requiredOrType, type) {
        if (nameOrMap && nameOrMap.constructor == String) {
            return this.expectOne(nameOrMap, value, requiredOrType, type);
        }
        for (var key in nameOrMap) {
            var define = nameOrMap[key];
            var val = define && (define.val !== null || define.value !== null);
            if (val) {
                val = define.val || define.value;
                this.expectOne(key, val, define.required, define.type);
            }
            else {
                this.expectOne(key, define, true);
            }
        }
        return this;
    };
    /** Build argument validation for when set function is invoked.
        @name - argument-name
        @value - runtime value argument-value
        @required
        @type - requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true
    */
    jXMethod.prototype.expectOne = function (name, value, requiredOrType, type) {
        var isReqDefined = requiredOrType != null && requiredOrType.constructor == Boolean;
        var isRequired = isReqDefined ? requiredOrType : true;
        type = type || (isReqDefined ? null : requiredOrType);
        if (isRequired && value == null) {
            var methodName = this.getName();
            var methodMsg = methodName ? 'The function ' + methodName + ' recieved an invalid argument. ' : '';
            var argTypeMsg = methodMsg + 'Argument ' + name + ' is required. ';
            var err = new Error(argTypeMsg + ' Function definition: ' + this.getDefinition());
            err["invalidArg"] = { errorType: 'undefined', name: name };
            throw err;
        }
        if (type) {
            if (value != null && value.constructor != type) {
                var methodName = this.getName();
                var methodMsg = methodName ? 'The function ' + methodName + ' recieved an invalid argument. ' : '';
                var argTypeMsg = methodMsg + 'Argument ' + name + ' is not of type ' + type.name + '. ';
                var err = new Error(argTypeMsg + 'Received type: ' + value.constructor.name + '. Function definition: ' + this.getDefinition());
                err["invalidArg"] = { errorType: 'type', name: name };
                throw err;
            }
        }
        return this;
    };
    /** for processing current arguments */
    /*arguments(args){
        return new jXArgs(this, args)
    }*/
    /** gets name of defined function */
    jXMethod.prototype.getName = function () {
        var name = this.name || (this.method.name.length ? this.method.name : null);
        return name || this.getOldSchoolName();
    };
    /** gets name of defined function */
    jXMethod.prototype.getOldSchoolName = function () {
        var funcNameRegex = /function\s+(.{1,})\(/;
        var results = (funcNameRegex).exec(this.method.toString());
        return this.name || ((results && results.length > 1) ? results[1] : null);
    };
    return jXMethod;
}());
exports.jXMethod = jXMethod;
function method(path) {
    return new jXMethod(path);
}
exports.method = method;
