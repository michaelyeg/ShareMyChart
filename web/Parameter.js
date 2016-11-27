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
/**
 *
 * @param name
 * @param class_value
 * @constructor
 */
var Parameter = function(name, class_value){
        this.name = name;
        this.class_value = class_value;
        this.type = "Not known";
        this.real_name = name.substring(name.lastIndexOf("/") + 1);
        this.real_name = this.real_name.charAt(0).toUpperCase() + this.real_name.slice(1);
        //console.log("real_name is: " + this.real_name);

    };

/**
 *
 * @constructor
 */
var ParameterManager = function(){
    $.pArray = [];
    console.log("New Parameter manager created.");
};



ParameterManager.prototype.getType = function(index){
    return $.pArray[index].type;
};

/*
@method addParameter
@param {Parameter} Parameter - A parameter to add to the parameter manager.
@description Adds parameter to the manager*/
/**
 *
 * @param Parameter
 */
ParameterManager.prototype.addParameter = function(Parameter){
    $.pArray.push(Parameter);

};

/**

 */
ParameterManager.prototype.getClass = function(index){
    return $.pArray[index].class_value;
};

/**

 */
ParameterManager.prototype.getParameter = function(index){
  return $.pArray[index];
};



/*
    @method getLength
    @description Returns the length/number of items in the parameter manager
 */
ParameterManager.prototype.getLength = function(){
    return $.pArray.length;
}


//get the Parameters as an array of strings **TODO finish this for Nikki's parameters
/**
 *
 * @returns {Array}
 */
ParameterManager.prototype.getParameters = function(){
    var dict = [];

    for(var i=0; i < $.pArray.length; i++){

        dict.push({
            name:   $.pArray[i].real_name+" - "+$.pArray[i].class_value.substring($.pArray[i].class_value.lastIndexOf("/") + 1),
            value: $.pArray[i]
        });

    }

    return dict;

};

ParameterManager.prototype.getType = function(index){
    return $.pArray[index].type;
};

ParameterManager.prototype.clearManager = function(){
    $.pArray.splice(0, $.pArray.length);
}

/**
 *
 * @param pred
 * @param class_val
 * @param d_type
 * @returns {boolean}
 * @description Checks if a predicate is already in the parameter manager. This is done by
 * checking the predicate, the class, and if there's a datatype already assigned.
 * If class and predicate are true and the datatype is anything but nominal,
 * the datatype will be overwritten (by returning true).
 * Returns true if already exists, false if it does not.
 */
ParameterManager.prototype.checkExists = function(pred, class_val, d_type){
    for(var j=0; j < $.pArray.length; j++){
        if($.pArray[j].name.localeCompare(pred) == 0){
            if($.pArray[j].class_value.localeCompare(class_val) == 0){
                //datatype aspect - can overwrite anything but nominal
                //if someone was dumb and wrote in one date in the wrong format, then too bad
                //youve changed them all
                return true;
            }

        }

    }
    return false;
};

/**
 * @desc - Returns the index for a name and class of a parameter. -1 if not found.
 * @param name
 * @param class_val
 */
ParameterManager.prototype.getIndexForNC = function(name, class_val){
    for(var i =0; i < $.pArray.length; i++){
        if($.pArray[i].name.localeCompare(name) ==0 && $.pArray[i].class_value.localeCompare(class_val) ==0){
            return i;
        }
    }
    console.log("Parameter not found");
    return -1;
};

/**
 *
 * @param index
 * @param dataType
 * @description Adds the datatype to the provided predicate
 */
ParameterManager.prototype.addDatatype = function(index, dataType){
    //will only add the datatype if it is "not known" aka not set, or it has any value that is not nominal

    if($.pArray[index].type.localeCompare("Not known") == 0 || $.pArray[index].type.localeCompare("nominal") != 0){
        $.pArray[index].type = dataType;
    }
};

/**
 * @description Simplifies the types into what we need for our program - carefully
 * lat/long identifiers will be set as: lat/long
 * date values will be set as: date (they already should be)
 * anything labelled string = nominal
 * any numbers = numeric
 * in implementation, note that numeric should be considered ordinal, ie, kind of like date
 */
ParameterManager.prototype.simplifyType = function(index){

    //var index = $.pArray.length-1;

    //console.log("Adjsting: " + $.pArray[index].type + ". We here and pArray.length = " + $.pArray.length + "and name is: " +
    //    $.pArray[index].name);


        //checks for lat/long
        if ($.pArray[index].name.indexOf("latitude") >=1 || $.pArray[index].name.indexOf("longitude") >= 1) {
            if ($.pArray[index].name.indexOf("latitude") >=1){
                $.pArray[index].type = "lat";

                //console.log("Assigned lat to" + $.pArray[index].name);

            }

            else if ($.pArray[index].name.indexOf("longitude") >=1 ) {
                $.pArray[index].type = "long";

                //console.log("Assigned long to" + $.pArray[index].name);

            }

        }
        //set the next set as numeric... there is no nice way around this :c
        // there's more but these are the main-ish ones, still could include computer-y data type ones
        else if($.pArray[index].type == "integer" || $.pArray[index].type == "double" || $.pArray[index].type == "decimal"
            || $.pArray[index].type == "nonNegativeInteger" || $.pArray[index].type =="positiveInteger"
            || $.pArray[index].type == "nonPositiveInteger" || $.pArray[index].type == "negativeInteger"
            || $.pArray[index].type == "int" || $.pArray[index].type == "long" || $.pArray[index].type == "short" ){
            $.pArray[index].type = "numeric";

            //console.log("Set " + $.pArray[index].name + "as " + $.pArray[index].type);

        }
        //any string values will be called nominal
        //categorical variables like booleans and the like will also be typed as nominal
        //included hexBinary as a nominal only because of letters, but it's more like a number so...
        else if($.pArray[index].type == "string" || $.pArray[index].type == "boolean" || $.pArray[index].type == "anyURI"
            || $.pArray[index].type == "qname" || $.pArray[index].type == "name" || $.pArray[index].type == "hexBinary"){
            $.pArray[index].type = "nominal";
        }
        //date values, any kind of date/time will be marked as date value
        else if($.pArray[index].type == "dateTime" || $.pArray[index].type == "duration" || $.pArray[index].type == "date"
            || $.pArray[index].type == "time" || $.pArray[index].type == "gYearMonth" || $.pArray[index].type == "gYear"
            || $.pArray[index].type == "gMonthDay" || $.pArray[index].type == "gDate" || $.pArray[index].type == "gMonth"){
            $.pArray[index].type = "date";
        }
};
