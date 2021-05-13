// import { method as errorMethod } from "./error"
import { method as objectMethod } from "./object"
import { method as numberMethod } from "./number"
import { method as stringMethod } from "./string"
import { method as binaryMethod } from "./binary"
import { method as base64Method } from "./base64"
import { method as arrayMethod } from "./array"
import { method as queryObjectMethod } from "./queryObject"
import { method as weekMethod } from "./week"
import { method as monthMethod } from "./month"
import { method as yearMethod } from "./year"
import { method as dateMethod } from "./date"
import { method as timeMethod } from "./time"
import { method as methodMethod } from "./method"

import { ackInjector } from "./ackInjector"
// import { debug } from "debug/dist/debug.js"
import * as ackP from "ack-p"
// import * as ackObject from "./object"
import { jError } from "./error"

export class ackExpose {
	$var:any

	constructor($var){
		if(!this)return new ackExpose($var) // convert to class
		this.$var = $var
		return this
	}


	throwBy(ob, msg){
		if(ob){
			throw(ob)
		}else if(msg){
			throw new Error(msg)
		}else{
			throw new Error('An unexpected error has occured')
		}
	}

	logArrayTo(array, logTo) {
		logTo.apply(logTo, array)
	}

	/*logError(err, msg, logTo){
		logTo = logTo || console.log

		var drray=[]

		if(msg==null && err && err.stack){//?no message
			msg = msg || err.stack.replace(/(\n|\t|\r)/g,'').split(/\s+at\s+/).shift()//error stack as message
		}

		if(msg!=null)drray.push(msg)
		if(err!=null)drray.push(err)

		this.ackit('logErrorArray')(drray, logTo)
	}*/

	static injector($scope){
		return new ackInjector($scope)
	}

	static promise(var0?, var1?, var2?, var3?){
		var promise = ackP.start()
		return promise.set.apply(promise,arguments)
	}

	static Promise(resolver){
		return new ackP(resolver)
	}

	static error(v){return new jError(v)}
	static number(v){return numberMethod(v)}
	static object(v){return objectMethod(v)}
	static string(v){return stringMethod(v)}
	static binary(v){return binaryMethod(v)}
	static base64(v){return base64Method(v)}
	static method(v){return methodMethod(v)}
	static array(v){return arrayMethod(v)}
	static queryObject(v){return queryObjectMethod(v)}
	static week(v){return weekMethod(v)}
	static month(v){return monthMethod(v)}
	static year(v){return yearMethod(v)}
	static date(v){return dateMethod(v)}
	static time(v){return timeMethod(v)}

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
