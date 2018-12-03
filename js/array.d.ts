export declare class jXArray {
    array: any[];
    constructor(array: any);
    each(method0: any, method1: any, method2: any, method3: any): this;
    distinct(method: any): this;
    objectify(): {};
    appendArray(): this;
    union: () => this;
    prependArray(): this;
    reduce(method: (accumlatedValue: any, value: any, index: number, array: any[]) => any, initValue?: any): any;
    sum(method?: (value: any) => any): any;
    average(method?: (value: any) => any): any;
    map(method: (value: any, index: number, array: any[]) => any): any[];
    group(method: any, isIndexValue: any, grouptype: any): {};
}
export declare function method(path: any): jXArray;
