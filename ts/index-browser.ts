import { ackExpose, ackAppends } from "./ack"

import { method as errorMethod } from "./error"
import { method as numberMethod } from "./number"
import { method as stringMethod } from "./string"
import { method as binaryMethod } from "./binary"
import { method as base64Method } from "./base64"
import { method as objectMethod } from "./object"
import { method as arrayMethod } from "./array"
import { method as queryObjectMethod } from "./queryObject"
import { method as weekMethod } from "./week"
import { method as monthMethod } from "./month"
import { method as yearMethod } from "./year"
import { method as dateMethod } from "./date"
import { method as timeMethod } from "./time"
import { method as methodMethod } from "./method"

export class ack extends ackExpose{
  constructor( $var? ){
    super( $var )
    if(!this)return new ack($var)
    return this
  }

  ackit(name){
    return ack[name]
  }
  
  public error = errorMethod
  public number = numberMethod
  public string = stringMethod
  public binary = binaryMethod
  public base64 = base64Method
  public object = objectMethod
  public array = arrayMethod
  public queryObject = queryObjectMethod
  public week = weekMethod
  public month = monthMethod
  public year = yearMethod
  public date = dateMethod
  public time = timeMethod
  public method = methodMethod

  static error = errorMethod
  static number = numberMethod
  static string = stringMethod
  static binary = binaryMethod
  static base64 = base64Method
  static object = objectMethod
  static array = arrayMethod
  static queryObject = queryObjectMethod
  static week = weekMethod
  static month = monthMethod
  static year = yearMethod
  static date = dateMethod
  static time = timeMethod
  static method = methodMethod
}

//export const ack = new Ack()