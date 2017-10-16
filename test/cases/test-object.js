"use strict";
var ack = global.ack
var AckObject = require('../../js/object').jXObject
var assert = require('assert')

describe('ack.object',function(){
	it('map',function(){
		var res = ack.object({a:1,b:2,c:3}).map(function(item){return item*10})
		assert.equal(res.a, 10)
		assert.equal(res.b, 20)
		assert.equal(res.c, 30)
	})

	it('#assign',function(){
		var aOb = ack.object({}).assign({})
		assert.equal(aOb.constructor, AckObject)
		assert.equal(aOb.object.constructor, Object)
	})

	it('#deepAssign',function(){
		var aOb = ack.object({}).deepAssign({})
		assert.equal(aOb.constructor, AckObject)
		assert.equal(aOb.object.constructor, Object)
	})
	
	describe('#getTypeMap',function(){
		var v = {
			a:1,b:2,
			c:{
				c0:0,
				c1:'a string here'
			},
			agency:[{
				name:'My Agency',
				clock_in:1,
				clock_out:2,
				journals:[{
					note:'this be the best note'
				}]
			},{
				name:'Toast',
				email:'fake@aol.com',//only in this ob
				active:0,//only in this ob
				clock_in:1,
				journals:[]
			}]
		}

		it('default',function(){
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
			assert.equal(res.agency[0].clock_in, 'number')
			assert.equal(res.agency[0].clock_out, 'number')
		})

		it('mapped',function(){
			var res = ack.object(v).getTypeMap(function(type,subs,key){
				return {type:type,subs:subs,key:key}
			})

			assert.equal(typeof res.a, 'object')
			assert.equal(res.a.type, 'number')
			assert.equal(typeof res.b, 'object')
			assert.equal(res.b.type, 'number')
			assert.equal(typeof res.c, 'object')
			assert.equal(res.c.constructor, Object)

			assert.equal(typeof res.c.subs, 'object')
			assert.equal(res.c.type, 'object')
			assert.equal(typeof res.c.subs.c0, 'object')
			assert.equal(res.c.subs.c0.type, 'number')
			assert.equal(typeof res.c.subs.c1, 'object')
			assert.equal(res.c.subs.c1.type, 'string')
			
			assert.equal(res.agency.constructor, Object)
			assert.equal(res.agency.type, 'array')
			assert.equal(res.agency.subs.constructor, Object)
			assert.equal(res.agency.subs.type, 'object')
			assert.equal(typeof res.agency.subs.subs, 'object')

			assert.equal(typeof res.agency.subs.subs.name, 'object')
			assert.equal(res.agency.subs.subs.name.type, 'string')
			assert.equal(typeof res.agency.subs.subs.email, 'object')
			assert.equal(res.agency.subs.subs.email.type, 'string')
			assert.equal(typeof res.agency.subs.subs.active, 'object')
			assert.equal(res.agency.subs.subs.active.type, 'number')

			assert.equal(res.agency.subs.subs.clock_in.type, 'number')
			assert.equal(res.agency.subs.subs.clock_out.type, 'number')
			
			assert.equal(typeof res.agency.subs.subs.journals, 'object')
			assert.equal(res.agency.subs.subs.journals.type, 'array')
			assert.equal(typeof res.agency.subs.subs.journals.subs, 'object')
			assert.equal(typeof res.agency.subs.subs.journals.subs.subs, 'object')
			assert.equal(typeof res.agency.subs.subs.journals.subs.subs.note, 'object')
			assert.equal(res.agency.subs.subs.journals.subs.subs.note.type, 'string')
		})
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