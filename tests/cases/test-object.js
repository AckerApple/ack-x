"use strict";
var ack = require('../../index'),
	assert = require('assert')

describe('ack.object',function(){
	it('#isCyclic',function(){
		var a = {}
		var b = {}
		var c = {}

		a.b=b;b.a=a;

		assert.equal(ack.object(a).isCyclic(), true)
		assert.equal(ack.object(c).isCyclic(), false)
	})

	it('#toCookieString',function(){
		var cString = ack.object({test:22, likely:33}).toCookieString()
		assert.equal(cString, 'test=22; likely=33')
	})
})