export declare function method(ob: any): jXObject;
export declare class jXObject {
    object: any;
    constructor(object: any);
    forEach(method: any): jXObject;
    assign(...args: any[]): jXObject;
    deepAssign(...args: any[]): jXObject;
    map(method: any): {};
    isArray(): boolean;
    getTypeMap(mapper?: any): any;
    isCyclic(): boolean;
    toCookieString: () => string;
}
