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
export { jXBinary };
export function method(path) {
    return new jXBinary(path);
}
