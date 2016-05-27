"use strict";

function xObject(ob){
	return new jXObject(ob)
}

xObject.map = function(method){
	return function(ob){
		return map(ob,method)
	}
}

xObject.forEach = function(method){
	return function(ob){
		return forEach(ob,method)
	}
}


function jXObject(object){
	this.object = object
	return this
}

/** @method(item, index, object) */
jXObject.prototype.forEach = function(method){
	xObject.forEach(method)(this.object)
	return this
}

/**
	this.object will be the map result
	@method(item, index, object)
*/
jXObject.prototype.map = function(method){
	xObject.map(method)(this.object)
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


module.exports = xObject


function map(ob, method){
	if(ob.map){
		return ob.map(method)
	}

	var res = {}
	for(var x in ob){
		res[x] = method(ob[x], x, ob)
	}

	return res
}

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