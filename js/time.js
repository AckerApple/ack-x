"use strict";

var ackDate = require('./date')

function ackTime(date){
	this.date = ackTime.toDate(date)
	return this
}

ackTime.dateObjectBy = function(date){
	if(date){
		if(date.constructor == ackTime){
			return date.date
		}

		if(date.constructor == Date)
			return date

		if(date.split){
			var hour, minute, tt;
			var tArray = date.split(':');
			var hour = tArray[0];

			if(tArray.length > 1){
				minute = tArray[1];
				minute = minute.split(' ');
				if(minute.length > 1){
					tt = minute[1];
					var isPm = tt.toLowerCase()=='pm'
					if(hour<=11 && isPm){
						hour = Number(hour) + 12;
					}else if(hour==12 && !isPm){
						hour = 0
					}
				}

				minute = minute[0];
			}

			var newDate = new Date().setHours(hour);
			newDate = new Date(newDate).setMinutes(minute)
			date = new Date(newDate)
		}

		return new Date(date)//convert string to date object
	}

	return date || new Date()
}

ackTime.toDate = function(date){
	return date!=null ? ackTime.dateObjectBy(date) : null
}

var eackTime = function(date){
	var date = new ackTime(date).date
	return ackDate(date)
}

eackTime.Class = ackTime
module.exports = eackTime