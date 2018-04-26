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
  constructor($var){
    super( $var )
    return this
  }

  ackit(name){
    return ack[name]
  }
  
  public static error = errorMethod
  public static number = numberMethod
  public static string = stringMethod
  public static binary = binaryMethod
  public static base64 = base64Method
  public static object = objectMethod
  public static array = arrayMethod
  public static queryObject = queryObjectMethod
  public static week = weekMethod
  public static month = monthMethod
  public static year = yearMethod
  public static date = dateMethod
  public static time = timeMethod
  public static method = methodMethod
}