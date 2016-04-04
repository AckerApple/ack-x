"use strict";//this file only intended for web browsers. NodeJs use jN.js
var debugModule = require('debug')


var jc = require('./js/jc'),//old old old library for Classes and Accessors
		ackP = require('ack-p'),
		ackInjector = require('./ackInjector')


/** calling ack() as function, will return a module to work with almost any object */
function ack($var,$scope){
	return new ackClass($var,$scope)
}

//ack.modules = new ackInjector(ack)
ack.error = require('./js/error.js')
ack.number = require('./js/number.js')
ack.string = require('./js/String')
ack.binary = require('./js/Binary')
ack.base64 = require('./js/Base64')
ack.object = require('./js/Object')
ack.method = require('./js/method')
ack['function'] = require('./js/method')
ack.array = require('./js/Array')
ack.queryObject = require('./js/queryObject')
ack.week = require('./js/week')
ack.month = require('./js/month')
ack.year = require('./js/year')
ack.date = require('./js/date')

var indexSelector = require('./js/IndexSelector')

ack.indexSelector = function(){
	var $scope = {}
	if(arguments.length){
		$scope.indexes = arguments[0]
	}
	return new indexSelector($scope)
}

/** Organized debug logging. See npm debug for more information */
ack.debug = function debug(name, log0, log1, log2){
	var logger = debugModule(name)
	ack.debug.map[name] = logger//store memory of logger for meta referencing

	if(arguments.length>1){//logging intended to go with
		var args = Array.prototype.slice.call(arguments)
		args.shift()//remove first
		logger.apply(logger,args)
	}

	logger.debug = function(subname, log0, log1, log2){
		arguments[0] = name+':'+subname
		return ack.debug.apply(ack, arguments)
	}
	logger.sublog = logger.debug

	return logger
}

/* create storage of all loggers created */
	//global.ackDebugMap = global.ackDebugMap || {}
	//ack.debug.map = global.ackDebugMap
	var ackDebugMap = {}
	ack.debug.map = ackDebugMap
/* end */





ack.throwBy = function(ob, msg){
	if(ob){
		throw(ob)
	}else if(msg){
		throw new Error(msg)
	}else{
		throw new Error('An unexpected error has occured')
	}
}

ack.logArrayTo = function(array, logTo){
	logTo.apply(logTo, array)
}

ack.logError = function(err, msg, logTo){
	logTo = logTo || console.log

	var drray=[]

	if(msg==null && err && err.stack){//?no message
		msg = msg || err.stack.replace(/(\n|\t|\r)/g,'').split(/\s+at\s+/).shift()//error stack as message
	}

	if(msg!=null)drray.push(msg)
	if(err!=null)drray.push(err)

	ack.logErrorArray(drray, logTo)
}

/* hard-coded modules */
	ack['class'] = function(cl, extendOrAccessors, accessors){
		return new jc(cl, extendOrAccessors, accessors)
	}

	ack.accessors = function($scope){
		return new jc.Vm($scope)
	}

	ack.injector = function($scope){
		return new ackInjector($scope)
	}

	ack.promise = function(var0, var1, var2, var3){
		var promise = ackP.start()
		return promise.set.apply(promise,arguments)
	}
/* end: hard-coded modules */








function ackClass($var,$scope){
	this.$var = $var
	this.$scope = $scope || {}
	return this
}

ackClass.prototype.getSimpleClone = function(){
	var target = {}
	for (var i in this.$var){
		target[i] = this.$var[i]
	}
	return target;
}

//get at raw variable within target variable
ackClass.prototype.get = function(name,def){
	if(this.$var && this.$var[name]!=null)//try exact match first
		return this.$var[name]

	//case insensative search
	var lcase = name.toLowerCase()
	for(var key in this.$var){
		if(lcase == key.toLowerCase())
			return this.$var[key]
	}

	return def
}

//$var[name] returned as ack Object. When null, null returned
ackClass.prototype.byName = function(name){
	var v = this.get(name)
	if(v!=null)return ack(v)
}

ackClass.prototype['throw'] = function(msg, logTo){
	ack.logError(this.$var, msg, logTo)
	ack.throwBy(this.$var, msg)
	return this
}

ackClass.prototype.dump = function(){
	return JSON.stringify(this.$var)
}

/** negative numbers will be 0  */
ackClass.prototype.getBit = function(){
	var b = this.getBoolean()
	if(b && b.constructor==Number && b < 0){
		b=0
	}
	return b ? 1 : 0;
}

//!NON PROTOTYPED
ackClass.prototype.nullsToEmptyString = function(){
	for(var key in this.$var){
		if(this.$var[key]==null){
			this.$var[key]='';
		}
	}
	return this
}


ackClass.prototype.getBoolean = function(){
  if(this.$var==null || !this.$var.constructor)return false

  var a = this.$var

  if(a.constructor==String){
	a = a.toLowerCase()//makes TRUE:true and yes/no true
	if(a==='y' || a==='yes'){
		return true
	}
	if(a==='no' || a==='n'){
		return false
	}

    try{
      a = JSON.parse(a)
    }catch(e){
      return null
    }
  }

  if(a!=null && (a.constructor==Number || a.constructor==Boolean)){
	return a
  }

  return null
}

ackClass.prototype.isBooleanLike = function(){
  if(this.$var==null || !this.$var.constructor)return false
  return this.getBoolean()!==null
}


module.exports = ack