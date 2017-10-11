export declare class jXArray {
    array: any[];
    constructor(array: any);
    /**
        Intended for high performance by looping an array only once but performing multiple actions.
        Run multiple functions for each iteration of an array.

        Example: array.each(countTeacher, countChild) instead of two loops array.each(countTeacher) + array.each(countChild)
    */
    each(method0: any, method1: any, method2: any, method3: any): this;
    /** reduce array down to only distinct items
        @method - optional, returned value is used to determine distinctness
    */
    distinct(method: any): this;
    objectify(): {};
    appendArray(): this;
    union: () => this;
    prependArray(): this;
    /** ads an array all up
        @method - optional. Returned value is used to sum
    */
    sum(method: any): number;
    /** break an array into buckets of arrays
        @isIndexValue=false - when true, buckets of arrays will be corresponding index values back to original array
        @grouptype='sequence' - ('sequence'||'struct') . sequence, array of arrays = [ [],[],[] ] . struct = {value0:[buckets...], value1:[buckets...]}
    */
    group(method: any, isIndexValue: any, grouptype: any): {};
}
export declare function method(path: any): jXArray;
