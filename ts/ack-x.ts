declare var require: any;

import { Vm } from "./jc"

import { ack as ackX, ackExpose } from "./ack"

export const ack = ackX

/* CORE MODULES */
	ack['modules'].definePath('error','./error')
	ack['modules'].definePath('number','./number')
	ack['modules'].definePath('string','./string')
	ack['modules'].definePath('binary','./binary')
	ack['modules'].definePath('base64','./base64')
	ack['modules'].definePath('method','./method')
	ack['modules'].definePath('array','./array')
	ack['modules'].definePath('object','./object')
	ack['modules'].definePath('queryObject','./queryObject')
	ack['modules'].definePath('week','./week')
	ack['modules'].definePath('month','./month')
	ack['modules'].definePath('year','./year')
	ack['modules'].definePath('date','./date')
	ack['modules'].definePath('time','./time')
	ack['modules'].definePath('function','./function')

	ack['modules'].getModule = function(name,path){
	  if(this.$storage[name])return this.$storage[name]
	  const r = require(path)

	  // TODO: remove "|| r" once all is moved to Typescript and defaults are removed
	  this.$storage[name] = r.method || r

	  return this.$storage[name]
	}

	//deprecated
	ack['accessors'] = function($scope){
		return new Vm($scope)
	}
/* end: CORE MODULES */