/**
 * Created by michaelximac on 2016-11-03.
 */

/**
 * @description Pick graph based on their data type.
 * @param pam1 - index of parameter one (x-axis)
 * @param pam2 - index of parameter two (y-axis)
 * Use the parameter manager to locate and figure out their types!
 */
function pickGraphTypes(pam1, pam2) {
    if (pManager.getType(pam1)=="nominal" && (pManager.getType(pam2)=="numeric" || pManager.getType(pam2)=="date")){
        console.log("It's a bar chart!");
        //aggregate(pam2,pam1);
        //displayBarchart(pam1,pam2);
    }else if(pManager.getType(pam1)=="nominal" && pManager.getType(pam2)=="nominal"){
        console.log("It's a scatter graph!");
        //displayScatter(pam1,pam2);
    }else if(pManager.getType(pam1)=="numeric" && pManager.getType(pam2)=="date"){
        console.log("It's a line graph!");
        //displayLineGraph(pam1,pam2);
    }else if(pManager.getType(pam1)=="numeric" && pManager.getType(pam2)=="numeric"){
        //displayScatter(pam1,pam2);
        console.log("It's a scatter graph - v2!");
    }
}

/**
 * @description Aggregate counts of specified parameters.
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