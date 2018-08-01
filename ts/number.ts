export class jXNumber{
  number:number

  constructor(number){
  	this.number = number
  	return this
  }

  getSuffix(){
    return this.number == null ? '' : suffixByNumber( this.number )
  }

  /** @p - decimal places */
  decimalFormat(p){
    p = p==null ? 2 : p
    var m=Math.pow(10,p)
      ,n=this.number
    return (Math.round(n*m)/m).toFixed(p)
  }

  /** convert set number into how many minutes into a date. Ex: 60 = new Date('2016-01-16 1:00:00.0')
    @options - {}
    @options.date - default=new Date()
  */
  asMinutesToDateTime(options){
    options = options || {}
    var minute = this.number
    var iDate = options.date || new Date()
    var date = new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), 0, minute)
    return date
  }

  /** convert set number into how many minutes into a string date. Ex: 60 = 1:00 AM')
    @options = {}
    @options.timeDelim - default=':'
    @optiosn.dayPeriodDelim - default=' '
  */
  asMinutesToTime(options){
    options = options || {}
    options.timeDelim = options.timeDelim || ':'
    options.dayPeriodDelim = options.dayPeriodDelim || ' '
    var d = this.asMinutesToDateTime(options)
    var hour = d.getHours()
    var tt = 'AM'
    var mins:string|number = d.getMinutes()

    if(hour > 12){
      tt = 'PM'
      hour = hour - 12
    }

    mins = mins.toString().length == 1 ? '0'+mins : mins

    return hour +options.timeDelim+ mins +options.dayPeriodDelim+ tt;
  }

}

export function suffixByNumber(i):string{
  if(!i)return ''

  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return "st";
  }
  if (j == 2 && k != 12) {
      return "nd";
  }
  if (j == 3 && k != 13) {
      return "rd";
  }
  return "th";
}

export function method(path){
  return new jXNumber(path)
}