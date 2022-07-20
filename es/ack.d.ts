import { ackInjector } from "./ackInjector";
import { jError } from "./error";
export declare class ackExpose {
    $var: any;
    constructor($var: any);
    throwBy(ob: any, msg: any): void;
    logArrayTo(array: any, logTo: any): void;
    static injector($scope: any): ackInjector;
    static promise(var0?: any, var1?: any, var2?: any, var3?: any): any;
    static Promise(resolver: any): any;
    static error(v: any): jError;
    static number(v: any): import("./number").jXNumber;
    static object(v: any): import("./object").jXObject;
    static string(v: any): import("./string").ExString;
    static binary(v: any): import("./binary").jXBinary;
    static base64(v: any): import("./base64").jXBase64;
    static method(v: any): import("./method").jXMethod;
    static array(v: any): import("./array").jXArray;
    static queryObject(v: any): import("./queryObject").jXQueryObject;
    static week(v: any): import("./week").Week;
    static month(v: any): import("./month").Month;
    static year(v: any): import("./year").ackYear;
    static date(v: any): import("./date").AckDate;
    static time(v: any): import("./date").AckDate;
    getSimpleClone(): {};
    get(name: any, def?: any): any;
    stringify(spacing: any): string;
    dump(spacing: any): string;
    getBit(): 1 | 0;
    nullsToEmptyString(): this;
    getBoolean(): Number | Boolean;
    isBooleanLike(): boolean;
}