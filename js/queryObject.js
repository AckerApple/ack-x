"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = exports.jXQueryObjectCsv = exports.jXQueryObject = void 0;
var jXQueryObject = (function () {
    function jXQueryObject(object) {
        this.queryObject = object;
        return this;
    }
    jXQueryObject.prototype.getNameArray = function () {
        return Object.keys(this.queryObject);
    };
    jXQueryObject.prototype.toCsv = function (delimOrOptions, textQualifier, titleArray) {
        return this.Csv.apply(this, arguments).output();
    };
    jXQueryObject.prototype.Csv = function (delimOrOptions, textQualifier, titleArray) {
        if (typeof (delimOrOptions) == 'string')
            delimOrOptions = { delimiter: delimOrOptions };
        else if (delimOrOptions == null)
            delimOrOptions = {};
        if (textQualifier)
            delimOrOptions.textQualifier = textQualifier;
        if (titleArray)
            delimOrOptions.titleArray = titleArray;
        return new jXQueryObjectCsv(this.queryObject, delimOrOptions);
    };
    return jXQueryObject;
}());
exports.jXQueryObject = jXQueryObject;
var jXQueryObjectCsv = (function () {
    function jXQueryObjectCsv(queryObject, $scope) {
        this.data = $scope || {};
        this.data.isNameFirstRow = this.data.isNameFirstRow == null ? true : this.data.isNameFirstRow;
        this.data.delimiter = this.data.delimiter || ',';
        this.data.queryObject = queryObject || this.data.queryObject || {};
        return this;
    }
    jXQueryObjectCsv.prototype.getTitleArray = function () {
        if (this.data.titleArray)
            return this.data.titleArray;
        if (this.data.isNameFirstRow)
            return Object.keys(this.data.queryObject);
    };
    jXQueryObjectCsv.prototype.output = function () {
        return this.toArray().join(this.data.lineDelim || '\r\n');
    };
    jXQueryObjectCsv.prototype.toArray = function () {
        var columnLoop;
        var columnCount;
        var newValue;
        var newTitle;
        var returnText = [];
        var titleArray = this.getTitleArray();
        var nameArray = titleArray;
        var tempContent;
        var options = this.data;
        if (options.textQualifier && options.textQualifier.length) {
            var nr = new RegExp('/' + options.textQualifier + '/', 'gi');
            var getCsvValueOf = function (val) {
                if (val == null)
                    return '';
                val = val.toString().replace(nr, options.textQualifier + options.textQualifier);
                val = options.textQualifier + val + options.textQualifier;
                return val;
            };
        }
        else
            var getCsvValueOf = function (val) {
                return val;
            };
        var tempArray = [];
        for (columnLoop = 0; columnLoop < titleArray.length; ++columnLoop) {
            if (typeof (titleArray[columnLoop]) == 'object') {
                newTitle = titleArray[columnLoop][1];
                titleArray[columnLoop] = newTitle;
                nameArray[columnLoop] = titleArray[columnLoop][0];
            }
            else {
                newTitle = titleArray[columnLoop];
            }
            newValue = getCsvValueOf(newTitle);
            tempArray.push(newValue);
        }
        if (this.data.isNameFirstRow) {
            tempContent = tempArray.join(this.data.delimiter);
            if (tempContent) {
                returnText.push(tempContent);
            }
        }
        var rowLoop, columnName, firstColumn = this.data.queryObject[nameArray[0]];
        if (firstColumn) {
            var len = firstColumn.length;
            for (rowLoop = 0; rowLoop < len; ++rowLoop) {
                tempArray = [];
                columnCount = nameArray.length;
                for (columnLoop = 0; columnLoop < columnCount; ++columnLoop) {
                    columnName = nameArray[columnLoop];
                    newValue = this.data.queryObject[columnName][rowLoop];
                    newValue = getCsvValueOf(newValue);
                    tempArray.push(newValue);
                }
                tempContent = tempArray.join(this.data.delimiter);
                returnText.push(tempContent);
            }
        }
        return returnText;
    };
    return jXQueryObjectCsv;
}());
exports.jXQueryObjectCsv = jXQueryObjectCsv;
function method(variable) {
    return new jXQueryObject(variable);
}
exports.method = method;
