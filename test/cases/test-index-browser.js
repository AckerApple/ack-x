"use strict";

var ack = global.ack,
    assert = require('assert'),
    indexBrowser = require('../../index-browser')

describe('index-browser',function(){
  it('has-functions',function(){
    assert.equal(typeof indexBrowser.error, 'function')
    assert.equal(typeof indexBrowser.number, 'function')
    assert.equal(typeof indexBrowser.string, 'function')
    assert.equal(typeof indexBrowser.binary, 'function')
    assert.equal(typeof indexBrowser.base64, 'function')
    //assert.equal(typeof indexBrowser.object, 'function')
    assert.equal(typeof indexBrowser.method, 'function')
    assert.equal(typeof indexBrowser.array, 'function')
    assert.equal(typeof indexBrowser.queryObject, 'function')
    assert.equal(typeof indexBrowser.week, 'function')
    assert.equal(typeof indexBrowser.month, 'function')
    assert.equal(typeof indexBrowser.year, 'function')
    assert.equal(typeof indexBrowser.date, 'function')
    assert.equal(typeof indexBrowser.time, 'function')
    assert.equal(typeof indexBrowser.function, 'function')
  })

  it('has-ack', function(){
    var d = ack( 0 ).date().date
    assert.equal(d.constructor, Date)
    assert.equal(d.getFullYear(), 1969)
  })
})