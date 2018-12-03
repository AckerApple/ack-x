export declare class jXNumber {
    number: number;
    constructor(number: any);
    getSuffix(): string;
    decimalFormat(p: any): string;
    asMinutesToDateTime(options: any): Date;
    asMinutesToTime(options: any): string;
}
export declare function suffixByNumber(i: any): string;
export declare function method(path: any): jXNumber;
