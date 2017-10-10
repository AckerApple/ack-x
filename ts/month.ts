import { AckDate, method as xDate } from "./date"
export { AckDate } from "./date"

export const monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

export class Month extends AckDate{
	date:Date
	endDate:Date
	monthLcaseNameArray = monthLcaseNameArray

	constructor(num?){
		super()

		if( num!=null ){
			this.setStartDate(num)
		}

		return this
	}

	setStartDate(date){
		var jDate = xDate()
		if(!jDate.isDate(date)){
			var num = Number(date)

			if(!isNaN(num)){//just the month number?
				date = xDate().now().setDate(1).setMonth(date).date
			}else{
				var i = this.getMonthIndexByString(date)
				date = xDate(new Date()).setDate(1).setMonth(i+1).date
			}
		}
		
		this.date = date
		
		return this
	}
	
	getMonthIndexByString(mon){
		return monthLcaseNameArray.indexOf( mon.toLowerCase() )
	}

	StartDate(isClone):AckDate{
		var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
		return xDate(startDate)
	}

	xDate(){
		return xDate(this.getStartDate())
	}

	getStartDate(){
		if(this.date)return this.date
		this.date = new Date(new Date().setDate(1))
		return this
	}

	setEndDate(date){
		if( !xDate(date).isDate() && !isNaN(date) )//just the month number?
			this.endDate = xDate( new Date() ).setMonth(date).getLastDateOfMonth()
		else
			this.endDate = date

		return this
	}

	getEndDate(){
		if(this.endDate)return this.endDate
		var d = '12/31/' + this.getYear()
		this.endDate = new Date(d)
		return this.endDate
	}
}

export function method(num){
	return new Month(num)
}