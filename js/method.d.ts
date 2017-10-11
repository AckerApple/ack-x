export declare class jXMethod {
    method: any;
    name: any;
    constructor(method: any, name?: any);
    /** sets a timeout and then runs set method in milsecs */
    runInMs(ms: any): this;
    /** returns array of argument names defined within set function */
    getArgNameArray(): string[];
    /** get set functions inner definition */
    getDefinition(): string;
    /** This is an option enhanced version of expectOne */
    expect(nameOrMap: any, value: any, requiredOrType: any, type: any): this;
    /** Build argument validation for when set function is invoked.
        @name - argument-name
        @value - runtime value argument-value
        @required
        @type - requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true
    */
    expectOne(name: any, value: any, requiredOrType?: any, type?: any): this;
    /** for processing current arguments */
    /** gets name of defined function */
    getName(): any;
    /** gets name of defined function */
    getOldSchoolName(): any;
}
export declare function method(path: any): jXMethod;
