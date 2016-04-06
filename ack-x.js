"use strict";

var jc = require('./js/jc'),//old old old library for Classes and Accessors
		ackInjector = require('./ackInjector'),
		partyModules = {
			ackP:require('ack-p'), debug:require('debug')
		}

/** calling ack() as function, will return a module to work with almost any object */
function ack($var){
	return new ackExpose($var)
}

ack.Expose = ackExpose//Outsider's referense to expose factory

/* MODULES */
	ack.modules = new ackInjector(ack)

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
		var promise = partyModules.ackP.start()
		return promise.set.apply(promise,arguments)
	}

	ack.Promise = function(resolver){
		return new partyModules.ackP(resolver)
	}

	var indexSelector = require('./js/IndexSelector')
	ack.indexSelector = function(){
		var $scope = {}
		if(arguments.length){
			$scope.indexes = arguments[0]
		}
		return new indexSelector($scope)
	}

	/** Organized debug logging. See npm debug for more information */
	var ackDebugMap = {}//create storage of all loggers created
	ack.debug = function debug(name, log0, log1, log2){
		var logger = partyModules.debug(name)
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
	ack.debug.map = ackDebugMap//latch onto storage
/* END MODULES */

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







function ackExpose($var){
	this.$var = $var
	return this
}

ackExpose.prototype.error = function(){return ack.error(this.$var)}
ackExpose.prototype.number = function(){return ack.number(this.$var)}
ackExpose.prototype.string = function(){return ack.string(this.$var)}
ackExpose.prototype.binary = function(){return ack.binary(this.$var)}
ackExpose.prototype.base64 = function(){return ack.base64(this.$var)}
ackExpose.prototype.object = function(){return ack.object(this.$var)}
ackExpose.prototype.method = function(){return ack.method(this.$var)}
ackExpose.prototype['function'] = function(){return ack['function'](this.$var)}
ackExpose.prototype.array = function(){return ack.array(this.$var)}
ackExpose.prototype.queryObject = function(){return ack.queryObject(this.$var)}
ackExpose.prototype.week = function(){return ack.week(this.$var)}
ackExpose.prototype.month = function(){return ack.month(this.$var)}
ackExpose.prototype.year = function(){return ack.year(this.$var)}
ackExpose.prototype.date = function(){return ack.date(this.$var)}


ackExpose.prototype.getSimpleClone = function(){
	var target = {}
	for (var i in this.$var){
		target[i] = this.$var[i]
	}
	return target;
}

//get at raw variable within target variable
ackExpose.prototype.get = function(name,def){
	if(!name)return this.$var

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
ackExpose.prototype.byName = function(name){
	var v = this.get(name)
	if(v!=null)return ack(v)
}

ackExpose.prototype['throw'] = function(msg, logTo){
	ack.logError(this.$var, msg, logTo)
	ack.throwBy(this.$var, msg)
	return this
}

ackExpose.prototype.dump = function(){
	return JSON.stringify(this.$var)
}

/** negative numbers will be 0  */
ackExpose.prototype.getBit = function(){
	var b = this.getBoolean()
	if(b && b.constructor==Number && b < 0){
		b=0
	}
	return b ? 1 : 0;
}

//!NON PROTOTYPED
ackExpose.prototype.nullsToEmptyString = function(){
	for(var key in this.$var){
		if(this.$var[key]==null){
			this.$var[key]='';
		}
	}
	return this
}

/** reduces variable to a true/false */
ackExpose.prototype.getBoolean = function(){
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

ackExpose.prototype.isBooleanLike = function(){
  if(this.$var==null || !this.$var.constructor)return false
  return this.getBoolean()!==null
}


module.exports = ack