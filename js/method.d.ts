export declare class jXMethod {
    method: any;
    name: any;
    constructor(method: any, name?: any);
    runInMs(ms: any): this;
    getArgNameArray(): string[];
    getDefinition(): string;
    expect(nameOrMap: any, value: any, requiredOrType: any, type: any): this;
    expectOne(name: any, value: any, requiredOrType?: any, type?: any): this;
    getName(): any;
    getOldSchoolName(): any;
}
export declare function method(path: any): jXMethod;
