export declare const Buffer: any;
export declare class ExString {
    string: string;
    static _keyStr: string;
    constructor(string: any);
    isEmail(): boolean;
    repeat(num: any): string;
    htmlFormat(): string;
    toBase64(): string;
    _utf8_encode(): string;
    toHex(encType: any): any;
    toBinary(encType: any): any;
}
export declare function method(variable: number): ExString;
