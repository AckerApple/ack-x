# ack-x, the Acker Way of Fullfilling Our Everyday Javascript Needs
Extra functional library to objectify & compartmentalize variables into wrappers that make invokation & injection processes, lighter & easier to implement.

## This is a Stable Project But is Developing & Maturing
This code was born out of countless past production projects that were implemented and put together by Acker Apple. This code is used in existing production projects and is still primarly maintained by Acker Apple.

At this time, the documentation is just now evolving as this package is just now becoming a publically consumed piece of software. The demand for this code to be available for immediate use as a public package, has out weighed producing proper documentation.

Use this package at will, use with caution. PLEASE watch our version numbers as this package upgrades. Breaking changes will always be illustrated in a major version number change (IE. v1.0.0 versus v1.1.0)

## Simple Example of Variable Exposing
```
var exactStartOfMonth = require('ack-x').date().now().gotoFirstDayOfMonth().gotoStartOfDate().date
```

## Complex Example of Variable Exposing
```
var ack = require('ack-x')
var xDate = ack.date().now()//expose date as now

ack.promise(
  xDate.getNextYear(),//promise val0 is next year as number
  xDate.nextYear(2).year(),//promise val1 is the year as number, in two year
  xDate.getNextYear(3)//promise val2 is the year as number, in two year
)
.then(function(y0, y1, y2){
  return y0 < y1 && y1 < y2
})
.if(false, function(){
  return 'Time is going in reverse'
})
.if(true, function(){
  return 'Time is going in working correctly'
})
.then( ack.string )//The promise string value, is injected into the string variable exposer
.call('toBase64')//The exposed string variable is casted to base64
.then( console.log )//log results
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