import { ackInjector } from "./ackInjector"
import { debug } from "debug"
import * as ackP from "ack-p"
import * as ackObject from "./object"

const partyModules = {
	ackP:ackP,
	debug:debug
}

/** calling ack() as function, will return a module to work with almost any object */
export function ack($var){
  return new ackExpose($var)
}

ack['modules'] = new ackInjector(ack)
ack['object'] = ackObject

ack['throwBy'] = function(ob, msg){
	if(ob){
		throw(ob)
	}else if(msg){
		throw new Error(msg)
	}else{
		throw new Error('An unexpected error has occured')
	}
}

ack['logArrayTo'] = function(array, logTo){
	logTo.apply(logTo, array)
}

ack['logError'] = function(err, msg, logTo){
	logTo = logTo || console.log

	var drray=[]

	if(msg==null && err && err.stack){//?no message
		msg = msg || err.stack.replace(/(\n|\t|\r)/g,'').split(/\s+at\s+/).shift()//error stack as message
	}

	if(msg!=null)drray.push(msg)
	if(err!=null)drray.push(err)

	ack['logErrorArray'](drray, logTo)
}

ack['injector'] = function($scope){
	return new ackInjector($scope)
}

ack['promise'] = function(var0, var1, var2, var3){
	var promise = ackP.start()
	return promise.set.apply(promise,arguments)
}

ack['Promise'] = function(resolver){
	return new ackP(resolver)
}

const ackDebugMap = {}//create storage of all loggers created
ack['debug'] = function debug(name, log0, log1, log2){
	var logger = partyModules.debug(name)
	ack['debug'].map[name] = logger//store memory of logger for meta referencing

	if(arguments.length>1){//logging intended to go with
		var args = Array.prototype.slice.call(arguments)
		args.shift()//remove first
		logger.apply(logger,args)
	}

	logger.debug = function(subname, log0, log1, log2){
		arguments[0] = name+':'+subname
		return ack['debug'].apply(ack, arguments)
	}
	logger.sublog = logger.debug

	return logger
}
ack['debug'].map = ackDebugMap//latch onto storage


export class ackExpose{
	$var:any

	//aka functions
	dump = ackExpose.prototype.stringify

	constructor($var){
		this.$var = $var
		return this
	}
	
	error(){return ack['error'](this.$var)}
	number(){return ack['number'](this.$var)}
	string(){return ack['string'](this.$var)}
	binary(){return ack['binary'](this.$var)}
	base64(){return ack['base64'](this.$var)}
	method(){return ack['method'](this.$var)}
	array(){return ack['array'](this.$var)}
	queryObject(){return ack['queryObject'](this.$var)}
	week(){return ack['week'](this.$var)}
	month(){return ack['month'](this.$var)}
	year(){return ack['year'](this.$var)}
	date(){return ack['date'](this.$var)}
	time(){return ack['time'](this.$var)}
	
	//deprecate
	function(){
		return ack['function'](this.$var)
	}
	
	getSimpleClone(){
		var target = {}
		for (var i in this.$var){
			target[i] = this.$var[i]
		}
		return target;
	}

	/** get at raw variable within target variable with case insensativity */
	get(name, def?){
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
	
	/** $var[name] returned as ack Object. When null, null returned */
	byName(name){
		var v = this.get(name)
		if( v!=null ){
			return ack(v)
		}
	}

	//deprecate this
	throw(msg, logTo){
		ack['logError'](this.$var, msg, logTo)
		ack['throwBy'](this.$var, msg)
		return this
	}

	/** JSON.stringify with default spacing=2 */
	stringify(spacing){
		spacing = spacing==null ? 2 : spacing
		return JSON.stringify(this.$var, null, spacing)
	}
	
	/** negative numbers will be 0  */
	getBit(){
		var b = this.getBoolean()
		if(b && b.constructor==Number && b < 0){
			b=0
		}
		return b ? 1 : 0;
	}

	nullsToEmptyString(){
		for(var key in this.$var){
			if(this.$var[key]==null){
				this.$var[key]='';
			}
		}
		return this
	}
	
	/** reduces variable to a true/false */
	getBoolean(){
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
	
	isBooleanLike(){
	  if(this.$var==null || !this.$var.constructor)return false
	  return this.getBoolean()!==null
	}
}