import { ackExpose } from "./ack";
import { method as errorMethod } from "./error";
import { method as numberMethod } from "./number";
import { method as stringMethod } from "./string";
import { method as binaryMethod } from "./binary";
import { method as base64Method } from "./base64";
import { method as objectMethod } from "./object";
import { method as arrayMethod } from "./array";
import { method as queryObjectMethod } from "./queryObject";
import { method as weekMethod } from "./week";
import { method as monthMethod } from "./month";
import { method as yearMethod } from "./year";
import { method as dateMethod } from "./date";
import { method as timeMethod } from "./time";
import { method as methodMethod } from "./method";
export declare class ack extends ackExpose {
    constructor($var?: any);
    ackit(name: any): any;
    error: typeof errorMethod;
    number: typeof numberMethod;
    string: typeof stringMethod;
    binary: typeof binaryMethod;
    base64: typeof base64Method;
    object: typeof objectMethod;
    array: typeof arrayMethod;
    queryObject: typeof queryObjectMethod;
    week: typeof weekMethod;
    month: typeof monthMethod;
    year: typeof yearMethod;
    date: typeof dateMethod;
    time: typeof timeMethod;
    method: typeof methodMethod;
    static error: typeof errorMethod;
    static number: typeof numberMethod;
    static string: typeof stringMethod;
    static binary: typeof binaryMethod;
    static base64: typeof base64Method;
    static object: typeof objectMethod;
    static array: typeof arrayMethod;
    static queryObject: typeof queryObjectMethod;
    static week: typeof weekMethod;
    static month: typeof monthMethod;
    static year: typeof yearMethod;
    static date: typeof dateMethod;
    static time: typeof timeMethod;
    static method: typeof methodMethod;
}
export default ack;
