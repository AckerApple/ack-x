"use strict";
var ack = require('../ack-x').ack,
	assert = require('assert')

describe('ack.accessors',function(){
	it('#objectify',function(){
    console.log('ack', ack)
		var x = ack.accessors({test:22, TEST:44})
		assert.equal(x.get('test'),22)
		assert.equal(x.get('TEST'),44)
		//added accessors & injector
	})
})