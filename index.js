"use strict";
var ack = require('./ack-x')

ack.modules.error.definePath('error','./js/error')
ack.modules.number.definePath('number','./js/number')
ack.modules.string.definePath('string','./js/string')
ack.modules.binary.definePath('binary','./js/binary')
ack.modules.base64.definePath('base64','./js/base64')
ack.modules.object.definePath('object','./js/object')
ack.modules.method.definePath('method','./js/method')
ack.modules.array.definePath('array','./js/array')
ack.modules.queryObject.definePath('queryObject','./js/queryObject')
ack.modules.week.definePath('week','./js/week')
ack.modules.month.definePath('month','./js/month')
ack.modules.year.definePath('year','./js/year')
ack.modules.date.definePath('date','./js/date')
ack.modules.function.definePath('function','./js/function')

//ensure modules are loaded by a lazy require
ack.modules.getModule = function(name,path){
	if(this.$storage[name])return this.$storage[name]
	this.$storage[name] = require(path)
	return this.$storage[name]
}

module.exports = ack