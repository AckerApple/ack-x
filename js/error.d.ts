export declare function method(errorObject: any): jError;
export declare class jError {
    types: any;
    errorObject: any;
    stackArray: any[];
    constructor(errorObject?: any);
    toObject(): {};
    getKeys(): string[];
    getStackArray(): any[];
    getTraceArray(amount: any): any[];
    getFirstTrace(amount?: number): string;
    setStackArray(stackArray: any): this;
    cutFirstTrace(): this;
    getLineNum(): number;
    getFilePath(): string;
    getName(): any;
    getFailingObjectName(): string;
    getMessage(): any;
    getType(): any;
    isType(type: any): boolean;
}
export declare const jErrorTypes: any;
