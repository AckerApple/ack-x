# ack-x, the Acker Way of Fullfilling Our Everyday Javascript Needs
Extra functional library to objectify & compartmentalize variables into wrappers that make invokation & injection processes, lighter & easier to implement.

### Table of Contents

- [ack.date](#ackdate)

## This is a Stable Project But is Developing & Maturing
This code was born out of countless past production projects that were implemented and put together by Acker Apple. This code is used in existing production projects and is still primarly maintained by Acker Apple.

At this time, the documentation is just now evolving as this package is just now becoming a publically consumed piece of software. The demand for this code to be available for immediate use as a public package, has out weighed producing proper documentation.

Use this package at will, use with caution. PLEASE watch our version numbers as this package upgrades. Breaking changes will always be illustrated in a major version number change (IE. v1.0.0 versus v1.1.0)

## Simple Example of Variable Exposing
```
//get date object for the first hour, minute and second of the first day of month
var exactStartOfMonth = require('ack-x').date().now().gotoFirstDayOfMonth().gotoStartOfDate().date
```

## ack.date()
```
ack.date().addYears(5).yearsFromNow()
ack.date().addMonths(5).monthsFromNow()
ack.date().addDays(5).daysFromNow()
```

## Complex Example of Variable Exposing
```
var ack = require('ack-x')
var xDate = ack.date().now()//expose date as now

ack.promise(
  xDate.getNextYear(),//promise val0 is next year as number
  xDate.nextYear(2).year(),//promise val1 is the year as number, in two years
  xDate.getNextYear(3)//promise val2 is the year as number, in two years
)
.then(function(y0, y1, y2){
  return y0 < y1 && y1 < y2
})
.if(false, function(){
  return 'Time is going in reverse'
})
.if(true, function(){
  return 'Time is going in correct direction'
})
.then( ack.string )//The promise string value, is injected into the string variable exposer
.call('toBase64')//The exposed string variable is casted to base64
.then( console.log )//log results of base64
.catch(function(e){
  console.log(e)
})
```

##Currently Supported Variable Exposing Modules
- array (in-infancy, add-ons expected)
- base64 (in-infancy, add-ons expected)
- binary (unstable, most likely to be removed)
- date (stable, more oganization to take place)
- error (stable)
- indexSelector (unstable, most likely to be removed)
- method (experimental, future unsure)
- month (mostly stable)
- number (stable)
- object (stable)
- queryObject (upgrades expected)
- string (stable)
- week (mostly stable)
- year (mostly stable)

## ack.array()
```
var a = []

/**
  Intended for high performance by looping an array only once but performing multiple actions.
  Run multiple functions for each iteration of an array.

  Example: array.each(countTeacher, countChild) instead of two loops array.each(countTeacher) + array.each(countChild)
*/
ack.array(a).each(method0, method1, method2, method3)

/** reduce array down to only distinct items
  @method - optional, returned value is used to determine distinctness
*/
ack.array(a).distinct(method)

//pivets array of objects to object of arrays
ack.array(a).objectify()

//append an array's items onto the end of this array
ack.array(a).appendArray(array)

//prepend an array's items onto the front of this array
ack.array(a).prependArray(array)

/** ads an array all up
  @method - optional. Returned value is used to sum
*/
ack.array(a).sum(method)

/** break an array into buckets of arrays
  @isIndexValue=false - when true, buckets of arrays will be corresponding index values back to original array
  @grouptype='sequence' - ('sequence'||'struct') . 'sequence', array of arrays = [ [],[],[] ] . 'struct' = {value0:[buckets...], value1:[buckets...]}
*/
ack.array(a).group(method, isIndexValue, grouptype)
```

## ack.method()
```
var f = function(){}

/** sets a timeout and then runs set method in milsecs */
ack.method(f).runInMs(ms)

/** gets name of defined function */
ack.method(f).getName()

/** returns array of argument names defined within set function */
ack.method(f).getArgNameArray()

/** get set functions inner definition */
ack.method(f).getDefinition()

/** This is an option enhanced version of expectOne */
ack.method(f).expect(nameOrMap, value, requiredOrType, type)

/** Build argument validation for when set function is invoked.
  @name - argument-name
  @value - runtime value argument-value
  @required
  @type - requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true
*/
ack.method(f).expectOne(name, value, requiredOrType, type)
```

## ack.error() - great for standardizing error control
```
var e = new Error()

/** returns all object keys of an error which is takes extra steps */
ack.error(e).getKeys()

/** converts error.stack into array via stack.split(' at ') */
ack.error(e).getStackArray(amount)

/** dig out just the stack trace from error */
ack.error(e).getTraceArray(amount)

/** dig out only just the first trace of errors stack trace */
ack.error(e).getFirstTrace(amount)

ack.error(e).setStackArray(stackArray)

/** analyzes stack to remove 1st trace (leaves error message in stack). Essentially calls .splice(1,1) on stack array  */
ack.error(e).cutFirstTrace()

/** attempt to extract a line number from the error */
ack.error(e).getLineNum()

/** attempt to extract a file path from the error */
ack.error(e).getFilePath()

/** attempt to extract the error's name */
ack.error(e).getName()

/** attempt to extract the named function or code that is running */
ack.error(e).getFailingObjectName()

/** get a message from the error even if it has no message */
ack.error(e).getMessage()

/** attempt to extract the error's type */
ack.error(e).getType()

/** attempt to compare error with another error or another type of an error */
ack.error(e).isType(type)


//TYPES OF ERRORS, use these errors to standardized error flow

ack.error().types.notFound( message )
ack.error().types.localNetworkRequired( message )
ack.error().types.unauthorized( message )
ack.error().types.badRequest( message )
ack.error().types.methodNotAllowed( message )

//TYPES OF ERRORS, Object Details

ack.error().types.NotFound(message){
  this.status = 404;
  this.code = "not_found";
  this.message = message || "Could Not Find Requested Resource";
}

ack.error().types.LocalNetworkRequired(message){
  this.status = 403;
  this.code = "local_network_required";
  this.message = message || "Local Network Connection Required";
}

ack.error().types.Unauthorized = function(message){
  this.status = 401;
  this.code = "credentials_required";
  this.message = message || "No authorization token was found";
}

ack.error().types.BadRequest = function(message){
  this.status = 400;
  this.code = "bad_request";
  this.message = message || "Bad Request";
}

ack.error().types.MethodNotAllowed = function(message){
  this.status = 405;
  this.code = "method_not_allowed";
  this.message = message || "Method Not Allowed";
}
```

## ack.number()
```
var n = 10

/** @p - decimal places */
ack.number(n).decimalFormat(p)

/** convert set number into how many minutes into a date. Ex: 60 = new Date('2016-01-16 1:00:00.0')
  @options - {}
  @options.date - default=new Date()
*/
ack.number(n).asMinutesToDateTime(options)

/** convert set number into how many minutes into a string date. Ex: 60 = 1:00 AM')
  @options = {}
  @options.timeDelim - default=':'
  @optiosn.dayPeriodDelim - default=' '
*/
ack.number(n).asMinutesToTime(options)
```

## ack.object()
```
var o = {}

/** @method(item, index, object) */
ack.object(o).forEach(method)

/** this.object will be the map result
  @method(item, index, object)
*/
ack.object(o).map(method)

/** tests Object for circular references */
ack.object(o).isCyclic()

/** like JSON.stringify but converts all to cookie definition */
ack.object(o).toCookieString()
```

## ack.string()
```
var s = 'String'

/** test string against email regX */
ack.string(s).isEmail()

//Node.js doesnt have .repeat as of 2/11/15
ack.string(s).repeat(num)

//escapes html brackets
ack.string(s).htmlFormat()

/** string becomes really long */
ack.string(s).toBase64()

//convert string to something more safely portable
ack.string(s)._utf8_encode()
```