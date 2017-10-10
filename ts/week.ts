//import jc = require('./jc')
import { Month } from "./month"
import { method as AckDate } from "./date"

export class Week extends Month{
	getEndDate(){
		if(this.endDate)return this.endDate
		this.endDate = new Date(this.getStartDate().getDate() + 6)
		return this.endDate
	}

	setEndDate(date){
		if( !AckDate(date).isDate() && !isNaN(date) )//just the month number?
			this.endDate = AckDate( new Date() ).setMonth(date).getLastDateOfMonth()
		else
			this.endDate = date

		return this
	}
	
	setStartDate(date){
		if(!isNaN(date) && date.constructor != Date)//just the month number?
			this.date = AckDate(new Date()).gotoWeek(date).date
		else
			this.date = date
		return this
	}

	getStartDate(){
		if(!this.date)
			this.date = AckDate(new Date()).getDateWeekStart()
		return this.date
	}

}

export function method(path){
	return new Week(path)
}