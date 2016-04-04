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
