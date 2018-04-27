import { ackInjector } from "./ackInjector"
import { debug } from "debug"
import * as ackP from "ack-p"
import * as ackObject from "./object"

/** calling ack() as function, will return a module to work with almost any object */
export function ack($var){
  return new ackExpose($var)
}

export const ackAppends = {
	modules : new ackInjector(ack),
	object : ackObject,
	
	throwBy : function(ob, msg){
		if(ob){
			throw(ob)
		}else if(msg){
			throw new Error(msg)
		}else{
			throw new Error('An unexpected error has occured')
		}
	},

	logArrayTo : function(array, logTo){
		logTo.apply(logTo, array)
	},

	logError : function(err, msg, logTo){
		logTo = logTo || console.log

		var drray=[]

		if(msg==null && err && err.stack){//?no message
			msg = msg || err.stack.replace(/(\n|\t|\r)/g,'').split(/\s+at\s+/).shift()//error stack as message
		}

		if(msg!=null)drray.push(msg)
		if(err!=null)drray.push(err)

		this.ackit('logErrorArray')(drray, logTo)
	},

	injector : function($scope){
		return new ackInjector($scope)
	},

	promise : function(var0, var1, var2, var3){
		var promise = ackP.start()
		return promise.set.apply(promise,arguments)
	},

	Promise : function(resolver){
		return new ackP(resolver)
	},
	
	debug : function(name, log0, log1, log2){
		var logger = debug(name)
		//this.map = this.map || {}
		//this.map[name] = logger//store memory of logger for meta referencing

		if(arguments.length>1){//logging intended to go with
			var args = Array.prototype.slice.call(arguments)
			args.shift()//remove first
			logger.apply(logger,args)
		}

		const temp = this
		logger.debug = function(subname, log0, log1, log2){
			arguments[0] = name+':'+subname
			return temp.ackit('debug').apply(ack, arguments)
		}
		logger.sublog = logger.debug

		return logger
	}

}

for(let x in ackAppends){
	ack[x] = ackAppends[x]
}

export class ackExpose{
	$var:any

	constructor($var){
		if(!this)return new ackExpose($var)
		this.$var = $var
		return this
	}

	public ackit(name){
		return ack[name]
	}
	
	static ackit(name){
		return ack[name]
	}

	ackGet(name){
		return this.ackit(name)(this.$var)
	}
	
	public static throwBy = ackAppends.throwBy
	public static logArrayTo = ackAppends.logArrayTo
	public static logError = ackAppends.logError
	public static injector = ackAppends.injector
	public static promise = ackAppends.promise
	public static Promise = ackAppends.Promise
	public static debug = ackAppends.debug
		
	public static error(v){return ackExpose.ackit('error')(v)}
	public static number(v){return ackExpose.ackit('number')(v)}
	public static string(v){return ackExpose.ackit('string')(v)}
	public static binary(v){return ackExpose.ackit('binary')(v)}
	public static base64(v){return ackExpose.ackit('base64')(v)}
	public static method(v){return ackExpose.ackit('method')(v)}
	public static array(v){return ackExpose.ackit('array')(v)}
	public static queryObject(v){return ackExpose.ackit('queryObject')(v)}
	public static week(v){return ackExpose.ackit('week')(v)}
	public static month(v){return ackExpose.ackit('month')(v)}
	public static year(v){return ackExpose.ackit('year')(v)}
	public static date(v){return ackExpose.ackit('date')(v)}
	public static time(v){return ackExpose.ackit('time')(v)}

	//deprecate
	function(){
		return this.ackGet('function')
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
		this.ackit('logError')(this.$var, msg, logTo)
		this.ackit('throwBy')(this.$var, msg)
		return this
	}

	/** JSON.stringify with default spacing=2 */
	stringify(spacing){
		spacing = spacing==null ? 2 : spacing
		return JSON.stringify(this.$var, null, spacing)
	}
	
	dump(spacing){
		return this.stringify(spacing)
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