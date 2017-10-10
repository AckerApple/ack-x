/** calling ack() as function, will return a module to work with almost any object */
export declare const ack: any;
export declare class ackExpose {
    $var: any;
    dump: (spacing: any) => string;
    constructor($var: any);
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
    byName(name: any): any;
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
