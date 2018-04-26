"use strict";
exports.__esModule = true;
function method(errorObject) {
    return new jError(errorObject);
}
exports.method = method;
var jError = /** @class */ (function () {
    function jError(errorObject) {
        this.types = exports.jErrorTypes;
        this.errorObject = errorObject;
        return this;
    }
    jError.prototype.toObject = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(this.errorObject);
        var ob = {};
        keys.forEach(function (key) { return ob[key] = _this.errorObject[key]; });
        return ob;
    };
    /** returns all object keys of an error which is takes extra steps */
    jError.prototype.getKeys = function () {
        return Object.getOwnPropertyNames(this.errorObject);
    };
    /** converts error.stack into array via stack.split(' at ') */
    jError.prototype.getStackArray = function () {
        if (this.stackArray) {
            return this.stackArray;
        }
        if (this.errorObject.stack) {
            if (this.errorObject.stack.split) {
                this.stackArray = this.errorObject.stack.split(' at ');
            }
            else if (this.errorObject.stack.splice) { //?already an array?
                this.stackArray = this.errorObject.stack;
            }
            return this.stackArray;
        }
        return [];
    };
    /** dig out just the stack trace from error */
    jError.prototype.getTraceArray = function (amount) {
        var stackArray = [];
        stackArray.push.apply(stackArray, this.getStackArray());
        stackArray.shift();
        if (amount) {
            stackArray.splice(amount, stackArray.length);
        }
        return stackArray;
    };
    /** dig out only just the first trace of errors stack trace */
    jError.prototype.getFirstTrace = function (amount) {
        if (amount === void 0) { amount = 1; }
        var stackArray = this.getStackArray();
        if (!stackArray)
            return;
        if (stackArray.length == 1) {
            var rtn = [stackArray[0]];
        }
        else {
            var rtn = [];
            for (var i = 1; i <= stackArray.length && i <= amount; ++i) {
                rtn.push(stackArray[i]);
            }
        }
        return rtn.join(' at ');
    };
    jError.prototype.setStackArray = function (stackArray) {
        this.errorObject.stack = stackArray.join(' at ');
        this.stackArray = stackArray;
        return this;
    };
    /** analyzes stack to remove 1st trace (leaves error message in stack). Essentially calls .splice(1,1) on stack array  */
    jError.prototype.cutFirstTrace = function () {
        var stackArray = this.getStackArray();
        if (stackArray && stackArray.length > 1) {
            stackArray.splice(1, 1);
            this.setStackArray(stackArray);
        }
        return this;
    };
    /** attempt to extract a line number from the error */
    jError.prototype.getLineNum = function () {
        var string = this.getFirstTrace().split(':')[1];
        return Number(string);
    };
    /** attempt to extract a file path from the error */
    jError.prototype.getFilePath = function () {
        var trace = this.getFirstTrace();
        var pathArray = trace.split(':');
        pathArray.pop();
        pathArray.pop();
        return pathArray.join(':').split('(').pop();
    };
    /** attempt to extract the error's name */
    jError.prototype.getName = function () {
        if (this.errorObject.name)
            return this.errorObject.name;
        return this.getFailingObjectName();
    };
    /** attempt to extract the named function or code that is running */
    jError.prototype.getFailingObjectName = function () {
        var trace = this.getFirstTrace();
        return trace.split(/\(|@/)[0].trim();
    };
    /** get a message from the error even if it has no message */
    jError.prototype.getMessage = function () {
        if (this.errorObject.message)
            return this.errorObject.message;
        var fTrace = this.getFirstTrace();
        if (fTrace) {
            var fSpaceArray = fTrace.split(' ');
            if (fSpaceArray.length) {
                return fSpaceArray.splice(0, 1)[0];
            }
        }
        if (this.errorObject.constructor == String) {
            return this.errorObject;
        }
    };
    /** attempt to extract the error's type */
    jError.prototype.getType = function () {
        var isNamed = this.errorObject.name && this.errorObject.name.toLowerCase != null;
        var isCode = this.errorObject.code && this.errorObject.code.toLowerCase != null;
        if (isCode && this.errorObject.name == 'Error') {
            return this.errorObject.code;
        }
        if (isNamed) {
            return this.errorObject.name;
        }
    };
    /** attempt to compare error with another error or another type of an error */
    jError.prototype.isType = function (type) {
        if (this.errorObject == null)
            return false;
        if (this.errorObject.constructor && type == this.errorObject.constructor) {
            return true;
        }
        var eName = this.getType();
        if (eName && eName.toLowerCase() == type.toLowerCase()) {
            return true;
        }
        if (type.constructor == String) {
            if (this.errorObject.constructor == String) {
                return this.errorObject.toLowerCase() === type.toLowerCase();
            }
            var mess = this.getMessage();
            if (mess && type.toLowerCase() == mess.toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    return jError;
}());
exports.jError = jError;
exports.jErrorTypes = {};
exports.jErrorTypes.NotFound = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 404;
    this.code = "not_found";
    this.message = message || "Could Not Find Requested Resource";
};
exports.jErrorTypes.NotFound.prototype = Object.create(Error.prototype);
exports.jErrorTypes.notFound = function (message) {
    return new exports.jErrorTypes.NotFound(message);
};
exports.jErrorTypes.LocalNetworkRequired = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 403;
    this.code = "local_network_required";
    this.message = message || "Local Network Connection Required";
};
exports.jErrorTypes.LocalNetworkRequired.prototype = Object.create(Error.prototype);
exports.jErrorTypes.localNetworkRequired = function (message) {
    return new exports.jErrorTypes.LocalNetworkRequired(message);
};
exports.jErrorTypes.Unauthorized = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 401;
    this.code = "credentials_required";
    this.message = message || "No authorization token was found";
};
exports.jErrorTypes.Unauthorized.prototype = Object.create(Error.prototype);
exports.jErrorTypes.unauthorized = function (message) {
    return new exports.jErrorTypes.Unauthorized(message);
};
exports.jErrorTypes.BadRequest = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 400;
    this.code = "bad_request";
    this.message = message || "Bad Request";
};
exports.jErrorTypes.BadRequest.prototype = Object.create(Error.prototype);
exports.jErrorTypes.badRequest = function (message) {
    return new exports.jErrorTypes.BadRequest(message);
};
function MethodNotAllowed(message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 405;
    this.code = "method_not_allowed";
    this.message = message || "Method Not Allowed";
}
exports.jErrorTypes.MethodNotAllowed = MethodNotAllowed;
exports.jErrorTypes.MethodNotAllowed.prototype = Object.create(Error.prototype);
exports.jErrorTypes.methodNotAllowed = function (message) {
    return new MethodNotAllowed(message);
};
