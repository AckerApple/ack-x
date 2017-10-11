"use strict";
exports.__esModule = true;
var jXBinary = /** @class */ (function () {
    function jXBinary(binary) {
        this.binary = binary;
        return this;
    }
    jXBinary.prototype.is = function () {
        return /^[01]+$/.test(this.binary);
    };
    return jXBinary;
}());
exports.jXBinary = jXBinary;
function method(path) {
    return new jXBinary(path);
}
exports.method = method;
