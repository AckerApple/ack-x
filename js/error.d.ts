export declare function method(errorObject: any): jError;
export declare class jError {
    types: any;
    errorObject: any;
    stackArray: any[];
    constructor(errorObject?: any);
    toObject(): {};
    /** returns all object keys of an error which is takes extra steps */
    getKeys(): string[];
    /** converts error.stack into array via stack.split(' at ') */
    getStackArray(): any[];
    /** dig out just the stack trace from error */
    getTraceArray(amount: any): any[];
    /** dig out only just the first trace of errors stack trace */
    getFirstTrace(amount?: number): string;
    setStackArray(stackArray: any): this;
    /** analyzes stack to remove 1st trace (leaves error message in stack). Essentially calls .splice(1,1) on stack array  */
    cutFirstTrace(): this;
    /** attempt to extract a line number from the error */
    getLineNum(): number;
    /** attempt to extract a file path from the error */
    getFilePath(): string;
    /** attempt to extract the error's name */
    getName(): any;
    /** attempt to extract the named function or code that is running */
    getFailingObjectName(): string;
    /** get a message from the error even if it has no message */
    getMessage(): any;
    /** attempt to extract the error's type */
    getType(): any;
    /** attempt to compare error with another error or another type of an error */
    isType(type: any): boolean;
}
export declare const jErrorTypes: any;
