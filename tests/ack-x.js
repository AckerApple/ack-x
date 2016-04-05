/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jc = __webpack_require__(2),//old old old library for Classes and Accessors
			ackInjector = __webpack_require__(3),
			partyModules = __webpack_require__(4).modules

	/** calling ack() as function, will return a module to work with almost any object */
	function ack($var){
		return new ackExpose($var)
	}

	ack.Expose = ackExpose//Outsider's referense to expose factory

	/* MODULES */
		//ack.modules = new ackInjector(ack)
		ack.error = __webpack_require__(5)
		ack.number = __webpack_require__(6)
		ack.string = __webpack_require__(7)
		ack.binary = __webpack_require__(12)
		ack.base64 = __webpack_require__(13)
		ack.object = __webpack_require__(14)
		ack.method = __webpack_require__(15)
		ack['function'] = __webpack_require__(15)
		ack.array = __webpack_require__(16)
		ack.queryObject = __webpack_require__(17)
		ack.week = __webpack_require__(18)
		ack.month = __webpack_require__(19)
		ack.year = __webpack_require__(21)
		ack.date = __webpack_require__(20)

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

		var indexSelector = __webpack_require__(22)
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";

	//Entry point to accessors framework
	//argMap : 0:'init-function or accessor-map', 1:'extend-from or accessor-map', 2:'accessor-map'
	//accessor-map: if-string:'property-name' if-array:array-of-accessor-maps if-object:{keyname:defaultMethod || keyName:property-map || keyName:simple-value-default}
	//per-accessor-property-map:{preset:function-to-examine-a-set-call-to-return-what-to-actually-set, typeset:set-variable-must-be-constructor-of, default:funcForValue-or-value}
	function jC(initOrStruct, parentOrStruct, struct){
		initOrStruct = jC.$(initOrStruct, parentOrStruct, struct)
		var f = function f(){//function to add more accessor definitions
			initOrStruct.jC.prop.apply(initOrStruct.jC,arguments);
			return f
		}
		return f
	}

	//function controller for entry point
	jC.$ = function(initOrStruct, parentOrStruct, struct){
		//arg0 is struct
		if(initOrStruct!=null && !jC.isF(initOrStruct)){
			struct=initOrStruct;
			initOrStruct=null
		}

		//arg1 is struct
		if(parentOrStruct!=null && !jC.isF(parentOrStruct)){
			struct=parentOrStruct;
			parentOrStruct=null
		}

		if(initOrStruct==null)//provide constructor
			initOrStruct = function($scope){
				return jC.F.prototype.init.call(this,$scope)
			}//DONT function initOrStruct(){} AND DONT var initOrStruct = function initOrStruct(){} for IE8

		if(parentOrStruct==null)//provide parent constructor
			parentOrStruct = function(){/*jC*/}//DONT function parentOrStruct(){} AND DONT var parentOrStruct = function parentOrStruct(){} for IE8

		initOrStruct.jC = new jC.F(initOrStruct,parentOrStruct, struct)//return has jC reference

		return initOrStruct
	}

	//very specific and tuned function to set variables using setMethods
	jC.setByAccessor = function(nameOrInitStruct,value){//params data then sets a "set" method and calls it
		if(typeof(nameOrInitStruct)=='string'){
			if(this['set'+nameOrInitStruct]){//exact key case found
				this['set'+nameOrInitStruct].call(this,value)
				return this
			}

			/* look at all keys for set function */
				var lCaseKey = nameOrInitStruct.toLowerCase()
				var mySetKey = 'set'+lCaseKey
				for(var key in this)
					if(key.length==mySetKey.length && key.toLowerCase() == mySetKey){
						this[key].call(this,value)
						return this
					}

				//may require updating as they use implied scope (perhaps 3rd argument is $scope)
				jC.F.paramdata.call(this)
				this.data[nameOrInitStruct] = value
				//this.data[lCaseKey] = value
			/* end */
		}else
			jC.each(nameOrInitStruct,jC.setByAccessor,this)//arg1 is object||array

		return this
	}


	//Accessors building framework
	jC.F = function(C, parent , prop){//what is called to add accessors but ONCE AN OBJECT it becomes is the init and ONLY HAS 1 argument
		this.init.call(this)
		.setC(C)//set base Class aka main init method
		.setParent(parent)//inheritance

		//C.prototype = new parent//creates data scope and such cause it invokes init function
		for(var x in parent.prototype)C.prototype[x] = parent.prototype[x]

		//deprecate these, don't add methods to an object
		/*
		C.prototype.set = function(){//deprecated. Use self destructing init method
			console.log('jC: this.set is deprecated. Use self destructing method this.init or if you need this.set, have your class extend jC.Vm',arguments.callee.caller)
			return jC.setByAccessor.apply(this,arguments)
		}
		*/

		C.prototype.init = jC.F.prototype.init
		this.prop(prop)

		return this
	}

	jC.F.prototype.init = function($scope){//main function that creates data scope
		this.data = $scope==null ? {}:$scope
		jC.setByAccessor.call(this, $scope)//convert keys to case
		this.init = null;delete this.init//self destruct init method
		return this
	}

	jC.F.paramdata = function(){
		if(this.data==null)this.data={};return this
	}

	//assumptions: .data exists && keyName will be found in lowercase
	jC.F.set = function(nameOrInitStruct,value){
		if(typeof(nameOrInitStruct)=='string'){//is arg1 name
			jC.F.paramdata.call(this)//ensure this.data is defined
			var keyName = nameOrInitStruct//nameOrInitStruct.toLowerCase()
			this.data[keyName] = value
		}else{
			jC.each(nameOrInitStruct, jC.F.set, this)//arg1 is object||array
		}
		return this
	}

	jC.F.get = function(name,def,stick,nullop){//!!!!TODO:This should no longer param and just get the value regardless of null or anything else
		return jC.F.param.call(this,name,def,stick,nullop)
	}

	jC.F.param = function(name,def,stick,nullop){
		this.data = this.data!=null ? this.data : {}//param data scope
		if(typeof(this.data[name])=='undefined')
			var r = nullop ? nullop.call(this,def,stick) : jC.F.runNullOp.call(this,name,def,stick)
		else{
			var r = this.data[name]
		}

		return r
	}

	//returns set closured function
	jC.F.getSet = function(name,options){
		var useArray = []
			,keyName = options && options.as ? options.as : name
			,fireSet = function(v){
				jC.F.set.call(this,keyName,v);return this
			}

		if(options){
			if(options.typeset){
				useArray.push(function(v){
					if(v && v.constructor === options.typeset)
						return v

					var etn = jC.getMethodName(options.typeset)
						,oName = jC.getConName(this)
						,oOwnName = jC.getMethodName(options.original.owner)
						,msg = 'Invalid Constructor Passed to set'+options.original.name+'().'
					msg += ' ExpectTypeName:'+etn+'. GotTypeName:'+jC.getConName(v)+'. OwnerName:'+oName+'.'//details
					if(oName != oOwnName)//?original owner has changed?
						msg += ' OriginalOwnerName:'+oOwnName
					console.error(msg);
					return v
				})
			}

			if(options.preset)
				useArray.push(function(v){
					return options.preset.apply(this,arguments)
				})

			//options last action
			if(useArray.length)
				fireSet = function(v){
					for(var x=0; x < useArray.length; ++x)
						v = useArray[x].call(this,v)

					jC.F.set.call(this,keyName,v);return this
				}
		}


		return fireSet
	}

	//returns a get closured function
	jC.F.getGet = function(name, defOrDefFunc){
		var nullop = jC.F.getNullOp(name, defOrDefFunc)
		return function(def,stick){//!!!TODO:This function shouldn't try to param, just get
			var r = jC.F.get.call(this, name, def, stick, nullop);
			return r
		}
	}

	//returns function to call when no default avail
	jC.F.getNullOp = function(name, defOrDefFunc){
		return function(def,stick){
			return jC.F.runNullOp.call(this,name,def,stick,defOrDefFunc)
		}
	}

	//if name-value undefined, return value based on defaulting defintiion
	jC.F.runNullOp = function(name,def,stick,dM){
		if(dM==null)
			var dm=function(){}//make dm reliable as always something
		else if(jC.isF(dM))
			var dm = dM//dm is already function
		else
			var dm = function(){return dM}//dm will return a static value

		var r = def==null ? dm.call(this) : def

		if((stick==null || stick) && (r!=null || this.data[name]!=null)){
			jC.setByAccessor.call(this,name,r)//call this['set'+name] incase it has a preset
			//this.data[name.toLowerCase()] = r//this wont call this['set'+name]
		}

		return r
	}

	jC.F.prototype.set = jC.F.set//?deprecated
	jC.F.prototype.get = jC.F.get
	jC.F.prototype.param = jC.F.param
	jC.F.prototype.setC = jC.F.getSet('c')
	jC.F.prototype.getC = jC.F.getGet('c')
	jC.F.prototype.setParent = jC.F.getSet('parent')
	jC.F.prototype.getParent = jC.F.getGet('parent')

	jC.F.prototype.setter = function(name,config){
		var isSubDef = config && config.constructor==Object && config.constructor!=Array,
			method = jC.F.getSet(name, config),
			Cls = this.getC()


		name = name.substring(0, 1).toUpperCase()+name.substring(1, name.length)//first letter must be capital
		Cls.prototype['set'+name] = method

		if(isSubDef && config.setAka)
			Cls.prototype[config.setAka] = method

		return this
	}

	jC.F.prototype.getter = function(name, defOrDefFunc){
		var isSubDef = defOrDefFunc!=null && defOrDefFunc.constructor==Object && defOrDefFunc.constructor!=Array
			,def

		if(isSubDef){
			if(defOrDefFunc['default'] != null)
				def = defOrDefFunc['default']
		}else
			def = defOrDefFunc

		var keyName = defOrDefFunc && defOrDefFunc.as ? defOrDefFunc.as : name
			,method = jC.F.getGet(keyName, def)//sequence sensative
			,Cls=this.getC()

		name = name.substring(0, 1).toUpperCase()+name.substring(1, name.length)//first letter must be capital
		Cls.prototype['get'+name] = method

		if(isSubDef && defOrDefFunc.getAka)
			Cls.prototype[defOrDefFunc.getAka] = method

		return this
	}

	jC.F.prototype.prop = function(naOrStOrAr, defOrDefFunc){
		switch(typeof(naOrStOrAr)){
			case 'string'://create a setter/getter just based on name alond
				defOrDefFunc = defOrDefFunc==null ? {} : defOrDefFunc

				var typ = typeof(defOrDefFunc), typArray = ['number','boolean','string'];
				for(var x=typArray.length-1; x >= 0; --x){
					if(typArray[x] == typ){
						defOrDefFunc = {
							'default':defOrDefFunc,
							original:{owner:this.getC(), name:naOrStOrAr}//record Object metadata
						}
						break
					}
				}
				//below breaks in ie8
				//if(typArray.indexOf(typ) < 0)//ensure Object/Array/Function
				//	defOrDefFunc.original = {owner:this.getC(), name:naOrStOrAr}//record Object metadata

				return this.getter(naOrStOrAr, defOrDefFunc).setter(naOrStOrAr, defOrDefFunc)//name
			case 'undefined':
			case 'function':
				return this
		}

		if(naOrStOrAr.constructor == Array){//array of definitions
			for(var x=naOrStOrAr.length-1; x >= 0; --x)
				this.prop(naOrStOrAr[x])
		}else
			jC.each(naOrStOrAr,this.prop,this)

		return this
	}




	if(jC.name && jC.name==='jC')//device supports function.name
		jC.getMethodName = function(method){
			return method.name
		}
	else
		jC.getMethodName = function(method){
			var funcNameRegex = /function (.{1,})\(/;
			var results = (funcNameRegex).exec(method.toString())
			return (results && results.length > 1) ? results[1] : ""
		}

	if({}.constructor.name)//device supports new Function().constructor.name
		jC.getConName = function(obj){
			return obj.constructor.name
		}
	else
		jC.getConName = function(obj){
			return jC.getMethodName((obj).constructor)
		}

	jC.isF = function(f){
		return typeof(f)=='function'
	}

	jC.clear = function(s){
		for(var x in s)delete s[x]
	}


	//loops arrays(value,index,context) or objects(name,value,context)
	jC.each = function(a,meth,context){
		if(!a)return;//null abort
		if(a.constructor==Array){
			var m=(context==null) ? meth : function(v,i){meth.call(context,v,i)}
			for(var x=0;x<a.length;++x)m(a[x],x)
		}else{
			var m=(context==null) ? meth : function(n,v){meth.call(context,n,v)}
			for(var n in a)m(n,a[n])
		}return a
	}








	//ValueMemory: Object for case-insensitive name/value pair management
	jC.Vm = function Vm(a){
		return this.init.apply(this,arguments)
	}
	jC(jC.Vm)//?maybe deprecated with no get/set/param methods

	jC.Vm.prototype.set = jC.setByAccessor
	jC.Vm.prototype.get = function(name){
		var r = jC.F.get.apply(this,arguments)
		if(r!=null)return r

		var eName = this.defined(name)
		return this.data[eName]

	}

	/** if name is defined, returns actual case sensative name */
	jC.Vm.prototype.defined = function(name){
		if(this.data[name]!=null)return name

		//get by lowercase keyname match
		var n = name.toLowerCase()
		for(var x in this.data){
			if(x.toLowerCase()==n){
				return x
			}
		}
	}
	/** deprecated name alias */
	jC.Vm.prototype.getExactName = jC.Vm.prototype.defined

	jC.Vm.prototype.param = function(name,def){
		var r = this.get(name)
		if(r!=null)return r
		return jC.F.param.apply(this,arguments)
	}

	//removes all case-insensative matching keys
	jC.Vm.prototype.remove = function(name){
		var n = name.toLowerCase()
		for(var x in this.data){
			if(x.toLowerCase()==n){
				this.data[x] = null;delete this.data[x];
			}
		}
		return this
	}

	jC.Vm.prototype.clearVars = function(){
		jC.clear(this.data);return this
	}

	jC.Vm.prototype.setNewData=function(value){
		this.clearVars()
		jC.F.set.call(this,value);return this
	}










	if(true){
		module.exports=jC
		module.exports.__dirname = __dirname
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var ackInjector = function ackInjector($scope, $storage){
	  this.$storage = $storage || {}
	  this.$scope = $scope || this
	  return this
	}

	ackInjector.prototype.define = function(name, $module, initInjectArray){
	  var $this = this
	  var method = function(){
	    return $this.LoadModule(name, $module, arguments, initInjectArray)
	  }

	  this.$scope[name] = method//this.functionName . example: ack.mail()
	  return this
	}

	ackInjector.prototype.definePath = function(name,path,initInjectArray){
	  var $this = this
	  var fetcher = function(){
	    var $module = $this.getModule(name, path)
	    return $this.LoadModule(name, $module, arguments, initInjectArray)
	  }

	  this.$scope[name] = fetcher//this.functionName . example: ack.mail()
	  return this
	}

	ackInjector.prototype.LoadModule = function(name, $module, $args, injectArray){
	  if($module.constructor!=Function){
	    return $module
	  }

	  if(!injectArray){
	    var r = $module.apply($module, $args)//no dependencies
	    return r
	  }

	  var isInjectInit = typeof(injectArray)=='function',
	    init = isInjectInit ? injectArray : injectArray[injectArray.length-1],
	    args = []

	  if(!isInjectInit){
	    var tar
	    for(var i=0; i < injectArray.length-1; ++i){//all but last, last was init
	      switch(injectArray[i].toLowerCase()){
	        case '$arg0':
	          tar = $args[0]
	          break;

	        case '$injector':
	          tar = this.$scope//this
	          break;

	        case '$module':
	          tar = $module
	          break;

	        case '$args':
	          tar = Array.prototype.slice.call($args)
	          break;


	        default:
	          if(this.$scope[injectArray[i]]!=null){
	            tar = this.$scope[injectArray[i]]
	          }else if(this.$storage[injectArray[i]] != null){
	            tar = this.$storage[injectArray[i]]
	          }
	      }
	      args.push(tar)
	    }
	  }

	  args = args.concat(Array.prototype.slice.call($args))

	  if(typeof(init)=='string'){//last arg is module to return
	    switch(init){
	      case '$module':
	        return $module.apply($module, args)
	        break;

	      default:
	        throw 'should not get here. Last argument of injector was not a function NOR "$module"';
	        return $module.apply(this.$scope[init], args)
	    }
	  }
	  return init.apply(init, args)
	}

	ackInjector.prototype.getModule = function(name,path){
	  if(this.$storage[name])return this.$storage[name]
	  throw new Error('Module not defined ('+name+'). Valid modules: "'+ Object.keys(this.$storage).join(',')+'"')
	}

	ackInjector.prototype.newModule = function(name,path,arg){
	  var Module = this.getModule(name,path)
	  return new Module(arg)
	}


	module.exports = ackInjector

/***/ },
/* 4 */
/***/ function(module, exports) {

	this.modules=function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports={ackP:r(1),debug:r(2)}},function(t,e,r){"use strict";function n(t){var e,r=[];for(e in t)r.push(e);return r}function o(t){function e(){return n.resolve.apply(n,arguments)}function r(){return n["throw"].apply(n,arguments)}var n=new a;return t(e,r)}function a(){return this._promise0=!0,this.data={waiting:0},this.processor()}function s(t){var e=[];for(var r in t)t[r]&&t[r].constructor&&t[r].constructor==Function&&e.push(r);return e.join(",")}var i=function(t,e){return t&&t.then&&t!=e};o.resolve=function(t,e,r,n){var o=new a;return o=o.set.apply(o,arguments)},o.start=function(){return new a},o.method=function(t){return function(){var e=new o.start;return e.set.apply(e,arguments).then(t)}},o.getErrorType=function(t){var e=t.name&&null!=t.name.toLowerCase,r=t.code&&null!=t.code.toLowerCase;return r&&"Error"==t.name?t.code:e?t.name:void 0},o.isErrorType=function(t,e){if(null==t)return!1;if(t.constructor&&e==t.constructor)return!0;var r=o.getErrorType(t);return!(!r||r.toLowerCase()!=e.toLowerCase())},o.callback4callback=function(t,e,r){return function(){var n=Array.prototype.slice.call(arguments),a=n.pop(),s=o.getNextCallback(a,e);t.length?n[t.length-1]=s:n.push(s),t.apply(r||this,n)}},o.createIf=function(t,e,r,n,o){o=null==o?!0:o;var a=e&&e.constructor&&e.constructor==Function;if(a)var s=function(t,r,n){r.call(n,e.apply(n,t))};else var s=function(t,r,n){var o=t[0]===e;r.call(n,o)};var i=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();s(t,function(r){var a=o&&1==r||!o&&0==r;a?n.call(this,t,e):e.apply(e,t)},this)};return t.next(i,r)},o.getNextCallback=function(t,e){return function(){if(null!=arguments[0])return e["throw"].call(e,arguments[0]);var r=Array.prototype.slice.call(arguments);r.shift(),t.apply(t,r)}},a.prototype.processor=function(){if(this.values=Array.prototype.slice.call(arguments),this.data&&this.data.task){var t={args:Array.prototype.slice.call(arguments)},e=this.data.task,r=e.context||this.data.context||this.nextContext||this;this.data.waiting=1;var n=this;if(e.isAsync===!0){var o=0===e.method.length?-1:e.method.length-1,a=function(){var t=Array.prototype.slice.call(arguments),r=function(){if(n.inpass){if(--n.inpass.count,n.inpass.count>0)return;return n.inpass.lastProm.runNextPromise()}return n.runNextPromise()};arguments.length&&i(arguments[0],n)?n.runSubPromise(arguments[0],e,t).then(r):(e&&!e.isPass&&(n.values=t),r())};a["throw"]=function(){return n["throw"].apply(n,arguments)},o>=0?t.args[o]=a:t.args.push(a)}e.isPass===!0&&(e.isAsync===!0&&(this.inpass?++this.inpass.count:this.inpass={count:1}),this.inpass&&(this.inpass.lastProm=this));try{var s=e.method.apply(r,t.args)}catch(c){if(c.constructor==String){var u=c;c=new Error(c),c.name=u}!c.code&&c.message&&(c.code=c.message);try{c.method=e.method}catch(c){}return void this["throw"].call(this,c)}if(e.isPass===!0)return this.runNextPromise();if(e.isAsync!==!0){if(i(s,this))return this.runSubPromise(s,e).then(function(){n.runNextPromise()});if(this.data){if(null!=this.inpass&&(this.inpass.count=null,this.inpass.lastProm=null,this.inpass=null),s==this||null==s&&"undefined"==typeof s?this.values=null:this.values=[s],null!=this.data.getNextPromise)return this.runNextPromise();this.data.waiting=0,this.clearMem()}}}},a.prototype.runSubPromise=function(t,e){var r=this,n=function(){e&&!e.isPass&&(r.values=Array.prototype.slice.call(arguments))};return t=t.then(n)["catch"](function(t){r["throw"].call(r,t)})},a.prototype.runNextPromise=function(){return this._rejected?void 0:this.values&&this.values.length?this.runNextPromiseWithValueArray(this.values):this.runNextPromiseWithValueArray()},a.prototype.runNextPromiseWithValueArray=function(t){if(this.data){var e=this.data.getNextPromise?this.data.getNextPromise():null;if(!e)return void(this.data.waiting=0);if(!(this.inpass&&this.inpass.count&&e.data&&e.data.task)||e.data.task.isPass){e.data.waiting=-1,e.nextContext=e.nextContext||this.nextContext,e.data.context=e.data.context||this.nextContext,e.inpass=this.inpass,this.clearMem(),this.nextContext=null;var r=e.processor.apply(e,t);return r}}},a.prototype.runCatch=function(t,e){var r=e.call(this.nextContext||this,t);if(i(r)){var n=this;return r.then(function(){n.runNextPromiseWithValueArray(Array.prototype.slice.call(arguments))})}var o=[];null!==r&&o.push(r),this.values=o;var a=this.runNextPromiseWithValueArray(o);return this.clearMem(),a},a.prototype.getLastPromise=function(){return this.data&&this.data.getNextPromise?this.data.getNextPromise().getLastPromise():this},a.prototype["catch"]=function(t,e){var r=this.next(function(){var t=Array.prototype.slice.call(arguments),e=t.pop();e.apply(this,t)});if(r._rejected=null,this.catchers=this.catchers||{},e)switch(typeof t){case"string":var n=t.toLowerCase();this.catchers["catch"+n]=e,this._rejected&&!this._rejectedCaught&&o.isErrorType(this._rejected,n)&&(this._rejectedCaught=!0,this.runCatch(this._rejected,e));break;default:this.catchers.catch_type_array=this.catchers.catch_type_array||[],this.catchers.catch_type_array.push({method:e,type:t}),this._rejected&&!this._rejectedCaught&&o.isErrorType(this._rejected,t)&&(this._rejectedCaught=!0,this.runCatch(this._rejected,e))}else e=t,this.catchers.catchAll=t,this._rejected&&!this._rejectedCaught&&(this._rejectedCaught=!0,this.runCatch(this._rejected,e));return this._rejected&&!this._rejectedCaught&&(r._rejected=this._rejected,c&&(this.then=a.rejectedThen)),r},a.prototype.caught=a.prototype["catch"],a.prototype["if"]=function(t,e,r){return o.createIf(this,t,r,function(t,r){var n=e.apply(this,t);r.call(r,n)})},a.prototype.ifNot=function(t,e,r){var n=function(t,r){var n=e.apply(this,t);r.call(r,n)};return o.createIf(this,t,r,n,!1)},a.prototype.ifNext=function(t,e,r){var n=function(t,r){e.length?t[e.length-1]=r:t.push(r),e.apply(this,t)};return o.createIf(this,t,r,n)},a.prototype.ifCallback=function(t,e,r){return o.createIf(this,t,r,function(t,r){var n=o.getNextCallback(r,this);e.length?t[e.length-1]=n:t.push(n),e.apply(this,t)})},a.prototype.getNewData=function(){return{waiting:0}},a.prototype.paramData=function(){return this.data=this.data||this.getNewData(),this},a.prototype.setNextPromise=function(t){return this.data.getNextPromise=function(){return t},t.nextContext=this.nextContext,this._rejected&&(t._rejected=this._rejected,c&&(t.then=a.rejectedThen)),t},a.prototype.add=function(t){if(null==t.method){this["throw"].call(this,"promise task undefined");var e=new Error("promise task undefined");throw e.name="promise task undefined",e}if(this.paramData(),i(t.method)){var r=t.method;t.method=function(){return r};var n=o.start().add(t);return this.setNextPromise(n)}if(this.data.getNextPromise)return this.data.getNextPromise().add(t);if(this.data.task){var a=o.start();return this.setNextPromise(a),a.data.waiting=1,a.add(t),0==this.data.waiting&&this.runNextPromise(),a}return this.data.task=t,0===this.data.waiting&&this.processor.apply(this,this.values),this},a.prototype.pass=function(t,e){return this.add({method:t,context:e,isPass:!0,isAsync:!0})},a.prototype.call=function(t){var e=Array.prototype.slice.call(arguments);return e.shift(),this.then(function(){if(arguments.length&&arguments[0][t])return arguments[0][t].apply(arguments[0],e);var r='promise.call "'+t+'" is not a function.';arguments.length&&(r+=" Function list: "+s(arguments[0]));var n=new Error(r);throw n.name="not-a-function",n})},a.prototype.bindCall=function(t){var e=Array.prototype.slice.call(arguments);return e.shift(),this.then(function(){if(this[t])return this[t].apply(this,e);var r='promise.bindCall "'+t+'" is not a function.';r+=" Function list: "+s(this);var n=new Error(r);throw n.name="not-a-function",n})},a.prototype.bindResult=function(){return this.then(function(t){return this.bind(t),o.start().set(Array.prototype.slice.call(arguments)).spread()})},a.prototype.bind=function(t){if(t!=this&&i(t)){var e={};return this.then(function(){e.result=Array.prototype.slice.call(arguments)}).then(t).bindResult().set(e).get("result").spread()}return this.paramData(),this.data.task||(this.data.context=t),this.nextContext=t,this},a.prototype.singleGet=function(t){return!isNaN(t)&&0>t?this.then(function(e){return e&&e.constructor==Array?e[e.length+t]:e[t]}):this.then(function(e){return e[t]})},a.prototype.get=function(){for(var t=Array.prototype.slice.call(arguments),e=this,r=0;r<t.length;++r)e=e.singleGet(t[r]);return e},a.prototype.set=function(){var t=Array.prototype.slice.call(arguments);return this.next(function(e){e.apply(e,t)})},a.prototype["return"]=a.prototype.set,a.prototype.resolve=a.prototype.set,a.prototype.delay=function(t){return this.next(function(){var e=Array.prototype.slice.call(arguments),r=e.pop();setTimeout(function(){r.apply(r,e)},t)})},a.prototype.past=function(t,e){return this.add({method:t,context:e,isPass:!0,isAsync:!1})},a.prototype.tap=a.prototype.past,a.prototype.inspect=function(t,e){var r=function(){var r=Array.prototype.slice.call(arguments);r.unshift(this),t.apply(e||this,r)};return this.add({method:r,context:this,isPass:!0,isAsync:!1})},a.prototype.tap=a.prototype.past,a.prototype.next=function(t,e){return this.add({method:t,context:e,isAsync:!0})},a.prototype.then=function(t,e){return this.add({method:t,context:e,isAsync:!1})},a.prototype.method=a.prototype.then,a.rejectedThen=function(t,e){if(this._rejected&&t.toString()==c.toString())throw err;return this.add({method:t,context:e,isAsync:!1})},a.prototype.spread=function(t,e){return t?this.add({method:function(e){return t.apply(this,e)},context:e,isAsync:!1}):this.add({method:function(t,e){e.apply(e,t)},context:this,isAsync:!0})},a.prototype.spreadCallback=function(t,e){return this.callback(function(){var e=Array.prototype.slice.call(arguments),r=e[e.length-1];if(e.length){switch(e[0].constructor){case String:case Boolean:case Object:e=[e[0]];break;case Array:e=e[0];break;default:e=[]}e.push(r)}t.apply(this,e)},e)},a.prototype.callback=function(t,e){var r=function(){var r=e||this,n=o.start();n.set.apply(n,arguments).spread();var a=o.callback4callback(t,n,r);return n.next(function(){return a.apply(r,arguments)})};return this.add({method:r,scope:e,isAsync:!1})},a.prototype.clearMem=function(){return this.data=null,this},a.prototype.seekPromiseCatcher=function(t){return this.catchers&&null==t?this:this.data&&this.data.getNextPromise?this.data.getNextPromise().seekPromiseCatcher():void 0},a.prototype.throwPromiseCatcher=function(t,e){if(e.catchers.catch_type_array)for(var r=0;r<e.catchers.catch_type_array.length;++r)if(e.catchers.catch_type_array[r].type==t.constructor){this._rejectedCaught=!0;var n=e.catchers.catch_type_array[r].method;return e.runCatch(t,n),this}if(t&&t.name&&t.name.toLowerCase){var o=t.name.toLowerCase();if(e.catchers["catch"+o]){this._rejectedCaught=!0;var n=e.catchers["catch"+o];return e.runCatch(t,n),this}}if(t&&t.code&&t.code.toLowerCase){var o=t.code.toLowerCase();if(e.catchers["catch"+o]){this._rejectedCaught=!0;var n=e.catchers["catch"+o];return e.runCatch(t,n),this}}if(t&&t.message&&t.message.toLowerCase){var o=t.message.toLowerCase();if(e.catchers["catch"+o]){this._rejectedCaught=!0;var n=e.catchers["catch"+o];return e.runCatch(t,n),this}}if(e.catchers.catchAll){this._rejectedCaught=!0;var n=e.catchers.catchAll;return e.runCatch(t,n),this}var e=e.seekPromiseCatcher(!1);return e?this.throwPromiseCatcher(t,e):void 0},a.prototype["throw"]=function(t){if(t&&t.constructor==String){var e=t;t=new Error(t),t.name=e}this._rejected=t,this._rejectedCaught=!1,c&&(this.then=a.rejectedThen);var r=this.seekPromiseCatcher();if(r)return this.throwPromiseCatcher(t,r);if(this.data&&this.data.getNextPromise){var n=this.data.getNextPromise();return n["throw"].call(n,t)}},a.prototype.all=function(){var t=Array.prototype.slice.call(arguments);return t.push(function(){if(arguments.length){var t=Array.prototype.slice.call(arguments);return t}}),this.join.apply(this,t)},a.prototype.join=function(){var t,e=this,r=[],n=0,a=Array.prototype.slice.call(arguments),s=a.length&&a[0]&&a[0].constructor==Array,c=s?arguments[0]:a;if(a[a.length-1]&&a[a.length-1].constructor==Function)var u=a.pop(),h=function(){var n=o.start().set(r).spread(u,e);n.then(function(){t.apply(t,Array.prototype.slice.call(arguments))})};else var h=function(){t.apply(t,[r])};var l=function(){if(t=Array.prototype.slice.call(arguments).pop(),!c.length)return h();var e=function(t,e){r[t]=e,++n,n==c.length&&h()},o=function(e){t["throw"](e)};c.forEach(function(t,r){i(t)?t.then(function(t){e(r,t)})["catch"](o):e(r,t)})};return e.next(l)},a.prototype.map=function(){var t=Array.prototype.slice.call(arguments);if("object"==typeof t[t.length-1])var e=t.pop();else var e={concurrency:0};var r=null==e.concurrency||isNaN(e.concurrency)?0:e.concurrency,a=t.pop(),s=[],i=function(t,e,r){return o.start().then(function(){var n=a.call(this,t,e,r);return n&&n.then?n.then(function(t){s[e]=t}):void(s[e]=n)},this)},c=function(t,e){if(!t)return e(null);var o,a=0,c=0;if(t.constructor===Array){var u=t.length;u||e(null,[]);var h=function(n,o,h){if(o!=u){var l=i.call(h,t[o],o,u).then(function(){++c,c==u&&e(null,s)})["catch"](e);if(r>0){var p=(o+1)%r;return 0==p?l.then(function(){n(n,o+1,h)}):(++a,n(n,o+1,h).then(function(){--a,0==a&&n(n,o+1,h)}))}return l.then(function(){n(n,o+1,h)})}};return void h(h,0,this)}var u=n(t).length;u||e(null,{});for(var l in t)o=t[l],i.call(this,o,l,u).then(function(){++c,c==u&&e(null,s)})["catch"](e)};return t[0]&&t[0].constructor!==Function?this.callback(function(e){c.call(this,t[0],e)}):this.callback(function(t,e){c.call(this,t,e)})},a.prototype.each=function(t){return this.then(function(e){for(var r=o.start(),n=0;n<e.length;++n)r=r.set(e[n],n,e).then(t);return r.set.apply(r,arguments)})},a.prototype._then=function(t,e,r,n,o){return this.add({method:function(){t.apply(n,arguments)},isAsync:!1})["catch"](function(){e.apply(n,arguments)})},t.exports=o;var c,u=Object.prototype.toString,h=(Function.prototype.toString,RegExp("^"+String(u).replace(/[.*+?^${}()|[\]\/\\]/g,"\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),"undefined"!=typeof Promise&&Promise&&Promise.resolve);h&&Promise.resolve().then(function(){var t={};return t.then=function(t){c=t},t}).then(function(){})},function(t,e,r){function n(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var t=arguments,r=this.useColors;if(t[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+t[0]+(r?"%c ":" ")+"+"+e.humanize(this.diff),!r)return t;var n="color: "+this.color;t=[t[0],n,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,a=0;return t[0].replace(/%[a-z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(a=o))}),t.splice(a,0,n),t}function a(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(r){}}function i(){var t;try{t=e.storage.debug}catch(r){}return t}function c(){try{return window.localStorage}catch(t){}}e=t.exports=r(3),e.log=a,e.formatArgs=o,e.save=s,e.load=i,e.useColors=n,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){return JSON.stringify(t)},e.enable(i())},function(t,e,r){function n(){return e.colors[h++%e.colors.length]}function o(t){function r(){}function o(){var t=o,r=+new Date,a=r-(u||r);t.diff=a,t.prev=u,t.curr=r,u=r,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=n());var s=Array.prototype.slice.call(arguments);s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var i=0;s[0]=s[0].replace(/%([a-z%])/g,function(r,n){if("%%"===r)return r;i++;var o=e.formatters[n];if("function"==typeof o){var a=s[i];r=o.call(t,a),s.splice(i,1),i--}return r}),"function"==typeof e.formatArgs&&(s=e.formatArgs.apply(t,s));var c=o.log||e.log||console.log.bind(console);c.apply(t,s)}r.enabled=!1,o.enabled=!0;var a=e.enabled(t)?o:r;return a.namespace=t,a}function a(t){e.save(t);for(var r=(t||"").split(/[\s,]+/),n=r.length,o=0;n>o;o++)r[o]&&(t=r[o].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function i(t){var r,n;for(r=0,n=e.skips.length;n>r;r++)if(e.skips[r].test(t))return!1;for(r=0,n=e.names.length;n>r;r++)if(e.names[r].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o,e.coerce=c,e.disable=s,e.enable=a,e.enabled=i,e.humanize=r(4),e.names=[],e.skips=[],e.formatters={};var u,h=0},function(t,e){function r(t){if(t=""+t,!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*h;case"days":case"day":case"d":return r*u;case"hours":case"hour":case"hrs":case"hr":case"h":return r*c;case"minutes":case"minute":case"mins":case"min":case"m":return r*i;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function n(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=i?Math.round(t/i)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return a(t,u,"day")||a(t,c,"hour")||a(t,i,"minute")||a(t,s,"second")||t+" ms"}function a(t,e,r){return e>t?void 0:1.5*e>t?Math.floor(t/e)+" "+r:Math.ceil(t/e)+" "+r+"s"}var s=1e3,i=60*s,c=60*i,u=24*c,h=365.25*u;t.exports=function(t,e){return e=e||{},"string"==typeof t?r(t):e["long"]?o(t):n(t)}}]);

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(errorObject){
	  return new jError(errorObject)
	}

	var jError = function jError(errorObject){
	  this.types = jError.types
	  this.errorObject = errorObject;return this;
	}

	jError.prototype.getKeys = function(){
	  return Object.getOwnPropertyNames(this.errorObject)
	}

	/** converts error.stack into array via stack.split(' at ') */
	jError.prototype.getStackArray = function(amount){
	  if(this.stackArray){
	    return this.stackArray
	  }

	  if(this.errorObject.stack){
	    if(this.errorObject.stack.split){
	      this.stackArray = this.errorObject.stack.split(' at ');
	    }else if(this.errorObject.stack.splice){//?already an array?
	      this.stackArray = this.errorObject.stack;
	    }
	    return this.stackArray;
	  }

	  return []
	}

	jError.prototype.getTraceArray = function(amount){
	  var stackArray = [];
	  stackArray.push.apply(stackArray, this.getStackArray())
	  stackArray.shift();

	  if(amount){
	    stackArray.splice(amount, stackArray.length)
	  }

	  return stackArray
	}

	jError.prototype.getFirstTrace = function(amount){
	  var stackArray = this.getStackArray()
	  if(!stackArray)return;

	  amount = amount || 1

	  var rtn = []
	  for(var i=1; i <= stackArray.length && i <= amount; ++i){
	    rtn.push( stackArray[i] )
	  }

	  return rtn.join(' at ')
	}

	jError.prototype.setStackArray = function(stackArray){
	  this.errorObject.stack = stackArray.join(' at ')
	  this.stackArray = stackArray
	  return this
	}

	/** analyzes stack to remove 1st trace (leaves error message in stack). Essentially calls .splice(1,1) on stack array  */
	jError.prototype.cutFirstTrace = function(){
	  var stackArray = this.getStackArray()
	  if(stackArray && stackArray.length > 1){
	    stackArray.splice(1,1)
	    this.setStackArray( stackArray )
	  }

	  return this
	}

	jError.prototype.getLineNum = function(){
	  var string = this.getFirstTrace().split(':')[1]
	  return Number(string)
	}

	jError.prototype.getFilePath = function(){
	  var trace = this.getFirstTrace()
	  return trace.split(':')[0].split('(').pop()
	}

	jError.prototype.getName = function(){
	  if(this.errorObject.name)return this.errorObject.name
	  return this.getFailingObjectName()
	}

	jError.prototype.getFailingObjectName = function(){
	  var trace = this.getFirstTrace()
	  return trace.split('(')[0].trim()
	}

	jError.prototype.getMessage = function(){
	  if(this.errorObject.message)return this.errorObject.message

	  var fTrace = this.getFirstTrace()
	  if(fTrace){
	    var fSpaceArray = fTrace.split(' ')
	    if(fSpaceArray.length){
	      return fSpaceArray.splice(0, 1)[0]
	    }
	  }

	  if(this.errorObject.constructor == String){
	    return this.errorObject
	  }
	}

	jError.prototype.getType = function(){
	  var isNamed = this.errorObject.name && this.errorObject.name.toLowerCase!=null
	  var isCode = this.errorObject.code && this.errorObject.code.toLowerCase!=null

	  if(isCode && this.errorObject.name=='Error'){
	    return this.errorObject.code
	  }

	  if(isNamed){
	    return this.errorObject.name
	  }
	}

	jError.prototype.isType = function(type){
	  if(this.errorObject==null)return false

	  if(this.errorObject.constructor && type == this.errorObject.constructor){
	    return true
	  }

	  var eName = this.getType()
	  if(eName && eName.toLowerCase()==type.toLowerCase()){
	    return true
	  }

	  if(type.constructor==String){
	    if(this.errorObject.constructor==String){
	      return this.errorObject.toLowerCase() === type.toLowerCase()
	    }

	    var mess = this.getMessage()
	    if(mess && type.toLowerCase()==mess.toLowerCase()){
	      return true
	    }
	  }

	  return false
	}



	jError.types = {}

	jError.types.NotFound = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 404;
	  this.code = "not_found";
	  this.message = message || "Could Not Find Requested Resource";
	}
	jError.types.NotFound.prototype = Object.create(Error.prototype)
	jError.types.notFound = function(message){
	  return new jError.types.NotFound(message)
	}

	jError.types.LocalNetworkRequired = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 403;
	  this.code = "local_network_required";
	  this.message = message || "Local Network Connection Required";
	}
	jError.types.LocalNetworkRequired.prototype = Object.create(Error.prototype)
	jError.types.localNetworkRequired = function(message){
	  return new jError.types.LocalNetworkRequired(message)
	}

	jError.types.Unauthorized = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 401;
	  this.code = "credentials_required";
	  this.message = message || "No authorization token was found";
	}
	jError.types.Unauthorized.prototype = Object.create(Error.prototype)
	jError.types.unauthorized = function(message){
	  return new jError.types.Unauthorized(message)
	}

	jError.types.BadRequest = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 400;
	  this.code = "bad_request";
	  this.message = message || "Bad Request";
	}
	jError.types.BadRequest.prototype = Object.create(Error.prototype)
	jError.types.badRequest = function(message){
	  return new jError.types.BadRequest(message)
	}

	jError.types.MethodNotAllowed = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 405;
	  this.code = "method_not_allowed";
	  this.message = message || "Method Not Allowed";
	}
	jError.types.MethodNotAllowed.prototype = Object.create(Error.prototype)
	jError.types.methodNotAllowed = function(message){
	  return new jError.types.MethodNotAllowed(message)
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var jXNumber = function jXNumber(number){
		this.number = number
		return this
	}

	jXNumber.prototype.decimalFormat = function(p){
	  p = p==null ? 2 : p
	  var m=Math.pow(10,p)
	    ,n=this.number
	  return (Math.round(n*m)/m).toFixed(p)
	}

	/**
	  @options - {}
	  @options.date - default=new Date()
	*/
	jXNumber.prototype.asMinutesToDateTime = function(options){
	  options = options || {}
	  var minute = this.number
	  var iDate = options.date || new Date()
	  var date = new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), 0, minute)

	  return date
	}

	/**
	  @options = {}
	  @options.timeDelim - default=':'
	  @optiosn.dayPeriodDelim - default=' '
	*/
	jXNumber.prototype.asMinutesToTime = function(options){
	  options = options || {}
	  options.timeDelim = options.timeDelim || ':'
	  options.dayPeriodDelim = options.dayPeriodDelim || ' '
	  var d = this.asMinutesToDateTime(options)
	  var hour = d.getHours()
	  var tt = 'AM'
	  var mins = d.getMinutes()

	  if(hour > 12){
	    tt = 'PM'
	    hour = hour - 12
	  }

	  mins = mins.toString().length == 1 ? '0'+mins : mins

	  return hour +options.timeDelim+ mins +options.dayPeriodDelim+ tt;
	}


	var rtn = function(path){return new jXNumber(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXNumber
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('number', rtn)
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";
	var ExString = function ExString(string){
		this.string = string
		return this
	}

	ExString._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

	ExString.prototype.isEmail = function(){
		return this.string.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)>=0
	}

	//Node.js doesnt have .repeat as of 2/11/15
	ExString.prototype.repeat = function(num){
		var x,s = ''
		for(x=0; x < num; ++x)s = s + this.string
		return s
	}

	//grouptype = sequence || struct
	ExString.prototype.htmlFormat = function(){
		var v = this.string
		v=v.replace(/</g,'&lt;').replace(/>/g,'&gt;')
		return v
	}

	ExString.prototype.toBase64 = function(){
		var e = this._utf8_encode();
		var t="";var n,r,i,s,o,u,a;var f=0;
		while(f<e.length){
			n=e.charCodeAt(f++);r=e.charCodeAt(f++);
			i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;
			if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}
			t=t+ExString._keyStr.charAt(s)+ExString._keyStr.charAt(o)+ExString._keyStr.charAt(u)+ExString._keyStr.charAt(a)
		}
		return t
	}

	ExString.prototype._utf8_encode = function(){
		var e = this.string.replace ? this.string : this.string.toString()
		e=e.replace(/\r\n/g,"\n");var t="";
		for(var n=0;n<e.length;n++){
			var r=e.charCodeAt(n);
			if(r<128){
				t+=String.fromCharCode(r)
			}else if(r>127&&r<2048){
				t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)
			}else{
				t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)
			}
		}
		return t
	}
	/*
	ExString.prototype.isBinary = function(){
		return /^[01]+$/.test(this.string)
	}
	*/
	//NODE ONLY
	if(typeof(Buffer) != 'undefined'){
		ExString.prototype.toHex = function(encType){
			encType = encType || 'hex'
			return new Buffer(this.string,encType).toString('hex')
		}

		ExString.prototype.toBinary = function(encType){
			encType = encType || 'binary'
			return new Buffer(this.string,encType)
		}
	}

	var rtn = function(path){
		return new ExString(path)
	}
	rtn.Class = ExString
	module.exports = rtn
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(9)
	var ieee754 = __webpack_require__(10)
	var isArray = __webpack_require__(11)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 10 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	var jXBinary = function jXBinary(binary){
		this.binary = binary
		return this
	}

	jXBinary.prototype.is = function(){
		return /^[01]+$/.test(this.binary)
	}


	var rtn = function(path){return new jXBinary(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXBinary
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('binary', rtn)
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var jXBase64 = function jXBase64(base64){
		this.base64 = base64
		return this
	}

	jXBase64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

	jXBase64.prototype.toString = function(e){
		var e = this.base64.replace(/[^A-Za-z0-9\+\/\=]/g,"");
		var t="";var n,r,i;var s,o,u,a;var f=0;
		while(f<e.length){
			s=jXBase64._keyStr.indexOf(e.charAt(f++));
			o=jXBase64._keyStr.indexOf(e.charAt(f++));
			u=jXBase64._keyStr.indexOf(e.charAt(f++));
			a=jXBase64._keyStr.indexOf(e.charAt(f++));
			n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;
			t=t+String.fromCharCode(n);
			if(u!=64){t=t+String.fromCharCode(r)}
			if(a!=64){t=t+String.fromCharCode(i)}
		}
		t = this._utf8_decode(t);
		return t
	}

	jXBase64.prototype._utf8_decode = function(e){
		var t="";var n=0;var r=0,c2=0;
		while(n<e.length){
			r=e.charCodeAt(n);
			if(r<128){
				t+=String.fromCharCode(r);n++
			}else if(r>191&&r<224){
				c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2
			}else{
				c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);
				t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3
			}
		}
		return t
	}

	var rtn = function(path){return new jXBase64(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXBase64
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('base64', rtn)
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var jXObject = function jXObject(object){
		this.object = object
		return this
	}

	jXObject.prototype.isCyclic = function() {
		var seenObjects = [];

		function detect (obj) {
			if (obj && typeof obj === 'object') {
				if (seenObjects.indexOf(obj) !== -1) {
					return true;
				}
				seenObjects.push(obj);
				for(var key in obj) {
					if(obj.hasOwnProperty(key) && detect(obj[key])) {
				//console.log(obj, 'cycle at ' + key);
						return true;
					}
				}
			}
			return false;
		}

		return detect(this.object);
	}

	jXObject.prototype.toCookieString = function(){
		var cookies = this.object
		var cookieNameArray = Object.keys(cookies)
		if(cookieNameArray.length){
			var cookieString = '';
			cookieNameArray.forEach(function(name,i){
				cookieString += '; '+name+'='+cookies[name]
			})
			cookieString = cookieString.substring(2, cookieString.length)//remove "; "
			return cookieString
		}
		return ''
	}


	var rtn = function(path){return new jXObject(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXObject
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('object', rtn)
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var jXMethod = function jXMethod(method, name){
		this.method = method;this.name = name
		return this
	}

	if(jXMethod.name && jXMethod.name==='jXMethod'){//device supports function.name
		jXMethod.prototype.getName = function(){
			return this.name || (this.method.name.length ? this.method.name : null)
		}
	}else{
		jXMethod.prototype.getName = function(){
			var funcNameRegex = /function\s+(.{1,})\(/;
			var results = (funcNameRegex).exec(this.method.toString())
			return this.name || ((results && results.length > 1) ? results[1] : null)
		}
	}

	jXMethod.prototype.getArgNameArray = function(){
		var string = this.getDefinition()
		var argDef = /\(.+\)/.exec(string)[0]
		argDef = argDef.substring(1, argDef.length)//remove (
		argDef = argDef.substring(0, argDef.length-1)//remove )
		argDef = argDef.replace(/\s|\t|\r|\n/g,'')
		return argDef.split(',')
	}

	jXMethod.prototype.getDefinition = function(){
		var funcNameRegex = /(.*function[^\)]+\))/;
		var results = (funcNameRegex).exec(this.method.toString())
		return (results && results.length > 1) ? results[1] : null
	}

	/** This is an option enhanced version of expectOne */
	jXMethod.prototype.expect = function(nameOrMap, value, requiredOrType, type){
		if(nameOrMap && nameOrMap.constructor==String){
			return this.expectOne(nameOrMap, value, requiredOrType, type)
		}

		for(var key in nameOrMap){
			var define = nameOrMap[key]
			var val = define && (define.val!==null || define.value!==null)
			if(val){
				val = define.val || define.value
				this.expectOne(key, val, define.required, define.type)
			}else{
				this.expectOne(key, define, true)
			}
		}

		return this
	}

	/**
		argument-name, argument-value, required, constructor
		@requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true
	*/
	jXMethod.prototype.expectOne = function(name, value, requiredOrType, type){
		var isReqDefined = requiredOrType!=null && requiredOrType.constructor==Boolean
		var isRequired = isReqDefined ? requiredOrType : true
		type = type || (isReqDefined ? null : requiredOrType)

		if(isRequired && value==null){
			var methodName = this.getName()
			var methodMsg = methodName ? 'The function '+methodName+' recieved an invalid argument. ' : ''
			var argTypeMsg = methodMsg+'Argument '+name+' is required. '
			var err = new Error(argTypeMsg+' Function definition: '+this.getDefinition())
			err.invalidArg = {errorType:'undefined', name:name}
			throw err
		}

		if(type){
			if(value!=null && value.constructor!=type){
				var methodName = this.getName()
				var methodMsg = methodName ? 'The function '+methodName+' recieved an invalid argument. ' : ''
				var argTypeMsg = methodMsg+'Argument '+name+' is not of type '+type.name+'. '
				var err = new Error(argTypeMsg+'Received type: '+value.constructor.name+'. Function definition: '+this.getDefinition())
				err.invalidArg = {errorType:'type', name:name}
				throw err
			}
		}
		return this
	}

	/** for processing current arguments */
	jXMethod.prototype.arguments = function(args){
		return new jXArgs(this, args)
	}

	var rtn = function(path){
		return new jXMethod(path)
	}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXMethod
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('method', rtn)
	}





	var jXArgs = function(jXMethod, args){
		this.args=args;this.jXMethod=jXMethod;return this
	}



/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	var jXArray = function jXArray(array){
		this.array = array
		return this
	}

	//pivets array of objects to object of arrays
	jXArray.prototype.objectify = function(){
		if(!this.array.length)return {}

		var x,n,s,r={}

		s = this.array[0]
		for(n in s){
			r[n] = []
		}

		for(x=this.array.length-1; x >= 0; --x){
			s = this.array[x]
			for(n in s){
				r[n].unshift(s[n])
			}
		}
		return r
	}

	//append an array's items onto the end of this array
	jXArray.prototype.appendArray = function(){
		//each argument maybe another array
		for(var argIn=0; argIn < arguments.length; ++argIn){
			var array = arguments[argIn]
			for(var aI=0; aI < array.length; ++aI){
				this.array.push(array[aI])
			}
		}

		return this
	}
	jXArray.prototype.union = jXArray.prototype.appendArray

	//prepend an array's items onto the front of this array
	jXArray.prototype.prependArray = function(){
		//each argument maybe another array
		for(var argIn=0; argIn < arguments.length; ++argIn){
			var array = arguments[argIn]
			for(var aI=array.length-1; aI >= 0; --aI){
				this.array.unshift(array[aI])
			}
		}

		return this
	}

	jXArray.prototype.sum = function(method){
		var n=0,a = this.array
		method = method || function(v,i){return v}
		for(var i=a.length-1; i >= 0; --i){
			n = n + Number(method(a[i],i))
		}
		return n
	}

	//grouptype = sequence || struct. WHEN isIndexValue=true THEN return array contains back reference to orginal array index
	jXArray.prototype.group = function(method, isIndexValue, grouptype){
		method = method ? method : function(v){return v}
		grouptype = grouptype ? grouptype : 'sequence'
		isIndexValue = isIndexValue==null ? 0 : isIndexValue

		var array = this.array

		if(grouptype == 'struct'){
			var struct = {};
			for(var x=0; x < array.length; ++x){
				var a = array[x]
				var v = method(a);
				if(struct[v]==null)struct[v]=[];
				struct[v].push(isIndexValue ? x : a);
			}
			return struct;
		}

		var rArray = [[]];
		var cVal = 0;
		for(var x=0; x < array.length; ++x){
			var a = array[x];
			var v = method(a);
			if(cVal != v && x > 1)rArray.push([]);
			cVal=v;
			rArray[rArray.length-1].push(isIndexValue ? x : a);
		}

		return rArray;
	}

	var rtn = function(path){return new jXArray(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXArray
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('array', rtn)
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var jXQueryObject = function jXQueryObject(object){
		this.queryObject = object
		return this
	}

	jXQueryObject.prototype.getNameArray = function(){
		return Object.keys(this.queryObject)
	}

	//{delimiter,isNameFirstRow,textQualifier,titleArray}
	jXQueryObject.prototype.toCsv = function(delimOrOptions, textQualifier, titleArray){
		return this.Csv.apply(this,arguments).output()
	}

	jXQueryObject.prototype.Csv = function(delimOrOptions, textQualifier, titleArray){
		if(typeof(delimOrOptions)=='string')
			delimOrOptions = {delimiter:delimOrOptions}
		else if(delimOrOptions==null)
			delimOrOptions = {}

		if(textQualifier)delimOrOptions.textQualifier=textQualifier
		if(titleArray)delimOrOptions.titleArray=titleArray

		return new jXQueryObjectCsv(this.queryObject, delimOrOptions)
	}








	//{delimiter,isNameFirstRow,textQualifier,titleArray}
	function jXQueryObjectCsv(queryObject,$scope){
		this.data = $scope || {}
		this.data.isNameFirstRow = this.data.isNameFirstRow==null ? true : this.data.isNameFirstRow
		this.data.delimiter = this.data.delimiter || ','
		this.data.queryObject = queryObject || this.data.queryObject || {}
		return this
	}

	jXQueryObjectCsv.prototype.getTitleArray = function(){
		if(this.data.titleArray)return this.data.titleArray
		if(this.data.isNameFirstRow)return Object.keys(this.data.queryObject)
	}

	jXQueryObjectCsv.prototype.output = function(){
		return this.toArray().join( this.data.lineDelim || '\r\n' )
	}

	jXQueryObjectCsv.prototype.toArray = function(){
		//textQualifier = textQualifier || '"'
		var columnLoop, columnCount, tempContent, newValue, newTitle,
			returnText = [],
			titleArray = this.getTitleArray(),
			nameArray = titleArray

		var options = this.data
		if(options.textQualifier && options.textQualifier.length){
			var nr = new RegExp('/'+options.textQualifier+'/', 'gi')
			var getCsvValueOf = function(val){
				if(val==null)return ''
				val = val.toString().replace(nr, options.textQualifier+options.textQualifier)
				val = options.textQualifier + val + options.textQualifier;
				return val
			}
		}else
			var getCsvValueOf = function(val){
				return val
			}

			/* figure headers */
				var tempContent=[]

				for(columnLoop=0; columnLoop < titleArray.length; ++columnLoop){
					if(typeof(titleArray[columnLoop])=='object'){
						newTitle =  titleArray[columnLoop][1]
						titleArray[columnLoop] = newTitle
						nameArray[columnLoop] = titleArray[columnLoop][0]
					}else{
						newTitle = titleArray[columnLoop]
					}
					newValue = getCsvValueOf(newTitle)
					tempContent.push(newValue)
				}
			/* end: figure headers */

			if(this.data.isNameFirstRow){
				tempContent = tempContent.join(this.data.delimiter)
				if(tempContent){
	        returnText.push(tempContent);
	      }
			}

			/* build CSV content */
	//console.log('nameArray[0]', nameArray[0], nameArray, this.data.isNameFirstRow, this.data.queryObject)

			var rowLoop,
				columnName,
	      firstColumn=this.data.queryObject[ nameArray[0] ]

	    if(firstColumn){//when no data provided, firstColumn is null
				var len = firstColumn.length;//get array len from first column
	  		for(rowLoop=0; rowLoop < len; ++rowLoop){
	  			tempContent	= [];
	  			columnCount = nameArray.length;
	  			for(columnLoop=0; columnLoop < columnCount; ++columnLoop){
	  				columnName = nameArray[columnLoop];
	  				newValue = this.data.queryObject[columnName][rowLoop]
	  				newValue = getCsvValueOf(newValue);
	  				//if(isBinary(newValue))newValue = toString(newValue);
	  				tempContent.push(newValue)
	  			}
	  			tempContent = tempContent.join(this.data.delimiter)
	  			returnText.push(tempContent)
	  		}
	    }
		/* end */

		return returnText
	}







	var rtn = function(path){return new jXQueryObject(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXQueryObject
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('queryObject',rtn)
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var jc = __webpack_require__(2)
		,xMonth = __webpack_require__(19)
		,ExDate = __webpack_require__(20)


	var Week = function Week(num){
		if(num!=null)this.setStartDate(num)
		return this
	}

	jc(Week, xMonth.Class)

	Week.prototype.getEndDate = function(){
		if(this.endDate)return this.endDate
		this.endDate = new Date(this.getStartDate().getDate() + 6)
		return this.endDate
	}

	Week.prototype.setEndDate = function(date){
		if(!ExDate(date).isDate() && !isNaN(date))//just the month number?
			endDate = ExDate(new Date()).setMonth(date).getLastDateOfMonth()
		else
			this.endDate = date

		return this
	}

	Week.prototype.setStartDate = function(date){
		if(!isNaN(date) && date.constructor != Date)//just the month number?
			this.date = ExDate(new Date()).gotoWeek(date).date
		else
			this.date = date
		return this
	}

	Week.prototype.getStartDate = function(){
		if(!this.date)
			this.date = ExDate(new Date()).getDateWeekStart()
		return this.date
	}

	var rtn = function(path){return new Week(path)}
	rtn.Class = Week
	module.exports = rtn

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xDate = __webpack_require__(20)

	var xMonth = function xMonth(num){
		if(num!=null){
			this.setStartDate(num)
		}
		return this
	}

	xMonth.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

	xMonth.getMonthIndexByString = function(mon){
		return xMonth.monthLcaseNameArray.indexOf(mon.toLowerCase())
	}

	xMonth.prototype.setStartDate = function(date){
		var jDate = xDate()
		if(!jDate.isDate(date)){
			var num = Number(date)

			if(!isNaN(num)){//just the month number?
				date = xDate().now().setDate(1).setMonth(date).date
			}else{
				var i = xMonth.getMonthIndexByString(date)
				date = xDate(new Date()).setDate(1).setMonth(i+1).date
			}
		}
		this.date = date
		return this
	}

	xMonth.prototype.StartDate = function(isClone){
		var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
		return xDate(startDate)
	}

	xMonth.prototype.xDate = function(){
		return xDate(this.getStartDate())
	}

	xMonth.prototype.getStartDate = function(){
		if(this.date)return this.date
		this.date = new Date(new Date().setDate(1))
		return this
	}

	xMonth.prototype.setEndDate = function(date){
		if(!xDate(v).isDate() && !isNaN(v))//just the month number?
			this.endDate = xDate(new Date()).setMonth(date).getLastDateOfMonth()
		else
			this.endDate = date

		return this
	}

	xMonth.prototype.getEndDate = function(){
		if(this.endDate)return this.endDate
		var d = '12/31/'+this.getYear()
		this.endDate = new Date(d)
		return this.endDate
	}



	var rtn = function(num){
		return new xMonth(num)
	}
	rtn.Class = xMonth
	module.exports = rtn

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	/* everything operates on a scale of 1-12 NOT 0-11 OR 1-31 NOT 0-30 ... Weeks are 1-53 */
	var ackDate = function ackDate(date){
		this.date = ackDate.toDate(date)
		return this
	}

	ackDate.suffixByNumber = function(i){
		var j = i % 10,
				k = i % 100;
		if (j == 1 && k != 11) {
				return i + "st";
		}
		if (j == 2 && k != 12) {
				return i + "nd";
		}
		if (j == 3 && k != 13) {
				return i + "rd";
		}
		return i + "th";
	}

	ackDate.dateAddDay = function(d, amount){
		amount = amount==null ? 1 : amount
	    var dat = new Date(d);
	    dat.setDate(dat.getDate() + amount);
	    return dat;
	}

	ackDate.startOfDateDay = function(date){
		date = new Date(new Date(date).setHours(1))
		date = new Date(date.setMinutes(0))
		date = new Date(date.setSeconds(0))
		return new Date(date.setMilliseconds(0))
	}

	ackDate.endOfDateDay = function(date){
		date = new Date(new Date(date).setHours(23))
		date = new Date(date.setMinutes(59))
		date = new Date(date.setSeconds(59))
		return new Date(date.setMilliseconds(999))
	}

	ackDate.toDate = function(date){
		return date!=null ? ackDate.dateObjectBy(date) : null
	}

	//NON PROTOTYPE METHODS
	ackDate.twoDigit = function(n){
		return ('0'+n).slice(-2)
	}

	ackDate.isDate = function(date){
		var isRawDate = date.constructor==Date&&!isNaN(date.getTime())
		if(isRawDate)return true

		if(date.search)//string
			return date.search(/^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/) >= 0

		return false
	}

	ackDate.yearByDate = function(d){
		return d.getFullYear()
	}

	ackDate.getMonthIndexByString = function(mon){
		return ackDate.monthLcaseNameArray.indexOf(mon.toLowerCase())
	}

	ackDate.dateObjectBy = function(date){
		if(date){
			if(date.constructor == ackDate)
				return date.date

			if(date.constructor == Date)
				return date

			//if(['string','number'].indexOf(typeof(date)))
			return new Date(date)//convert string to date object
		}

		return date || new Date()
	}

	ackDate.monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	ackDate.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	ackDate.monthAbbrArray = ['Jan','Feb','Mar','Apr','Ma','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
	ackDate.dayNameArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
	ackDate.dayAbbrArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']


	ackDate.dateYearDiff = function(d0, d1){
		return Math.abs(d0.getFullYear() - d1.getFullYear())
	}

	/*
		PROTOTYPES
	*/

	ackDate.prototype.now = function(){
		this.date = new Date();return this;
	}

	//returns years.months (32.11 is 32 years and 11 months && 32.1 is 32 years 1 month)
	ackDate.prototype.getAgeDisplay = function(){
		var d = this.date
			,toDate = new Date()
			,local = {}

		local.isValBirthdate = d!=null && ackDate.isDate(d);

		if(!local.isValBirthdate)return 0;


		local.isBorn = d < toDate
		if(local.isBorn){
			local.lesserDate = d
			local.greaterDate = toDate
		}else{
			local.lesserDate = toDate
			local.greaterDate = d
		}

		local.cYear = ackDate.yearByDate(local.greaterDate)
		local.lastBirthdate = ackDate.dateAddDay(local.lesserDate, -365)
		local.years = ackDate.dateYearDiff(local.lesserDate, local.greaterDate)
		local.months = ackDate.dateMonthDiff(local.lastBirthdate, local.greaterDate)

		if(local.months >= 12)
			local.months = local.months % 12

		local.format = 1;
		if(local.months >= 10)
			local.format = 2

		var rtnNum = local.years +'.'+ local.months

		local.result = (function(n,p){var m=Math.pow(10,p);return (Math.round(n*m)/m).toFixed(p)})(rtnNum,local.format)

		if(!local.isBorn)local.result = -local.result;

		return local.result;
	}

	ackDate.prototype.gt = function(date){
		date = ackDate.dateObjectBy(date)
		return this.date > date
	}

	ackDate.prototype.lt = function(date){
		date = ackDate.dateObjectBy(date)
		return this.date < date
	}

	ackDate.prototype['new'] = function(){
		return new ackDate( new Date(this.date) )
	}

	ackDate.prototype.isDate = function(date){
		return ackDate.isDate(date||this.date)
	}

	//return natural Date object
	ackDate.prototype.getDate = function(){
		return this.date.getDate()
	}

	//sets day of month
	ackDate.prototype.setDate = function(n){
		var d = this.date
		d = d.setDate(n)
		this.date = new Date(d)
		return this
	}
	ackDate.prototype.setDayOfMonth = ackDate.prototype.setDate


	/* YEARS */
	ackDate.prototype.Year = function(){
		return ack.year(this.date)
	}

	ackDate.prototype.year = function(){
		return ackDate.yearByDate(this.date)
	}
	ackDate.prototype.getYear = ackDate.prototype.year

	ackDate.prototype.setYear = function(n){
		this.date.setYear(n)
		return this
	}

	ackDate.prototype.dayOfYear = function(){
		var d = this.date
		return Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 86400000)
	}

	ackDate.prototype.getNextYear = function(y){
		y = y==null ? 1 : Number(y)
		return this.year()+y
	}
	ackDate.prototype.nextYear = function(y){
		this.setYear( this.getNextYear(y) )
		return this
	}
	ackDate.prototype.getPriorYear = function(y){
		y = y==null ? 1 : Number(y)
		return this.year()-Math.abs(y)
	}
	ackDate.prototype.priorYear = function(y){
		this.setYear( this.getPriorYear(y) )
		return this
	}
	ackDate.prototype.addYear = ackDate.prototype.nextYear;

	ackDate.prototype.dateYearDiff = function(date){
		date = ackDate.toDate(date)
		return ackDate.dateYearDiff(date, this.date)
	}




	/* MONTHS */

	/** 1st 2nd 3rd of the month */
	ackDate.prototype.getMonthAbbr = function(){
		return ackDate.monthAbbrArray[this.date.getMonth()]
	}

	ackDate.prototype.getMonthDateProperNumber = function(){
		return ackDate.suffixByNumber( this.date.getDate() )
	}

	ackDate.prototype.fullWeeksLeftInMonth = function(){
		var eDate = this.getLastDateOfMonth()
		var diff = this.dateDayDiff(eDate)
		return Math.floor( diff / 7 )
	}

	ackDate.prototype.weekInMonth = function(){
		var firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
		return Math.ceil((this.date.getDate() + firstDay)/7)
	}

	ackDate.prototype.getMonthDayCount = function() {
	    return new Date(this.year(), this.month(), 0).getDate();
	}

	ackDate.prototype.getMonthName = function(){
		return ackDate.monthNameArray[ this.month()-1 ]
	}

	ackDate.prototype.getMonthNameArray = function(){
		return ackDate.monthNameArray
	}


	ackDate.prototype.dateMonthDiff = function(date){
		return ackDate.dateMonthDiff(this.date, date)
	}

	ackDate.dateMonthDiff = function(date0, date1){
		date0 = new Date(date0);date1 = new Date(date1)
		return Math.abs( (date1.getMonth()+12*date1.getFullYear())-(date0.getMonth()+12*date0.getFullYear()) )
	}

	ackDate.prototype.month = function(){
		return this.date.getMonth()+1
	}
	ackDate.prototype.getMonth = ackDate.prototype.month

	ackDate.prototype.priorMonth = function(amount){
		amount = amount || 1
		return this.nextMonth(-Math.abs(amount))
	}

	ackDate.prototype.nextMonth = function(amount){
		amount = amount || 1
		this.date = new Date(this.date.setMonth(this.date.getMonth()+amount))
		return this
	}

	ackDate.prototype.getLastDateOfMonth = function(){
		var nd = new Date(this.date)
			,EDate = new ackDate(nd)
		return EDate.nextMonth().gotoFirstDayOfMonth().prevDay().date
	}

	ackDate.prototype.setMonth = function(n){
		var d = this.date.setMonth(n-1)
		this.date = new Date(d)
		return this
	}

	ackDate.prototype.gotoFirstDayOfMonth = function(){
		this.prevDay( this.date.getDate()-1 );return this
	}



	/* DAYS */

	/** always absolute number */
	ackDate.prototype.dateDayDiff = function(date){
		//return Math.abs(parseInt((this.date - ackDate.toDate(date))/(24*3600*1000)))
		return Math.abs( Math.floor(( this.date - ackDate.toDate(date) ) / 86400000) )
	}

	ackDate.prototype.daysInMonth = function(){
		return new Date(this.year(), this.month(), 0).getDate()
	}

	ackDate.prototype.addDays = function(amount){
		var nd = ackDate.dateAddDay(this.date,amount)
		this.date = new Date(nd)
		return this
	}
	ackDate.prototype.nextDay = ackDate.prototype.addDays//multi alias

	ackDate.prototype.prevDay = function(amount){
		amount = amount==null ? 1 : amount
		var d = new Date(this.date)
			,d = d.setDate(d.getDate()-amount)
		this.date = new Date(d)
		return this
	}

	ackDate.prototype.getDayName = function(){
		return ackDate.dayNameArray[ this.date.getDay() ]
	}

	ackDate.prototype.getDayAbbr = function(){
		return ackDate.dayAbbrArray[ this.date.getDay() ]
	}




	/* WEEKS */

	ackDate.prototype.isWeekend = function(){
		return [1,7].indexOf( this.dayOfWeek() ) >= 0
	}

	/** getWeekInYear */
	ackDate.prototype.week = function(){
		var d = new Date(this.date)//could be number
		var onejan = new Date(d.getFullYear(),0,1)
		var nowDate = new Date(d)
		return Math.ceil((((nowDate - onejan) / 86400000) + onejan.getDay()+1)/7)
	}
	ackDate.prototype.getWeek = ackDate.prototype.week

	ackDate.prototype.dayOfWeek = function(){
		var d = this.date
		return d.getDay()+1
	}

	ackDate.prototype.gotoFirstDayOfWeek = function(){
		this.prevDay( this.dayOfWeek()-1 );return this
	}

	ackDate.prototype.gotoMondayOfWeek = function(){
		this.gotoFirstDayOfWeek().nextDay();return this
	}

	ackDate.prototype.gotoWeek = function(week){
		var thisWk = this.week()
		this.nextWeek( week - thisWk )
		return this
	}

	ackDate.prototype.priorWeek = function(amount){
		amount = amount==null ? 1 : amount
		return this.nextWeek(-Math.abs(amount))
	}

	ackDate.prototype.nextWeek = function(amount){
		amount = amount==null ? 1 : amount
		this.nextDay(amount * 7)
		return this
	}

	ackDate.prototype.getDateWeekStart = function(){
		var date = this.date
			,dw = this.dayOfWeek()-1;
		return new Date(date.setDate(date.getDate()-dw))
	}

	ackDate.prototype.getDateWeekStop = function(){
		var date = this.getDateWeekStart()
		date = date.setDate( date.getDate()+6 )
		return ackDate.endOfDateDay(date)
	}

	/** goto end of day. Just sets time to 23:59:59.999 */
	ackDate.prototype.gotoEod = function(date){
		this.date = ackDate.endOfDateDay(date||this.date);return this
	}
	ackDate.prototype.gotoEndOfDate = ackDate.prototype.gotoEod

	/** goto start of day. Just sets time to 0:0:0.0 */
	ackDate.prototype.gotoSod = function(date){
		this.date = ackDate.startOfDateDay(date||this.date);return this
	}
	ackDate.prototype.gotoStartOfDate = ackDate.prototype.gotoSod


	ackDate.prototype.FirstWeekday = function(){
		var amount = -this.dayOfWeek()+2
			,nd = this.date
			,nd = new Date(nd)//clone
			,Nd = new ackDate(nd).nextDay(amount)
		return Nd
	}

	ackDate.prototype.getDateOfFirstWeekday = function(){
		return new Date( this.FirstWeekday().date )
	}

	/** method(weekNum, ackDate) */
	ackDate.prototype.eachWeekInYear = function(method){
		var num = this.getWeeksInYear()
			,year = this.year()

		for(var x=1; x <= num; ++x){
			var ExD = new ackDate(this.date).setYear(year).gotoWeek(x)
			ExD.gotoFirstDayOfWeek()
			method(x,ExD)
		}
		return this
	}

	ackDate.prototype.eachWeekWithMondayInYear = function(method){
		this.eachWeekInYear(function(num, ackDate){
			method(num, ackDate.gotoMondayOfWeek())
		})
		return this
	}

	/** returns array of date exposed objects representing each week in a year */
	ackDate.prototype.getWeeksWithMondayInYearExposedArray = function(){
		var rtnArray = []
		this.eachWeekWithMondayInYear(function(weekNum, ackDate){
			rtnArray.push(ackDate)
		})
		return rtnArray
	}

	/** returns array of date objects representing each week in a year */
	ackDate.prototype.getWeeksWithMondayInYearArray = function(){
		var rtnArray = []
		this.eachWeekWithMondayInYear(function(weekNum, ackDate){
			rtnArray.push(ackDate.date)
		})
		return rtnArray
	}

	ackDate.prototype.getWeeksInYear = function(y){
		y = y ? y : this.year()
	  var d, isLeap;

	  d = new Date(y, 0, 1);
	  isLeap = new Date(y, 1, 29).getMonth() === 1;

	  //check for a Jan 1 that's a Thursday or a leap year that has a
	  //Wednesday jan 1. Otherwise it's 52
	  return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
	}



	/* ! TIME METHODS ! */

	/** alters this.date and return this */
	ackDate.prototype.addHours = function(n){
		this.date.setHours( this.date.getHours()+n );
		return this
	}

	/** alters this.date and return this */
	ackDate.prototype.addMinutes = function(n){
		this.date = new Date(this.date.getTime() + n*60000)
		return this
	}

	ackDate.prototype.minuteOfDay = function(){
		return (60 * this.date.getHours()) + this.date.getMinutes()
	}

	/** alters this.date and return this */
	ackDate.prototype.addSeconds = function(n){
		return this.addMilliseconds(n*1000)
	}

	/** alters this.date and return this */
	ackDate.prototype.addMilliseconds = function(n){
		//this.date.setMilliseconds(this.date.getMilliseconds() + n)
		this.date = new Date(this.date.getTime() + n)
		return this
	}

	/** returns no negative numbers */
	ackDate.prototype.dateHourDiff = function(date){
		return Math.abs(this.date - ackDate.dateObjectBy(date)) / 36e5;
	}

	/** returns no negative numbers */
	ackDate.prototype.dateSecondDiff = function(date){
		var dif = this.date.getTime() - ackDate.dateObjectBy(date).getTime()
		var Seconds_from_T1_to_T2 = dif / 1000;
		return Math.abs(Seconds_from_T1_to_T2)
	}

	//no negative numbers
	ackDate.prototype.dateMinuteDiff = function(date){
		date = ackDate.toDate(date)
		var diffMs = this.date - date
		return Math.abs( Math.round(((diffMs % 86400000) % 3600000) / 60000) )
	}



	/* FORMATTING */
	/** Febuary 24th 2016 */
	ackDate.prototype.mmmmdyyyy = function(){
		return this.getMonthName()+' '+this.getMonthDateProperNumber() +' '+ this.date.getFullYear()
	}

	/** 01:20.220 */
	ackDate.prototype.hhmmssl = function(timeSep, milsecSep){
		timeSep = timeSep || ':'
		milsecSep = milsecSep || '.'
		var d = this.date
			,h=d.getHours()
			,m=d.getMinutes()
		m=m<10?'0'+m:m
		h = ('0'+h).slice(-2)
		var s = ('0'+d.getSeconds()).slice(-2)
		return h+timeSep+m+timeSep+s+milsecSep+d.getMilliseconds()
	}

	ackDate.prototype.hhmmsl = function(){
		var d = this.date
			,h=d.getHours()
			,m=d.getMinutes()
		m=m<10?'0'+m:m
		h = ('0'+h).slice(-2)
		return h+':'+m+':'+d.getSeconds()+'.'+d.getMilliseconds()
	}

	ackDate.prototype.hmmtt = function(){
		var d = this.date
			,h=d.getHours()
			,t='AM'
			,m=d.getMinutes();

		m=m<10?'0'+m:m;
		h=h>=12?(t='PM',h-12||12):h==0?12:h
		return h+':'+m+' '+t
	}

	ackDate.prototype.hhmmtt = function(){
		var d = this.date
			,h=d.getHours()
			,t='AM'
			,m=d.getMinutes();

		m=m<10?'0'+m:m;
		h=h>=12?(t='PM',h-12||12):h==0?12:h
		return ('0'+h).slice(-2)+':'+m+' '+t
	}

	//yyyy-mm-dd hh:nn:ss:l
	ackDate.prototype.storageFormat = function(dateSep, spaceSep, timeSep, milsecSep){
		dateSep = dateSep || '-'
		spaceSep = spaceSep || ' '
		return this.date.getFullYear() + dateSep + this.mmdd(dateSep) + spaceSep + this.hhmmssl(timeSep, milsecSep)
	}

	ackDate.prototype.yyyymmdd = function(sep){
		sep = sep==null ? '' : sep
		return this.year() + sep + this.mmdd(sep)
	}

	ackDate.prototype.mmddyyyy = function(sep){
		sep = sep==null ? '/' : sep
		var d = this.date
		return this.mmdd(sep)+ sep +d.getFullYear()
	}

	ackDate.prototype.mmddyy = function(sep){
		var r = this.mmddyyyy()
		return r.substring(0,r.length-4)+r.substring(r.length-2,r.length)
	}

	ackDate.prototype.mmdd = function(sep){
		sep = sep==null ? '/' : sep
		var d = this.date
		return ackDate.twoDigit(d.getMonth()+1)+ sep + ackDate.twoDigit(d.getDate())
	}

	var eackDate = function(date){
		return new ackDate(date)
	}

	eackDate.Class = ackDate
	module.exports = eackDate

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xDate = __webpack_require__(20)

	var ackYear = function ackYear(yyyy){
		if(yyyy!=null)this.setStartDate(yyyy)
		return this
	}

	ackYear.prototype.setStartDate = function(date){
		var isObject = typeof(date) == 'object',
			isYearString = !isObject && !isNaN(Number(date)),
			isYear = isYearString || (!xDate(date).isDate() && !isNaN(date))

		if(isYear){//just the year number?
			date = new Date(new Date('1/1/2011').setYear(date))
		}

		this.date = date
		return this
	}

	ackYear.prototype.getStartDate = function(){
		if(this.date)return this.date
		var d = '1/1/'+xDate(new Date()).year()
		this.date = new Date(d)
		return this.date
	}

	ackYear.prototype.setEndDate = function(date){
		if(!xDate(date).isDate() && !isNaN(date))//just the year number?
			this.date = new Date('12/31/'+date)
		else
			this.date = date
		return this
	}

	ackYear.prototype.getEndDate = function(){
		if(this.endDate)return this.endDate
		var d = '12/31/'+this.getYear()
		this.endDate = new Date(d)
		return this.endDate
	}

	ackYear.prototype.StartDate = function(isClone){
		var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
		return xDate(startDate)
	}

	ackYear.prototype.xDate = function(){
		return xDate(this.getStartDate())
	}

	ackYear.prototype.month = function(){
		return this.StartDate().month()
	}
	ackYear.prototype.getMonth = ackYear.prototype.month//deprecated

	ackYear.prototype.week = function(){
		return this.StartDate().week()
	}
	ackYear.prototype.getWeek = ackYear.prototype.week//deprecated

	//?deprecated (duplicate of Date class)
	ackYear.prototype.getYear = function(){
		var d = this.getStartDate()
		return xDate(d).year()
	}
	ackYear.prototype.year = ackYear.prototype.getYear

	//gets startdate and changes the year
	ackYear.prototype.setYear = function(yyyy){
		var ExYy = xDate(yyyy)
		if(isNaN(yyyy) && ExYy.isDate())
			yyyy = ExYy.year()

		var date = this.getStartDate()
		date = new Date( date.setYear(yyyy) )
		this.setStartDate(date)

		return this
	}

	ackYear.prototype.getDateOfLastWeekday = function(){
		var d = getStartDate()
			,addAmount = -xDate(d).dayOfWeek()+6
			,dateA = new Date( d.setDate(d.getDate()+addAmount) )

		dateA = new Date(dateA.setHours(23))
		dateA = new Date(dateA.setMinutes(59))
		dateA = new Date(dateA.setSeconds(59))

		return dateA
	}






	var rtn = function(path){
		return new ackYear(path)
	}
	rtn.Class = ackYear
	module.exports = rtn

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	//Helps in the goal of selecting and defining states of properties on indexable data (object & arrays). The indexable data is not to be polluted by the defined properties (data and states seperate)
	function IndexSelector($scope){
	  this.data = $scope||{}

	  this.data.indexes = this.data.indexes || []//any object will do
	  this.data.selected = this.data.selected || []
	  this.data.states = this.data.states || []
	  return this
	}

	IndexSelector.prototype.isIndexSelected = function(index){
	  for(var i=this.data.states.length-1; i >= 0; --i){
	    if(this.data.states[i].index==index)return true
	  }
	  return false
	}

	IndexSelector.prototype.selectByIndex = function(index){
	  var selected = this.data.indexes[index]
	  if(selected){
	    this.data.states.push(this.newStateByIndex(index))
	    this.data.selected.push(selected)
	  }
	  return this
	}

	IndexSelector.prototype.deselectByIndex = function(index){
	  var i,state
	  for(i=this.data.states.length-1; i >= 0; --i){
	    var state = this.data.states[i]
	    if(state.index==index){
	      this.data.selected.splice(i, 1)
	      this.data.states.splice(i, 1)
	      break
	    }
	  }
	  return this
	}

	IndexSelector.prototype.deselectState = function(state){
	  this.deselectByIndex(state.index);return this
	}

	IndexSelector.prototype.deselectAll = function(){
	    this.data.selected.length=0
	    this.data.states.length=0
	  return this
	}

	IndexSelector.prototype.selectAll = function(){
	  if(!this.data.indexes)return this

	  for(var i=0; i < this.data.indexes.length; ++i){
	    this.selectByIndex(i)
	  }

	  return this
	}

	//getter/setter. Getter for determining if selected. Setter to set if selected or not
	IndexSelector.prototype.selectorByIndex = function(index){
	  var $this = this
	  return function(yesNo){
	      if(yesNo!=null){
	        yesNo ? $this.selectByIndex(index) : $this.deselectByIndex(index)
	        return yesNo
	      }

	      return $this.isIndexSelected(index)
	    }
	}

	IndexSelector.prototype.newStateByIndex = function(index){
	  var state={
	    data:this.data.indexes[index],
	    state:{},
	    index:index
	  }

	  return state
	}

	IndexSelector.prototype.selectStateByIndex = function(index){
	  var i = this.data.states.length
	  this.selectByIndex(index)
	  return this.data.states[i].state
	}

	IndexSelector.prototype.deselectOldest = function(){
	  this.data.selected.splice(0, 1)
	  this.data.states.splice(0, 1)
	  return this
	}

	IndexSelector.prototype.getOldestIndex = function(){
	  if(this.data.states.length)return this.data.states[0].index
	}

	//when IndexSelector has been init with selectives but no states, blank states can be built
	IndexSelector.prototype.pairSelectedToState = function(){
	  for(var i=0; i < this.data.states.length; ++i){
	    var state = this.data.states[i]
	    this.data.selected[i] = this.data.selected[i] || this.data.indexes[state.index]
	  }
	  return this
	}

	//when IndexSelector has been init with selectives but no states, blank states can be built
	IndexSelector.prototype.pairStateToSelected = function(){
	  for(var i=0; i < this.data.selected.length; ++i){
	    var selected = this.data.selected[i]
	    this.data.states[i] = this.data.states[i] || this.newStateByIndex(i)
	  }
	  return this
	}


	module.exports = IndexSelector

/***/ }
/******/ ]);