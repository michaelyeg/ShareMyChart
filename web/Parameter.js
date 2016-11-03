/**
 * Created by Jill - Offline on 2016-11-02.
 */

/*
@constructor Parameter
@param {string} name - URI name of the parameter
@param {string} class_name - Class of the parameter
@property {string} type - Datatype of the parameter
@property {string} real_name - The real name of the parameter, for UI/display-use.
 */
var Parameter = function(name, class_value){
        this.name = name;
        this.class_value = class_value;
        this.type = "Not known";
        this.real_name = name.substring(name.lastIndexOf("/") + 1);

    };

    /*
    @constructor ParameterManager
    @property {array} $p.Array - The array for storing the parameters.
     */
var ParameterManager = function(){
    $.pArray = [];
    console.log("New Parameter manager created.");
};

/*
@method addParameter
@param {Parameter} Parameter - A parameter to add to the parameter manager.
@description Adds parameter to the manager
 */
ParameterManager.prototype.addParameter = function(Parameter){
    $.pArray.push(Parameter);
};

/*
@method checkExists
@param {string} value - Checks if the predicate value is already recorded in the parameter manager
@description Checks if a predicate is already in the parameter manager
 */
ParameterManager.prototype.checkExists = function(value){
    for(var j=0; j < $.pArray.length; j++){
        if($.pArray[j].name.localeCompare(value) == 0)
            return true;
    }
    return false;
};

/*
@method addDatatype
@param {string} predicate - the predicate to recieve the datatype
@param {string} dataType - the datatype to be assigned to the predicate
@description Adds the datatype to the provided predicate
 */
ParameterManager.prototype.addDatatype = function(predicate, dataType){

    for(var i=0; i < $.pArray.length; i++) {
        if ($.pArray[i].name.localeCompare(predicate) ==0 ){
            $.pArray[i].type = dataType;
            console.log("ASSIGNED!");
        }
    }

}


/*
@method simplifyTypes
@description Simplifies the types into what we need for our program - carefully
 lat/long identifiers will be set as: lat/long
 date values will be set as: date (they already should be)
 anything labelled string = nominal
 any numbers = numeric
 in implementation, note that numeric should be considered ordinal, ie, kind of like date
 */
ParameterManager.prototype.simplifyTypes = function(){
    console.log("We here and length = " + $.pArray.length);
    for(var i = 0; i < $.pArray.length; i++) {


        //checks for lat/long
        if ($.pArray[i].name.indexOf("latitude") >=1 || $.pArray[i].name.indexOf("longitude") >= 1) {
            if ($.pArray[i].name.indexOf("latitude") >=1)
                $.pArray[i].type = "lat";
            else if ($.pArray[i].name.indexOf("longitude") >=1 )
                $.pArray[i].type = "long";

        }
        //set the next set as numeric... there is no nice way around this :c
        // there's more but these are the main-ish ones, still could include computer-y data type ones
        else if($.pArray[i].type == "integer" || $.pArray[i].type == "double" || $.pArray[i].type == "decimal"
            || $.pArray[i].type == "nonNegativeInteger" || $.pArray[i].type =="positiveInteger"
            || $.pArray[i].type == "nonPositiveInteger" || $.pArray[i].type == "negativeInteger"
            || $.pArray[i].type == "int" || $.pArray[i].type == "long" || $.pArray[i].type == "short" ){
            $.pArray[i].type = "numeric";
            console.log("Set " + $.pArray[i].name + "as " + $.pArray[i].type);
        }
        //any string values will be called nominal
        //categorical variables like booleans and the like will also be typed as nominal
        //included hexBinary as a nominal only because of letters, but it's more like a number so...
        else if($.pArray[i].type == "string" || $.pArray[i].type == "boolean" || $.pArray[i].type == "anyURI"
            || $.pArray[i].type == "qname" || $.pArray[i].type == "name" || $.pArray[i].type == "hexBinary"){
            $.pArray[i].type = "nominal";
        }
        //date values, any kind of date/time will be marked as date value
        else if($.pArray[i].type == "dateTime" || $.pArray[i].type == "duration" || $.pArray[i].type == "date"
            || $.pArray[i].type == "time" || $.pArray[i].type == "gYearMonth" || $.pArray[i].type == "gYear"
            || $.pArray[i].type == "gMonthDay" || $.pArray[i].type == "gDate" || $.pArray[i].type == "gMonth"){
            $.pArray[i].type = "date";
        }
    }
};
