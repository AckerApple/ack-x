"use strict";
var ack = global.ack,
	AckDate = require('../../js/date').AckDate,
	assert = require('assert')

var isDst = ack.date().now().isDst()
var wasDst = ack.date('2/12/2013').isDst()
var wasDst2 = ack.date('6/1/2016').isDst()
var dtsMatch = wasDst && !wasDst2
var tzStamp = ack.date().getTimezoneStamp()
var tzIt = it

console.info('isDaylightSavings',isDst, 'Timezone', tzStamp)

if( tzStamp!='-0500' ){
	tzIt = it.skip
}

describe('ack.date',function(){
	var date,ndate

	beforeEach(function(){
		date = ack.date('2/12/2013')
		ndate = ack.date(new Date())
	})

	it('zeroHour',function(){
		assert.equal(ack.date(0).date.getMinutes(), new Date(0).getMinutes())
	})

	it('#utc',function(){
		var format = ack.date('2016-12-28').utc()
		assert.equal(typeof format, 'number')
	})

	it('#getUtcDate',function(){
		var format = ack.date('2016-12-28').getUtcDate()
		assert.equal(format.constructor, Date)
	})

	it('#toUtc',function(){
		var format = ack.date('2016-12-28').toUtc()
		assert.equal(format.constructor, AckDate)
	})

	it('reformats',function(){
		var format = ack.date('2016-12-28').mmddyyyy('-')
		assert.equal(format, '12-28-2016')
	})

	it('#dayOfYear',function(){
		assert.equal(ack.date('2016-12-28').dayOfYear(), 363)
		assert.equal(ack.date('2017-08-11').dayOfYear(), 223)
	})

	it('#getTimezoneStamp',function(){
		assert.equal(ack.date().getTimezoneStamp().length, 5)
		assert.equal(ack.date().getTimezoneStamp(':').length, 6)
	})

	it('#getAgeDisplay',function(){
		assert.equal(ack.date().now().addYear(-5).getAgeDisplay(), 5)
	})

	it('#greater',function(){
		assert.equal(ack.date().now().greater( Date.now() ), false)
		assert.equal(ack.date().now().addYear(-5).greater( Date.now() ), true)
		assert.equal(ack.date().now().addYear(5).greater( Date.now() ), false)
	})

	it('#lesser',function(){
		assert.equal(ack.date().now().lesser( Date.now() ), false)
		assert.equal(ack.date().now().addYear(-5).lesser( Date.now() ), false)
		assert.equal(ack.date().now().addYear(5).lesser( Date.now() ), true)
	})

	it('#addYears',function(){
		assert.equal(ack.date().now().addYears(5).yearsFromNow(), 5)
	})

	it('#isDate',function(){
		assert.equal(ack.date().isDate(), true)
		assert.equal(ack.date(null).isDate(), false)
		assert.equal(ack.date(new Date()).isDate(), true)
	})

	it('#yearsFromNow',function(){
		assert.equal(ack.date().now().addYear(-5).yearsFromNow(), 5)
	})

	it('#daysFromNow',function(){
		assert.equal(ack.date().now().addMinutes(1).addDays(-2).daysFromNow(), 2)
	})

	it('#fromToday',function(){
		assert.equal(ack.date().now().gotoSod().addDays(-2).fromToday(), '2 days ago')
		assert.equal(ack.date().now().gotoSod().fromToday(), 'a few seconds ago')
		assert.equal(ack.date().now().gotoSod().addDays(2).fromToday(), 'in 2 days')
		assert.equal(ack.date().now().gotoSod().addDays(2).fromToday(true), '2 days')
	})

	it('#fromNow',function(){
		assert.equal(ack.date().now().addMinutes(-15).fromNow(), '15 minutes ago')
		assert.equal(ack.date().now().addMinutes(-15).fromNow(true), '15 minutes')

		assert.equal(ack.date().now().addYears(-1).fromNow(), 'a year ago')
		assert.equal(ack.date().now().from( new Date()-31536000000 ), 'a year ago')

		assert.equal(ack.date().now().addYears(-1).fromNow(true), 'a year')
		assert.equal(ack.date().now().from( new Date()-31536000000, true ), 'a year')
	})

	it('#from',function(){
		var d = ack.date().now().addMinutes(-15).date
		assert.equal(ack.date().now().from(d), '15 minutes ago')
		assert.equal(ack.date().now().from(d, true), '15 minutes')
		assert.equal(ack.date('Tue Jul 25 2017 16:43:00 GMT-0400 (EDT)').from('Tue Jul 25 2017 16:44:00 GMT-0400 (EDT)', true), 'a minute')
		assert.equal(ack.date(0).from(900000, true), '15 minutes')
	})

	it.only("#from(roundMinsUp)",function(){
		var d = ack.date(1520341763000)
		var compare = ack.date(1520341894000).from(d,true,{roundUpMins:1})
		assert.equal(compare, '3 minutes')

		//reverse order of previous dates
		var d = ack.date(1520341894000)
		var compare = ack.date(1520341763000).from(d,true,{roundUpMins:1})
		assert.equal(compare, '3 minutes')

		var d = ack.date(1520175204000)
		var compare = ack.date(1520175058000).from(d,true,{roundUpMins:1})
		assert.equal(compare, '3 minutes')

		var d = ack.date(1520686184000)
		var compare = ack.date(1520686495000).from(d,true,{roundUpMins:1})
		assert.equal(compare, '6 minutes')
	})

	it("#from(roundHoursUp)",function(){
		var d = ack.date('2018-03-06T13:00:00.000Z')
		var compare = ack.date('2018-03-06T15:01:00.000Z').from(d,true,{roundUpHours:1})
		assert.equal(compare, '3 hours')
	})

	tzIt('#isDaylightSavings',function(){
		assert.equal(ack.date('2/12/2013').isDaylightSavings(), (isDst && dtsMatch) || (!isDst && dtsMatch), '2/12/2013 is not daylight savings')
		assert.equal(ack.date('6/1/2016').isDaylightSavings(), (isDst && !dtsMatch) || (!isDst && !dtsMatch), '6/1/2016 is not daylight savings')
	})

	it('accepts-number',function(){
		assert.equal(ack.date(1457471202852).date.getTime(), 1457471202852)
	})

	it('#getFullYear',function(){
		var D = new Date()
		assert.equal(ack.date(D).date.toString(), D.toString())
		assert.equal(ack.date(D).date.getFullYear(), D.getFullYear())
	})

	it('#gt',function(){
		assert.equal(ndate.gt(date),true,'Todays date is greater')
		assert.equal(ndate.gt('2/21/2013'),true,'Todays date is greater')
	})

	it('#lt',function(){
		assert.equal(date.lt(ndate),true,'SetDate is lesser')
		assert.equal(date.lt(),true,'set date is lesser')
	})

	it('#minuteOfDay',function(){
		assert.equal(ack.date().now().minuteOfDay() >= new Date().getMinutes(), true)
	})

	it('#getWeeksWithMondayInYearExposedArray',function(){
		var jDate = ack.date('8/3/2015')
		var yweArray = jDate.getWeeksWithMondayInYearExposedArray()
		assert.equal(yweArray.length, 53)
		for(var weekIndex=1; weekIndex < yweArray.length-1; ++weekIndex){//!!!Non ISO weeks so at least the first and last week may not match
			assert.equal(yweArray[weekIndex].week(), weekIndex+1)
		}
	})

	it('#getMonthDateProperNumber',function(){
		assert.equal(ack.date('2/01/2016').getMonthDateProperNumber(), '1st')
		assert.equal(ack.date('2/02/2016').getMonthDateProperNumber(), '2nd')
		assert.equal(ack.date('2/03/2016').getMonthDateProperNumber(), '3rd')
		assert.equal(ack.date('2/4/2016').getMonthDateProperNumber(), '4th')
	})

	describe('formatting',function(){
		it('#format',function(){
			assert.equal(ack.date('2017-08-08T17:40:13.947Z').format('YYYY-MM-DD hh:mm:A').length, 19)
		})

		it('#mmddyyyyhhmmtt',function(){
			var aDate = ack.date().now()
			assert.equal(aDate.mmddyyyyhhmmtt().length, 19)
		})

		it('#mmmmdyyyy',function(){
			assert.equal(ack.date().mmmmdyyyy().split(' ').length, 3)
			assert.equal(ack.date('2/24/2016').mmmmdyyyy(), 'February 24th 2016')
		})

		it('#mmddyyyy',function(){
			assert.equal(ack.date('2/4/2016').mmddyyyy(), '02/04/2016')
		})

		it('#mdyyyy',function(){
			assert.equal(ack.date('2/4/2016').mdyyyy(), '2/4/2016')
		})

		it('#mdyy',function(){
			assert.equal(ack.date('2/4/2016').mdyy(), '2/4/16')
		})

		it('#yy',function(){
			assert.equal(ack.date('2/24/2016').yy(), 16)
		})

		it('#hhmmtt',function(){
			//assert.equal(ack.date().hhmmtt(), '')
			assert.equal(ack.date().hhmmtt().length, 8)
			
			var jDate = ack.date('Tue Mar 01 2016 11:30:51 GMT-0500 (EST)')
			var val = jDate.hhmmtt()
			assert.equal(val.length, 8)

			var jDate = ack.date('Tue Mar 01 2016 12:30:51 GMT-0500 (EST)')
			var val = jDate.hhmmtt()
	 		assert.equal(val.length, 8)

			var jDate = ack.date('Tue Mar 01 2016 13:30:51 GMT-0500 (EST)')
			var val = jDate.hhmmtt()
			assert.equal(val.length, 8)
		})

		it('#hmmtt',function(){
			var jDate = ack.date('Tue Mar 01 2016 11:30:51 GMT-0500 (EST)')
			var val = jDate.hmmtt()
			assert.equal(val.search(/[0-9]{1,2}:[0-9]{2} [a-z]{2}/i), 0)

			var jDate = ack.date('Tue Mar 01 2016 12:30:51 GMT-0500 (EST)')
			var val = jDate.hmmtt()
			assert.equal(val.search(/[0-9]{1,2}:[0-9]{2} [a-z]{2}/i), 0)

			var jDate = ack.date('Tue Mar 01 2016 13:30:51 GMT-0500 (EST)')
			var val = jDate.hmmtt()
			assert.equal(val.search(/[0-9]{1,2}:[0-9]{2} [a-z]{2}/i), 0)
		})

		it('#storageFormat',function(){
			var regx = /[0-9]{4,5}-[0-9]{2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{2}:[0-9]{2}\./i
			var addoffset = (isDst==true && wasDst==false && wasDst2==true) ? 120 : 0
			//var newoffset = offset + addoffset
			var nD = ack.date(1492659305845).addMinutes( addoffset )
			assert.equal(nD.storageFormat().search(regx), 0)// 2017-04-20 01:35:05.845

			var jDate = ack.date('Tue Mar 01 2016 11:30:51 GMT-0500 (EST)')
			var val = jDate.storageFormat()
			assert.equal(val.search(regx), 0)
		})
	})


	it('#daysInMonth',function(){
		assert.equal(ack.date('7/02/2015').daysInMonth(), 31)
		assert.equal(ack.date('8/1/2015').daysInMonth(), 31)
	})

	describe('gotos',function(){
		it('#addHours',function(){
			var d0 = new Date('01/01/2015 02:00:00'),
				d1 = ack.date(new Date(d0)).addHours(5),
				diff = d1.dateHourDiff(d0)

			assert.equal(diff,5,'added 5 hours but got '+diff)

			var d = ack.date().param().addHours(-40).dateHourDiff()
			assert.equal(Math.floor(d), 40)
		})

		it('#addMinutes',function(){
			var d0 = new Date('01/01/2015 02:00:00'),
				d1 = ack.date(new Date(d0)).addMinutes(6),
				diff = d1.dateMinuteDiff(d0)

			assert.equal(diff, 6, 'added 6 minutes but got '+diff)
			assert.equal(ack.date().param().addMinutes(-40).dateMinuteDiff(), 40)
		})

		it('#addSeconds',function(done){
			var d0, d1
			d0 = d1 = new Date()

			var	D1 = ack.date(d1).addSeconds(5),
				diff = D1.dateSecondDiff(d0)
			assert.equal(diff,5,'added 5 seconds but got '+diff)
			/* test rounding */
				var d = ack.date().param().addSeconds(-40)
				setTimeout(function(){
					assert.equal(d.dateSecondDiff(), 40)
					done()
				}, 200)
			/* end */
		})

		it('#setTimeByString',function(){
			var string = ack.date('1/1/2012').setTimeByString('7:2 pm').mmddyyyyhhmmtt()
			assert.equal(string, '01/01/2012 07:02 PM')
		})

		it('#dateStringToDate',function(){

			var date = ack.date().setDateByString('2017-08-06').date
			assert.equal(date.getMonth(), 7)
			assert.equal(date.getFullYear(), 2017)
			assert.equal(date.getDate(), 6)

			var date3 = ack.date().setDateByString('08-06-2017').date
			assert.equal(date3.getMonth(), 7)
			assert.equal(date3.getFullYear(), 2017)
			assert.equal(date3.getDate(), 6)
		})

		describe('#nextYear',function(){
			it('works',function(){
				assert.equal(ack.date().now().nextYear().year(), new Date().getFullYear()+1)
			})

			it('#clone',function(){
				assert.equal(ack.date().now().nextYear().clone().year(), new Date().getFullYear()+1)
			})

			it('backwards',function(){
				assert.equal(ack.date().now().nextYear(-1).year(), new Date().getFullYear()-1)
			})
		})

		describe('#priorYear',function(){
			it('works',function(){
				assert.equal(ack.date().now().priorYear().year(), new Date().getFullYear()-1)
			})

			it('#new',function(){
				assert.equal(ack.date().now().priorYear().clone().year(), new Date().getFullYear()-1)
			})
		})

		it('#sod#gotoStartOfDate',function(){
			var sod = ack.date('7/1/2015').gotoSod().date
			assert.equal(sod.getHours(), 0)
			assert.equal(sod.getMinutes(), 0)
			assert.equal(sod.getMilliseconds(), 0)
		})

		it('#eod#gotoEndOfDate',function(){
			var sod = ack.date('7/1/2015').gotoEod().date
			assert.equal(sod.getHours(), 23)
			assert.equal(sod.getMinutes(), 59)
			assert.equal(sod.getMilliseconds(), 999)
		})

		it('#gotoFridayOfWeek',function(){
			date = ack.date('4/7/2015').gotoFridayOfWeek()
			assert(date.mmddyyyy,'04/10/2015')
		})

		describe('#gotoMondayOfWeek',function(){
			it('tuesday',function(){
				date = ack.date('4/7/2015').gotoMondayOfWeek()
				assert(date.mmddyyyy,'04/06/2015')
			})

			it('monday',function(){
				date = ack.date('3/30/2015').gotoMondayOfWeek()
				assert(date.mmddyyyy,'03/30/2015')
			})

			it('monday2',function(){
				date = ack.date('4/6/2015').gotoMondayOfWeek()
				assert(date.mmddyyyy,'04/06/2015')
			})
		})
	})


	it('#isWeekend',function(){
		assert.equal(ack.date('7/31/2015').isWeekend(), false)
		assert.equal(ack.date('8/1/2015').isWeekend(), true)
	})

	it('#getDayName',function(){
		assert.equal( ack.date('06/16/2015').getDayName(), 'Tuesday' )
	})

	it('#getDayAbbr',function(){
		assert.equal( ack.date('06/16/2015').getDayAbbr(), 'Tue' )
	})

	it('#dateYearDiff',function(){
		var d0 = new Date(),
			D0 = ack.date(d0),
			D1 = ack.date(new Date(d0)).addYear(2),
			diff = D1.dateYearDiff(d0),
			diff2 = D0.dateYearDiff( D1.date )
		assert.equal(diff,2,'added 2 years but got '+diff)
		assert.equal(diff2,2,'added 2 years but got '+diff2)
	})

	describe('#dateMinuteDiff',function(){
		it('2 mins',function(){
			var d0 = new Date(),
				D0 = ack.date(d0),
				D1 = ack.date(new Date(d0)).addSeconds(120),
				diff = D1.dateMinuteDiff(d0),
				diff2 = D0.dateMinuteDiff( D1.date )

			assert.equal(diff,2,'added 2 minutes but got '+diff)
			assert.equal(diff2,2,'added 2 minutes but got '+diff2)
		})

		it('1 day',function(){
			var d1 = ack.date('04/07/2016 04:00 PM')
			var d2 = ack.date('04/08/2016 04:00 PM')
			assert.equal(d1.dateMinuteDiff(d2), 1440)
		})
	})

	it('#dateDayDiff',function(){
		var d = new Date()
		assert.equal(ack.date().now().dateDayDiff(d), 0)

		d = ack.date().now().addDays(1)
		assert.equal(ack.date().now().dateDayDiff(d), 1)
	})

	it('#fullWeeksLeftInMonth', function(){
		assert.equal(ack.date('07/20/2015').fullWeeksLeftInMonth(), 1)
	})

	it('#weekInMonth',function(){
		assert.equal(ack.date('07/01/2015').weekInMonth(), 1)
		assert.equal(ack.date('07/06/2015').weekInMonth(), 2)
		assert.equal(ack.date('07/13/2015').weekInMonth(), 3)
		assert.equal(ack.date('07/20/2015').weekInMonth(), 4)
		assert.equal(ack.date('07/31/2015').weekInMonth(), 5)
	})

	it('#nextMonth',function(){
		var nD = ack.date('4/1/2015').nextMonth(22).date
		assert.equal(nD.getMonth(),1)
		assert.equal(nD.getFullYear(),2017)
	})

	describe('#priorMonth',function(){
		it('2',function(){
			var nD = ack.date('4/1/2015').priorMonth(2).date
			assert.equal(nD.getMonth(),1)
			assert.equal(nD.getFullYear(),2015)
		})

		it('22',function(){
			var nD = ack.date('4/1/2015').priorMonth(22).date
			assert.equal(nD.getMonth(),5)
			assert.equal(nD.getFullYear(),2013)
		})
	})

	describe('#nextYear',function(){
		it('works',function(){
			var nD = ack.date('4/1/2015').nextWeek(1).date
			assert.equal(nD.getDate(),8)
			assert.equal(nD.getFullYear(),2015)
		})

		it('rotates-year',function(){
			var nD = ack.date('1/1/2015').nextWeek(-1).date
			assert.equal(nD.getFullYear(),2014)

			var nD = ack.date('12/29/2015').nextWeek().date
			assert.equal(nD.getFullYear(),2016)
		})
	})

	describe('#priorWeek',function(){
		it('3',function(){
			var nD = ack.date('4/1/2015').priorWeek(3).date
			assert.equal(nD.getMonth(),2)
			assert.equal(nD.getDate(),11)
			assert.equal(nD.getFullYear(),2015)
		})

		it('1',function(){
			var nD = ack.date('4/1/2015').priorWeek(1).date
			assert.equal(nD.getDate(),25)
			assert.equal(nD.getFullYear(),2015)
		})
	})

	it('#getMonthAbbr',function(){
		var nD = ack.date('4/1/2015').getMonthAbbr()
		assert.equal(nD,'Apr')
	})

	it('#dateMonthDiff',function(){
		var diff0 = ack.date('2016/01/01').dateMonthDiff('2016/02/01')
		var diff1 = ack.date('2016/02/01').dateMonthDiff('2016/01/01')
		assert.equal(diff0, 1)
		assert.equal(diff1, 1)
	})

	it('#getDateWeekStop',function(){
		var jDate = ack.date('3/8/2016')
		var stopDate = jDate.getDateWeekStop().getTime()
		assert.equal(ack.date(stopDate).mmddyyyyhhmmtt(), '03/12/2016 11:59 PM');
	})
})