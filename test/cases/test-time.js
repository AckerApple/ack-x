"use strict";
var ack = global.ack,//require('../ack-x-dy').ack,
	assert = require('assert')


describe('ack.time',function(){
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