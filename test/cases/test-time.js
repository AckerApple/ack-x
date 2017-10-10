"use strict";
var ack = global.ack,//require('../ack-x-dy').ack,
	assert = require('assert')

//test was built in eastern time during daylight savings, need offset to account for that
var isDst = ack.date().now().isDst()
var wasDst = ack.date('2/12/2013').isDst()
var wasDst2 = ack.date('6/1/2016').isDst()
var bust = !isDst&&!wasDst2&&!wasDst2
var ts = new Date().getTimezoneOffset()
var diff = (ts-240)
var offset = diff - (isDst&&wasDst2 ? 0 : 60) + ((isDst&&wasDst2) || (!isDst&&wasDst2) ? 0 : 60)

if(bust)offset = offset - 60

describe('ack.time',function(){
	it('2016-04-18T21:48:00.000Z',function(){
		var ackDate = ack.time('2016-04-18T21:48:00.000Z')
		assert.equal(ackDate.date.getTime(), 1461016080000);
	})

	it('2016-04-19T07:58:00.000Z',function(){
		var ackDate = ack.time('2016-04-19T07:58:00.000Z');
		var clone = new Date(ackDate.date);
		var d2 = ack.date(clone).setTimeByString('2016-04-18T21:48:00.000Z')
		assert.equal(ackDate.dateMinuteDiff(d2.date), 830);
	})

	it('12:59 pm',function(){
		var ackDate = ack.time('12:00 pm');
		assert.equal(ackDate.hhmmtt(), '12:00 PM');
	})

	it('12:00 am',function(){
		var ackDate = ack.time('12:00 am');
		assert.equal(ackDate.hhmmtt(), '12:00 AM');
	})

	it('12:59 am',function(){
		var ackDate = ack.time('12:59 am');
		assert.equal(ackDate.hhmmtt(), '12:59 AM');
	})

	it('12:00 pm',function(){
		var ackDate = ack.time('12:00 pm');
		assert.equal(ackDate.hhmmtt(), '12:00 PM');
	})

	it('01:30 AM',function(){
		var ackDate = ack.time('1:30 am');
		assert.equal(ackDate.hhmmtt(), '01:30 AM');
	})

	it('01:30 PM',function(){
		var ackDate = ack.time('1:30 pm')
		assert.equal(ackDate.hhmmtt(), '01:30 PM');
	})

	it('13:30',function(){
		var ackDate = ack.time('13:30');
		assert.equal(ackDate.hhmmtt(), '01:30 PM')
	})
})