var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ackExpose } from "./ack";
import { method as errorMethod } from "./error";
import { method as numberMethod } from "./number";
import { method as stringMethod } from "./string";
import { method as binaryMethod } from "./binary";
import { method as base64Method } from "./base64";
import { method as objectMethod } from "./object";
import { method as arrayMethod } from "./array";
import { method as queryObjectMethod } from "./queryObject";
import { method as weekMethod } from "./week";
import { method as monthMethod } from "./month";
import { method as yearMethod } from "./year";
import { method as dateMethod } from "./date";
import { method as timeMethod } from "./time";
import { method as methodMethod } from "./method";
var ack = (function (_super) {
    __extends(ack, _super);
    function ack($var) {
        var _this = _super.call(this, $var) || this;
        _this.error = errorMethod;
        _this.number = numberMethod;
        _this.string = stringMethod;
        _this.binary = binaryMethod;
        _this.base64 = base64Method;
        _this.object = objectMethod;
        _this.array = arrayMethod;
        _this.queryObject = queryObjectMethod;
        _this.week = weekMethod;
        _this.month = monthMethod;
        _this.year = yearMethod;
        _this.date = dateMethod;
        _this.time = timeMethod;
        _this.method = methodMethod;
        if (!_this)
            return new ack($var);
        return _this;
    }
    ack.prototype.ackit = function (name) {
        return ack[name];
    };
    ack.error = errorMethod;
    ack.number = numberMethod;
    ack.string = stringMethod;
    ack.binary = binaryMethod;
    ack.base64 = base64Method;
    ack.object = objectMethod;
    ack.array = arrayMethod;
    ack.queryObject = queryObjectMethod;
    ack.week = weekMethod;
    ack.month = monthMethod;
    ack.year = yearMethod;
    ack.date = dateMethod;
    ack.time = timeMethod;
    ack.method = methodMethod;
    return ack;
}(ackExpose));
export { ack };
export default ack;
