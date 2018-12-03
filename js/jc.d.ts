export declare function isF(f: any): boolean;
export declare function each(a: any, meth: any, context: any): any;
export declare function clear(s: any): void;
export declare function paramdata(): any;
export declare function set(nameOrInitStruct: any, value: any): any;
export declare function setByAccessor(nameOrInitStruct: any, value: any): any;
export declare function init($scope: any): any;
export declare function get(name: any, def: any, stick: any, nullop: any): any;
export declare function param(name: any, def: any, stick: any, nullop: any): any;
export declare function runNullOp(name: any, def: any, stick: any, dM: any): any;
export declare class Vm {
    data: any;
    constructor(args?: any);
    set: typeof setByAccessor;
    get: (name: any) => any;
    defined(name: any): any;
    getExactName: (name: any) => any;
    param(name: any, def: any): any;
    remove: (name: any) => any;
    clearVars: () => any;
    setNewData: (value: any) => any;
}
