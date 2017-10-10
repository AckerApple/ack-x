"use strict";
exports.__esModule = true;
var ack_x_1 = require("./ack-x");
//export const ack:any = ackX
//ackX.modules.definePath('object','./js/object')
ack_x_1.ack.modules.definePath('error', './error');
ack_x_1.ack.modules.definePath('number', './number');
ack_x_1.ack.modules.definePath('string', './string');
ack_x_1.ack.modules.definePath('binary', './binary');
ack_x_1.ack.modules.definePath('base64', './base64');
ack_x_1.ack.modules.definePath('method', './method');
ack_x_1.ack.modules.definePath('array', './array');
ack_x_1.ack.modules.definePath('queryObject', './queryObject');
ack_x_1.ack.modules.definePath('week', './week');
ack_x_1.ack.modules.definePath('month', './month');
ack_x_1.ack.modules.definePath('year', './year');
ack_x_1.ack.modules.definePath('date', './date');
ack_x_1.ack.modules.definePath('time', './time');
ack_x_1.ack.modules.definePath('function', './function');
//ensure modules are loaded by a lazy require
ack_x_1.ack.modules.getModule = function (name, path) {
    if (this.$storage[name])
        return this.$storage[name];
    var r = require(path);
    // TODO: remove "|| r" once all is moved to Typescript and defaults are removed
    this.$storage[name] = r.method || r;
    return this.$storage[name];
};
exports.ack = ack_x_1.ack;
module.exports = exports.ack;
