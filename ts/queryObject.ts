export class jXQueryObject{
  queryObject:any

  constructor(object){
    this.queryObject = object
    return this
  }

  getNameArray(){
    return Object.keys(this.queryObject)
  }

  //{delimiter,isNameFirstRow,textQualifier,titleArray}
  toCsv(delimOrOptions, textQualifier, titleArray){
    return this.Csv.apply(this,arguments).output()
  }

  Csv(delimOrOptions, textQualifier, titleArray){
    if(typeof(delimOrOptions)=='string')
      delimOrOptions = {delimiter:delimOrOptions}
    else if(delimOrOptions==null)
      delimOrOptions = {}

    if(textQualifier)delimOrOptions.textQualifier=textQualifier
    if(titleArray)delimOrOptions.titleArray=titleArray

    return new jXQueryObjectCsv(this.queryObject, delimOrOptions)
  }
}


//{delimiter,isNameFirstRow,textQualifier,titleArray}
export class jXQueryObjectCsv{
  data:any

  constructor(queryObject?, $scope?){
    this.data = $scope || {}
    this.data.isNameFirstRow = this.data.isNameFirstRow==null ? true : this.data.isNameFirstRow
    this.data.delimiter = this.data.delimiter || ','
    this.data.queryObject = queryObject || this.data.queryObject || {}
    return this
  }

  getTitleArray(){
    if(this.data.titleArray)return this.data.titleArray
    if(this.data.isNameFirstRow)return Object.keys(this.data.queryObject)
  }

  output(){
    return this.toArray().join( this.data.lineDelim || '\r\n' )
  }

  toArray(){
    //textQualifier = textQualifier || '"'
    var columnLoop
    var columnCount
    var newValue
    var newTitle
    var returnText = []
    var titleArray = this.getTitleArray()
    var nameArray = titleArray
    var tempContent:string

    var options = this.data
    if(options.textQualifier && options.textQualifier.length){
      var nr = new RegExp('/'+options.textQualifier+'/', 'gi')
      var getCsvValueOf = function(val){
        if(val==null)return ''
        val = val.toString().replace(nr, options.textQualifier+options.textQualifier)
        val = options.textQualifier + val + options.textQualifier;
        return val
      }
    }else
      var getCsvValueOf = function(val){
        return val
      }

      /* figure headers */
        var tempArray:any[] = []

        for(columnLoop=0; columnLoop < titleArray.length; ++columnLoop){
          if(typeof(titleArray[columnLoop])=='object'){
            newTitle =  titleArray[columnLoop][1]
            titleArray[columnLoop] = newTitle
            nameArray[columnLoop] = titleArray[columnLoop][0]
          }else{
            newTitle = titleArray[columnLoop]
          }
          newValue = getCsvValueOf(newTitle)
          tempArray.push(newValue)
        }
      /* end: figure headers */

      if(this.data.isNameFirstRow){
        tempContent = tempArray.join( this.data.delimiter )
        if(tempContent){
          returnText.push(tempContent);
        }
      }

      /* build CSV content */
      var rowLoop,
        columnName,
        firstColumn=this.data.queryObject[ nameArray[0] ]

      if(firstColumn){//when no data provided, firstColumn is null
        var len = firstColumn.length;//get array len from first column
        for(rowLoop=0; rowLoop < len; ++rowLoop){
          tempArray = [];
          columnCount = nameArray.length;
          for(columnLoop=0; columnLoop < columnCount; ++columnLoop){
            columnName = nameArray[columnLoop];
            newValue = this.data.queryObject[columnName][rowLoop]
            newValue = getCsvValueOf(newValue);
            //if(isBinary(newValue))newValue = toString(newValue);
            tempArray.push(newValue)
          }
          tempContent = tempArray.join( this.data.delimiter )
          returnText.push( tempContent )
        }
      }
    /* end */

    return returnText
  }
}

export function method(variable){
  return new jXQueryObject(variable)
}