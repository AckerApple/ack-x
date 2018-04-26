import { ackExpose, ack as ackX } from "./ack"

export function ack($var){
  return ackX($var)
}

import { method as errorMethod } from "./error"
ack['error'] = errorMethod

import { method as numberMethod } from "./number"
ack['number'] = numberMethod

import { method as stringMethod } from "./string"
ack['string'] = stringMethod

import { method as binaryMethod } from "./binary"
ack['binary'] = binaryMethod

import { method as base64Method } from "./base64"
ack['base64'] = base64Method

import { method as objectMethod } from "./object"
ack['object'] = objectMethod

import { method as arrayMethod } from "./array"
ack['array'] = arrayMethod

import { method as queryObjectMethod } from "./queryObject"
ack['queryObject'] = queryObjectMethod

import { method as weekMethod } from "./week"
ack['week'] = weekMethod

import { method as monthMethod } from "./month"
ack['month'] = monthMethod

import { method as yearMethod } from "./year"
ack['year'] = yearMethod

import { method as dateMethod } from "./date"
ack['date'] = dateMethod

import { method as timeMethod } from "./time"
ack['time'] = timeMethod

import { method as methodMethod } from "./method"
ack['method'] = methodMethod

//declare var module: any;
//module.exports = ack