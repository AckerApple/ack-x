import { AckDate } from "./date";
export { AckDate } from "./date";
export declare const monthLcaseNameArray: string[];
export declare class Month extends AckDate {
    date: Date;
    endDate: Date;
    monthLcaseNameArray: string[];
    constructor(num?: any);
    setStartDate(date: any): this;
    getMonthIndexByString(mon: any): number;
    StartDate(isClone: any): AckDate;
    xDate(): AckDate;
    getStartDate(): Date | this;
    setEndDate(date: any): this;
    getEndDate(): Date;
}
export declare function method(num: any): Month;
