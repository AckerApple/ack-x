export declare function method(ob: any): jXObject;
export declare class jXObject {
    object: any;
    constructor(object: any);
    /** @method(item, index, object) */
    forEach(method: any): this;
    assign(...args: any[]): this;
    /** aka deepClone */
    deepAssign(...args: any[]): this;
    /** When object, returns similar object with key values as results of mapping
        map array or object @method(item, index, object)

    */
    map(method: any): {};
    isArray(): boolean;
    /**
        @method(type, subs, key)
    */
    getTypeMap(mapper?: any): any;
    /** tests Object for circular references */
    isCyclic(): boolean;
    /** like JSON.stringify but converts all to cookie definition */
    toCookieString: () => string;
}
