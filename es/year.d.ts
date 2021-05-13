import { AckDate } from "./date";
export declare class ackYear {
    date: Date;
    endDate: Date;
    constructor(yyyy?: any);
    setStartDate(date: any): this;
    getStartDate(): Date;
    setEndDate(date: any): this;
    getEndDate(): Date;
    StartDate(isClone?: any): AckDate;
    xDate(): AckDate;
    month(): number;
    getMonth: () => number;
    week(): number;
    getWeek: () => number;
    getYear(): any;
    year: () => any;
    setYear(yyyy: any): this;
    getDateOfLastWeekday(): Date;
}
export declare function method(path: any): ackYear;
