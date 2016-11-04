/**
 * Created by michaelximac on 2016-11-03.
 */

/**
 * Pick graph based on their data type.
 */
function pickGraphType(X,Y) {
    if (X.getType=="nominal" && (Y.getType=="numeric" || Y.getType=="date")){
        aggregate(Y,X);
        displayBarchart(X,Y);
    }else if(X.getType=="nominal" && Y.getType=="nominal"){
        displayScatter(X,Y);
    }else if(X.getType=="numeric" && Y.getType=="date"){
        displayLineGraph(X,Y);
    }else if(X.getType=="numeric" && Y.getType=="numeric"){
        displayScatter(X,Y);
    }
}

/**
 * Aggregate counts of specified parameters.
 * @returns {dictionary} Returns a dictionary of aggregateParameter: count.
 */
function aggregate(aggPar,par) {
    // Initialize an associated Array, like dictionary in python.
    var dictionary=new Array;
    var count=new Number();
    for (key in dictionary){
        dictionary.key=value;
    }

    for (i in aggPar){
        if (i in dictionary.key){
            count=dictionary.key;
            count+=1;
            dictionary.key=count;
        }else{
            dictionary[i.toString()]=1;
        }
    }

    return dictionary;
}