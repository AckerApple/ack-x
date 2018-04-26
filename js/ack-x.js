"use strict";
exports.__esModule = true;
var jc_1 = require("./jc");
var ack_1 = require("./ack");
exports.ack = ack_1.ack;
/* CORE MODULES */
exports.ack['modules'].definePath('error', './error');
exports.ack['modules'].definePath('number', './number');
exports.ack['modules'].definePath('string', './string');
exports.ack['modules'].definePath('binary', './binary');
exports.ack['modules'].definePath('base64', './base64');
exports.ack['modules'].definePath('method', './method');
exports.ack['modules'].definePath('array', './array');
exports.ack['modules'].definePath('object', './object');
exports.ack['modules'].definePath('queryObject', './queryObject');
exports.ack['modules'].definePath('week', './week');
exports.ack['modules'].definePath('month', './month');
exports.ack['modules'].definePath('year', './year');
exports.ack['modules'].definePath('date', './date');
exports.ack['modules'].definePath('time', './time');
exports.ack['modules'].definePath('function', './function');
exports.ack['modules'].getModule = function (name, path) {
    if (this.$storage[name])
        return this.$storage[name];
    var r = require(path);
    // TODO: remove "|| r" once all is moved to Typescript and defaults are removed
    this.$storage[name] = r.method || r;
    return this.$storage[name];
};
//deprecated
exports.ack['accessors'] = function ($scope) {
    return new jc_1.Vm($scope);
};
/* end: CORE MODULES */ 
