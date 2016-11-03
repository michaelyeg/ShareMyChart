/**
 * Created by Jill - Offline on 2016-11-02.
 */

    //make an array of these I think
var Parameter = function(name, class_value){
        this.name = name; //this is the full URI name for now, gotta change it for display to the user later
        this.class_value = class_value;
        this.type = "Not known";
        //add shortened name for ui

    };

//an array of parameters - arrays in javascript are dynamic, don't need to tell it how big the array will be
var ParameterManager = function(){
    $.pArray = [];
    console.log("New Parameter manager created.");
};

//adds a predicate to the parameter manager
ParameterManager.prototype.addParameter = function(Parameter){
    $.pArray.push(Parameter);
};

//checks if the predicate is already in the parameter manager
ParameterManager.prototype.checkExists = function(value){
    for(var j=0; j < $.pArray.length; j++){
        if($.pArray[j].name.localeCompare(value) == 0)
            return true;
    }
    return false;
};

//assigns the datatype to the provided predicate
ParameterManager.prototype.addDatatype = function(predicate, dataType){

    for(var i=0; i < $.pArray.length; i++) {
        if ($.pArray[i].name.localeCompare(predicate) ==0 ){
            $.pArray[i].type = dataType;
            console.log("ASSIGNED!");
        }
    }

}

//simplifies the types into what we need for our program - carefully
//lat/long identifiers will be set as: lat/long
//date values will be set as: date (they already should be)
//anything labelled string = nominal
//any numbers = numeric
//in implementation, note that numeric should be considered ordinal, ie, kind of like date
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
