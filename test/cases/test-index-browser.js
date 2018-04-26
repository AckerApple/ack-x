"use strict";

var assert = require('assert'),
    indexBrowser = require('../../js/index-browser').ack

describe('index-browser',function(){
  it('has-functions',function(){
    assert.equal(typeof indexBrowser.error, 'function')
    assert.equal(typeof indexBrowser.number, 'function')
    assert.equal(typeof indexBrowser.string, 'function')
    assert.equal(typeof indexBrowser.binary, 'function')
    assert.equal(typeof indexBrowser.base64, 'function')
    assert.equal(typeof indexBrowser.object, 'function')
    assert.equal(typeof indexBrowser.array, 'function')
    assert.equal(typeof indexBrowser.queryObject, 'function')
    assert.equal(typeof indexBrowser.week, 'function')
    assert.equal(typeof indexBrowser.month, 'function')
    assert.equal(typeof indexBrowser.year, 'function')
    assert.equal(typeof indexBrowser.date, 'function')
    assert.equal(typeof indexBrowser.time, 'function')
    assert.equal(typeof indexBrowser.method, 'function')
  })

  it('has-ack', function(){
    var d = indexBrowser( 0 ).date( 0 ).toUtc().date
    assert.equal(d.constructor, Date)
    assert.equal(d.getFullYear(), 1970)
  })
})