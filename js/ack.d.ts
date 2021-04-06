import { ackInjector } from "./ackInjector";
import * as ackObject from "./object";
import { jError } from "./error";
export declare const ackAppends: {
    modules: ackInjector;
    object: typeof ackObject;
    throwBy: (ob: any, msg: any) => never;
    logArrayTo: (array: any, logTo: any) => void;
    logError: (err: any, msg: any, logTo: any) => void;
    injector: ($scope: any) => ackInjector;
    promise: (var0?: any, var1?: any, var2?: any, var3?: any) => any;
    Promise: (resolver: any) => any;
};
export declare class ackExpose {
    $var: any;
    constructor($var: any);
    ackit(name: any): any;
    static ackit(name: any): any;
    ackGet(name: any): any;
    throwBy: (ob: any, msg: any) => never;
    logArrayTo: (array: any, logTo: any) => void;
    logError: (err: any, msg: any, logTo: any) => void;
    injector: ($scope: any) => ackInjector;
    promise: (var0?: any, var1?: any, var2?: any, var3?: any) => any;
    Promise: (resolver: any) => any;
    error(v: any): jError;
    number(v: any): any;
    string(v: any): any;
    binary(v: any): any;
    base64(v: any): any;
    method(v: any): any;
    array(v: any): any;
    queryObject(v: any): any;
    week(v: any): any;
    month(v: any): any;
    year(v: any): any;
    date(v: any): any;
    time(v: any): any;
    function(): any;
    getSimpleClone(): {};
    get(name: any, def?: any): any;
    byName(name: any): ackExpose;
    throw(msg: any, logTo: any): this;
    stringify(spacing: any): string;
    dump(spacing: any): string;
    getBit(): 0 | 1;
    nullsToEmptyString(): this;
    getBoolean(): Number | Boolean;
    isBooleanLike(): boolean;
}
export declare function ack($var: any): ackExpose;
export declare namespace ack {
    var error: (v: any) => jError;
}
