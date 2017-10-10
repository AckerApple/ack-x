import { ack as ackX } from "./ack-x"

declare var require: any;

//export const ack:any = ackX


//ackX.modules.definePath('object','./js/object')
ackX.modules.definePath('error','./error')
ackX.modules.definePath('number','./number')
ackX.modules.definePath('string','./string')
ackX.modules.definePath('binary','./binary')
ackX.modules.definePath('base64','./base64')
ackX.modules.definePath('method','./method')
ackX.modules.definePath('array','./array')
ackX.modules.definePath('queryObject','./queryObject')
ackX.modules.definePath('week','./week')
ackX.modules.definePath('month','./month')
ackX.modules.definePath('year','./year')
ackX.modules.definePath('date','./date')
ackX.modules.definePath('time','./time')
ackX.modules.definePath('function','./function')

//ensure modules are loaded by a lazy require
ackX.modules.getModule = function(name,path){
  if(this.$storage[name])return this.$storage[name]
  const r = require(path)

  // TODO: remove "|| r" once all is moved to Typescript and defaults are removed
  this.$storage[name] = r.method || r

  return this.$storage[name]
}

declare var module: any;

export const ack = ackX
module.exports = ack