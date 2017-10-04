"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.object',function(){
	it('map',function(){
		var res = ack.object({a:1,b:2,c:3}).map(function(item){return item*10})
		assert.equal(res.a, 10)
		assert.equal(res.b, 20)
		assert.equal(res.c, 30)
	})

	it('getTypeMap',function(){
		var v = {
			a:1,b:2,
			c:{
				c0:0,
				c1:'a string here'
			},
			agency:[{
				name:'My Agency'
			},{
				name:'Toast',
				email:'fake@aol.com',
				active:0
			}]
		}

		var res = ack.object(v).getTypeMap()
		
		assert.equal(res.a, 'number')
		assert.equal(res.b, 'number')
		assert.equal(res.c.constructor, Object)
		assert.equal(res.c.c0, 'number')
		assert.equal(res.c.c1, 'string')
		assert.equal(res.agency.constructor, Array)
		assert.equal(res.agency.length, 1)
		assert.equal(res.agency[0].constructor, Object)
		assert.equal(res.agency[0].name, 'string')
		assert.equal(res.agency[0].email, 'string')
		assert.equal(res.agency[0].active, 'number')
	})

	describe('exposed',function(){
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
})