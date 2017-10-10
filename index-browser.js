"use strict";

var ack = require('./js/ack-x')

ack.error = require('./js/error.js')
ack.number = require('./js/number.js')
ack.string = require('./js/string')
ack.binary = require('./js/binary')
ack.base64 = require('./js/base64')
//ack.object = require('./js/Object')
ack.method = require('./js/method')
ack.array = require('./js/array')
ack.queryObject = require('./js/queryObject')
ack.week = require('./js/week').method
ack.month = require('./js/month').method
ack.year = require('./js/year').method
ack.date = require('./js/date').method
ack.time = require('./js/time').method
/*
ack.function = require('./js/method')
*/
ack['function'] = require('./js/method')

module.exports = ack