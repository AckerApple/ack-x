import { ackInjector } from "./ackInjector";
import * as ackObject from "./object";
/** calling ack() as function, will return a module to work with almost any object */
export declare function ack($var: any): ackExpose;
export declare const ackAppends: {
    modules: ackInjector;
    object: typeof ackObject;
    throwBy: (ob: any, msg: any) => never;
    logArrayTo: (array: any, logTo: any) => void;
    logError: (err: any, msg: any, logTo: any) => void;
    injector: ($scope: any) => ackInjector;
    promise: (var0: any, var1: any, var2: any, var3: any) => any;
    Promise: (resolver: any) => any;
    debug: (name: any, log0: any, log1: any, log2: any) => any;
};
export declare class ackExpose {
    $var: any;
    dump: (spacing: any) => string;
    constructor($var: any);
    ackit(name: any): any;
    ackGet(name: any): any;
    error(): any;
    number(): any;
    string(): any;
    binary(): any;
    base64(): any;
    method(): any;
    array(): any;
    queryObject(): any;
    week(): any;
    month(): any;
    year(): any;
    date(): any;
    time(): any;
    function(): any;
    getSimpleClone(): {};
    /** get at raw variable within target variable with case insensativity */
    get(name: any, def?: any): any;
    /** $var[name] returned as ack Object. When null, null returned */
    byName(name: any): ackExpose;
    throw(msg: any, logTo: any): this;
    /** JSON.stringify with default spacing=2 */
    stringify(spacing: any): string;
    /** negative numbers will be 0  */
    getBit(): 0 | 1;
    nullsToEmptyString(): this;
    /** reduces variable to a true/false */
    getBoolean(): any;
    isBooleanLike(): boolean;
}
