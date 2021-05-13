export function method(errorObject) {
    return new jError(errorObject);
}
var jError = (function () {
    function jError(errorObject) {
        this.types = jErrorTypes;
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
    jError.prototype.getKeys = function () {
        return Object.getOwnPropertyNames(this.errorObject);
    };
    jError.prototype.getStackArray = function () {
        if (this.stackArray) {
            return this.stackArray;
        }
        if (this.errorObject.stack) {
            if (this.errorObject.stack.split) {
                this.stackArray = this.errorObject.stack.split(' at ');
            }
            else if (this.errorObject.stack.splice) {
                this.stackArray = this.errorObject.stack;
            }
            return this.stackArray;
        }
        return [];
    };
    jError.prototype.getTraceArray = function (amount) {
        var stackArray = [];
        stackArray.push.apply(stackArray, this.getStackArray());
        stackArray.shift();
        if (amount) {
            stackArray.splice(amount, stackArray.length);
        }
        return stackArray;
    };
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
    jError.prototype.cutFirstTrace = function () {
        var stackArray = this.getStackArray();
        if (stackArray && stackArray.length > 1) {
            stackArray.splice(1, 1);
            this.setStackArray(stackArray);
        }
        return this;
    };
    jError.prototype.getLineNum = function () {
        var string = this.getFirstTrace().split(':')[1];
        return Number(string);
    };
    jError.prototype.getFilePath = function () {
        var trace = this.getFirstTrace();
        var pathArray = trace.split(':');
        pathArray.pop();
        pathArray.pop();
        return pathArray.join(':').split('(').pop();
    };
    jError.prototype.getName = function () {
        if (this.errorObject.name)
            return this.errorObject.name;
        return this.getFailingObjectName();
    };
    jError.prototype.getFailingObjectName = function () {
        var trace = this.getFirstTrace();
        return trace.split(/\(|@/)[0].trim();
    };
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
export { jError };
export var jErrorTypes = {};
jErrorTypes.NotFound = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 404;
    this.code = "not_found";
    this.message = message || "Could Not Find Requested Resource";
};
jErrorTypes.NotFound.prototype = Object.create(Error.prototype);
jErrorTypes.notFound = function (message) {
    return new jErrorTypes.NotFound(message);
};
jErrorTypes.LocalNetworkRequired = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 403;
    this.code = "local_network_required";
    this.message = message || "Local Network Connection Required";
};
jErrorTypes.LocalNetworkRequired.prototype = Object.create(Error.prototype);
jErrorTypes.localNetworkRequired = function (message) {
    return new jErrorTypes.LocalNetworkRequired(message);
};
jErrorTypes.Unauthorized = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 401;
    this.code = "credentials_required";
    this.message = message || "No authorization token was found";
};
jErrorTypes.Unauthorized.prototype = Object.create(Error.prototype);
jErrorTypes.unauthorized = function (message) {
    return new jErrorTypes.Unauthorized(message);
};
jErrorTypes.BadRequest = function (message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 400;
    this.code = "bad_request";
    this.message = message || "Bad Request";
};
jErrorTypes.BadRequest.prototype = Object.create(Error.prototype);
jErrorTypes.badRequest = function (message) {
    return new jErrorTypes.BadRequest(message);
};
function MethodNotAllowed(message) {
    Error["captureStackTrace"](this, this.constructor);
    this.name = this.constructor.name;
    this.status = 405;
    this.code = "method_not_allowed";
    this.message = message || "Method Not Allowed";
}
jErrorTypes.MethodNotAllowed = MethodNotAllowed;
jErrorTypes.MethodNotAllowed.prototype = Object.create(Error.prototype);
jErrorTypes.methodNotAllowed = function (message) {
    return new MethodNotAllowed(message);
};
