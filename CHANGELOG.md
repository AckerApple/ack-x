# ack-x - Change Log
All notable changes to this project will be documented here.

## [3.0.0] - 2022-09-29
- removed ack-p
- removed ack.promise
- removed ack.Promise

## [2.0.0] - 2020-05-12
- removed /browser.js

## [1.7.0] - 2020-04-05
- Export differences

## [1.5.11] - 2020-08-04
- diffStats corrections

## [1.5.10] - 2019-05-17
- correct date.utc() to just use date.getTime()
- Added date.diffStats

## [1.5.7] - 2019-04-15
- Date as number string can convert to date

## [1.5.6] - 2018-12-11
- Replaced moment with moment-mini

## [1.5.5] - 2018-12-11
- added roundUp argument to dateMinuteDiff

## [1.5.4] - 2018-12-06
- Added date.hourMinuteDecimalDiff

## [1.5.2] - 2018-12-01
- added ack.date.getDateWeekStart
- added ack.date.getDateWeekStop

## [1.5.1] - 2018-09-21
- Added minSecDiff
- Added hourMinSecDiff
- Breaking Changes
  - dateHourDiff floors instead of rounding
  - dateMinuteDiff floors instead of rounding

## [1.4.9] - 2018-04-25
- Make deep assign clone arrays

## [1.4.8] - 2018-04-25
- added date.getMonthDateNumberSuffix

## [1.4.7] - 2018-04-25
- fixed weekOfDate()
- Better TypeScripting
- BREAKING CHANGES
  - changed the way ack-x is invoked
  - FROM require('ack-x')
  - ONTO require('ack-x').ack

## [1.3.24] - 2018-04-25
- Added
  - ack.date.gotoFirstDayOfMonth
  - ack.date.gotoFirstDayOfWeek
  - ack.date.gotoLastDayOfMonth
  - ack.date.gotoLastDayOfWeek
  - ack.date.dateWeekDiff

## [1.3.22] - 2018-03-12
- Fixed minor issue with rounding up and down dates

## [1.3.21] - 2018-03-07
- Added roundMinsUp, roundMinsDown, roundHoursUp, roundHoursDown
	- in date.from

## [1.3.16] - 2017-12-28
- updated dependencies
- Added array.map
- Added array.reduce
- Added array.average

## [1.3.13] - 2017-10-16
- Enhanced the way getTypeMap produces results

## [1.3.5] - 2017-10-11
### Breaking Changes
- ack.function() is now ack.method()
- index files moved around
- removed indexSelector
- ack.class() has been removed
- ack.date().new() has been changed to ack.date().clone()
- ack.date().gotoEod accepts no arguments now
- ack.date().gotoSod accepts no arguments now
### Added
- Source files are now Typescript

## [1.2.43] - 2017-10-05
### Added
- date.utc(])
- date.getUtcDate()
- date.toUtc()

## [1.2.42] - 2017-10-04
### Added
- Documentation
- ack.object().getTypeMap()

## [1.2.38] - 2017-08-15
### Added
- Passing in 0 to ack.date is now zero hour instead of current date
- Passing no arguments to ack.date is current date
- Passing null to ack.date sets date to null

## [1.2.36] - 2017-08-14
- added getTimezoneStamp() and better tests

## [1.2.32] - 2017-08-11
- Fixed .setYear into .setFullYear for date objects
- Added more date functionality

## [1.2.26] - 2017-07-11
### Added
- date.isGreaterThan()

## [1.2.23] - 2017-04-04
### Added
- .stringify

## [1.2.28] - 2016-12-28
### Enhanced
- a string date of yyyy-mm-dd will be auto detected to mm-dd-yyyy


## [1.2.19] - 2016-09-07
### Added
- date.yearsFromNow()
- date.monthsFromNow()
- date.daysFromNow()
- date.addMonths()
- date.addYears()

## [1.2.16] - 2016-08-11
### Fix
- date.isDate() fix for when no date is supplied


## [1.2.9] - 2016-06-17
### More docs

## [1.2.6] - 2016-06-16
### Created