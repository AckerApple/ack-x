"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = exports.ExString = void 0;
var ExString = (function () {
    function ExString(string) {
        this.string = string;
        return this;
    }
    ExString.prototype.isEmail = function () {
        return this.string.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) >= 0;
    };
    ExString.prototype.repeat = function (num) {
        var x, s = '';
        for (x = 0; x < num; ++x)
            s = s + this.string;
        return s;
    };
    ExString.prototype.htmlFormat = function () {
        var v = this.string;
        v = v.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return v;
    };
    ExString.prototype.toBase64 = function () {
        var e = this._utf8_encode();
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            }
            else if (isNaN(i)) {
                a = 64;
            }
            t = t + ExString._keyStr.charAt(s) + ExString._keyStr.charAt(o) + ExString._keyStr.charAt(u) + ExString._keyStr.charAt(a);
        }
        return t;
    };
    ExString.prototype._utf8_encode = function () {
        var e = this.string.replace ? this.string : this.string.toString();
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            }
            else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            }
            else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    };
    ExString.prototype.toHex = function (encType) {
        encType = encType || 'hex';
        return new exports.Buffer(this.string, encType).toString('hex');
    };
    ExString.prototype.toBinary = function (encType) {
        encType = encType || 'binary';
        return new exports.Buffer(this.string, encType);
    };
    ExString._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return ExString;
}());
exports.ExString = ExString;
function method(variable) {
    return new ExString(variable);
}
exports.method = method;
