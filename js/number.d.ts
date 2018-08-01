export declare class jXNumber {
    number: number;
    constructor(number: any);
    getSuffix(): string;
    /** @p - decimal places */
    decimalFormat(p: any): string;
    /** convert set number into how many minutes into a date. Ex: 60 = new Date('2016-01-16 1:00:00.0')
      @options - {}
      @options.date - default=new Date()
    */
    asMinutesToDateTime(options: any): Date;
    /** convert set number into how many minutes into a string date. Ex: 60 = 1:00 AM')
      @options = {}
      @options.timeDelim - default=':'
      @optiosn.dayPeriodDelim - default=' '
    */
    asMinutesToTime(options: any): string;
}
export declare function suffixByNumber(i: any): string;
export declare function method(path: any): jXNumber;
