import { ackInjector } from "./ackInjector";
import * as ackObject from "./object";
export declare function ack($var: any): ackExpose;
export declare const ackAppends: {
    modules: ackInjector;
    object: typeof ackObject;
    throwBy: (ob: any, msg: any) => never;
    logArrayTo: (array: any, logTo: any) => void;
    logError: (err: any, msg: any, logTo: any) => void;
    injector: ($scope: any) => ackInjector;
    promise: (var0?: any, var1?: any, var2?: any, var3?: any) => any;
    Promise: (resolver: any) => any;
    debug: (name: any, log0: any, log1: any, log2: any) => any;
};
export declare class ackExpose {
    $var: any;
    constructor($var: any);
    ackit(name: any): any;
    static ackit(name: any): any;
    ackGet(name: any): any;
    static throwBy: (ob: any, msg: any) => never;
    static logArrayTo: (array: any, logTo: any) => void;
    static logError: (err: any, msg: any, logTo: any) => void;
    static injector: ($scope: any) => ackInjector;
    static promise: (var0?: any, var1?: any, var2?: any, var3?: any) => any;
    static Promise: (resolver: any) => any;
    static debug: (name: any, log0: any, log1: any, log2: any) => any;
    static error(v: any): any;
    static number(v: any): any;
    static string(v: any): any;
    static binary(v: any): any;
    static base64(v: any): any;
    static method(v: any): any;
    static array(v: any): any;
    static queryObject(v: any): any;
    static week(v: any): any;
    static month(v: any): any;
    static year(v: any): any;
    static date(v: any): any;
    static time(v: any): any;
    function(): any;
    getSimpleClone(): {};
    get(name: any, def?: any): any;
    byName(name: any): ackExpose;
    throw(msg: any, logTo: any): this;
    stringify(spacing: any): string;
    dump(spacing: any): string;
    getBit(): 0 | 1;
    nullsToEmptyString(): this;
    getBoolean(): any;
    isBooleanLike(): boolean;
}
