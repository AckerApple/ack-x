import { AckDate, method as xDate } from "./date"
//export * from "./date"

export class ackYear{
	date:Date
	endDate:Date

	constructor(yyyy?){
		if(yyyy!=null)this.setStartDate(yyyy)
		return this		
	}

	setStartDate(date){
		var isObject = typeof(date) == 'object',
			isYearString = !isObject && !isNaN(Number(date)),
			isYear = isYearString || (!xDate(date).isDate() && !isNaN(date))

		if(isYear){//just the year number?
			date = new Date(new Date('1/1/2011').setFullYear(date))
		}

		this.date = date
		return this
	}

	getStartDate(){
		if(this.date)return this.date
		var d = '1/1/'+xDate(new Date()).year()
		this.date = new Date(d)
		return this.date
	}

	setEndDate(date){
		if(!xDate(date).isDate() && !isNaN(date))//just the year number?
			this.date = new Date('12/31/'+date)
		else
			this.date = date
		return this
	}

	getEndDate(){
		if( this.endDate )return this.endDate
		var d = '12/31/'+this.getYear()
		this.endDate = new Date(d)
		return this.endDate
	}

	StartDate(isClone?):AckDate{
		var startDate = !isClone ? this.getStartDate() : this.getStartDate()
		return xDate(startDate)
	}

	xDate(){
		return xDate(this.getStartDate())
	}

	month(){
		return this.StartDate().month()
	}
	getMonth = this.month//deprecated

	week(){
		return this.StartDate().week()
	}
	getWeek = this.week//deprecated

	//?deprecated (duplicate of Date class)
	getYear(){
		var d = this.getStartDate()
		return xDate(d).year()
	}
	year = this.getYear

	//gets startdate and changes the year
	setYear(yyyy){
		var ExYy = xDate(yyyy)
		if(isNaN(yyyy) && ExYy.isDate())
			yyyy = ExYy.year()

		var date = this.getStartDate()
		date = new Date( date.setFullYear(yyyy) )
		this.setStartDate(date)

		return this
	}

	getDateOfLastWeekday(){
		var d = this.getStartDate()
			,addAmount = -xDate(d).dayOfWeek()+6
			,dateA = new Date( d.setDate(d.getDate()+addAmount) )

		dateA = new Date(dateA.setHours(23))
		dateA = new Date(dateA.setMinutes(59))
		dateA = new Date(dateA.setSeconds(59))

		return dateA
	}
}

export function method(path){
	return new ackYear(path)
}