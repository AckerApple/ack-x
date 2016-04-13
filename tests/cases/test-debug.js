"use strict";
var ack = require('../ack-x-dy').ack,
	assert = require('assert')

describe('ack.debug',function(){
	it('works',function(){
		var logger = ack.debug('ack:debug','test')
		assert.equal(typeof ack.debug.map, 'object')
		assert.equal(typeof ack.debug.map['ack:debug'], 'function')
	})
})