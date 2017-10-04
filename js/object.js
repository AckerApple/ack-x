"use strict";

function jXObject(object){
	this.object = object
	return this
}

/** @method(item, index, object) */
jXObject.prototype.forEach = function(method){
	xObject.forEach(method)(this.object)
	return this
}

/** When object, returns similar object with key values as results of mapping
	map array or object @method(item, index, object)

*/
jXObject.prototype.map = function(method){
	return xObject.map(method)(this.object)
}

jXObject.isArray = function(ob){
	return isArray(ob)
}

jXObject.prototype.isArray = function(ob){
	return isArray(this.object)
}

/**
	@method(item, index, parentResult, depth)
*/
jXObject.prototype.getTypeMap = function(){
	var type = typeof(this.object)
	var isObject = type=='object'

	if( !isObject )return type

	var isArray = this.isArray()
	var uniqueMap = isArray ? [] : {}

	this.map(function(item, index, object){
		if(item===null)return 'null'


		var isSubOb = typeof(item) == 'object'
		var isSubArray = isSubOb && jXObject.isArray(item)
		var subKeyMap = new jXObject(item).getTypeMap()

		if( isArray ){
			if( isSubArray ){
				uniqueMap[index] = subKeyMap
			}else if( isSubOb ){
				if( !uniqueMap[0] ){
					uniqueMap[0] = subKeyMap
				}else{
					assign(uniqueMap[0], subKeyMap)
				}
			}
		}else{
			if( isObject && isSubOb ){
				if( isSubArray ){
					uniqueMap[index] = subKeyMap
				}else{
					uniqueMap[index] = uniqueMap[index] || {}
					uniqueMap[index] = assign(uniqueMap[index], subKeyMap)
				}
			}else{
				uniqueMap[index] = subKeyMap
			}
		}
	})

	return uniqueMap
}

/** tests Object for circular references */
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

/** like JSON.stringify but converts all to cookie definition */
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


module.exports = function(ob){
	return new jXObject(ob)
}
//module.exports = xObject

function xObject(ob){
	return new jXObject(ob)
}
//for(var x in xObject.prototype)xObject.prototype[x] = jXObject.prototype[x]

/** Returns function to loop an object/array
	@method(var, index, object)
*/
xObject.map = function(method){
	return function(ob){
		return map(ob,method)
	}
}

/** loop an object
	@method(var, index, object)
*/
xObject.forEach = function(method){
	return function(ob){
		return forEach(ob,method)
	}
}

/** Loop an object or an array. Returns array of loop results
	@method(var, index, object)
*/
function map(ob, method){
	if(ob.constructor && ob.contructor==Array){
		return mapArray(ob, method)
	}

	var res = {}
	for(var x in ob){
		res[x] = method(ob[x], x, ob)
	}

	return res
}

function mapArray(ob, method){
	var res = []
	for(var x=0; x < ob.length; ++x){
		res[x] = method(ob[x], x, ob)
	}

	return res
}

/** @method(var, index, object) */
function forEach(ob, method){
	if(ob.forEach){
		ob.forEach(method)
	}else{
		for(var x in ob){
			method(ob[x], x, ob)
		}
	}

	return ob
}

function isArray(ob){
	return ob.constructor && ob.constructor==Array
}

//object.assign polyfill
function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}