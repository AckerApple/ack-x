"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jXBinary = (function () {
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
