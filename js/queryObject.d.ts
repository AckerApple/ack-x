export declare class jXQueryObject {
    queryObject: any;
    constructor(object: any);
    getNameArray(): string[];
    toCsv(delimOrOptions: any, textQualifier: any, titleArray: any): any;
    Csv(delimOrOptions: any, textQualifier: any, titleArray: any): jXQueryObjectCsv;
}
export declare class jXQueryObjectCsv {
    data: any;
    constructor(queryObject?: any, $scope?: any);
    getTitleArray(): any;
    output(): string;
    toArray(): any[];
}
export declare function method(variable: any): jXQueryObject;
