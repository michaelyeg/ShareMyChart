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

    var pGMan = new PossibleGraphManager();

    if ((pam1.type=="nominal" || pam1.type =="date" )&& (pam2.type=="numeric")){
        console.log("It's a bar v chart!");
        pGMan.addToManager(0);

        //aggregate(pam2,pam1);
        //displayBarchart(pam1,pam2);
    }

    //did this kinda quickly, might be wrong, very confusing
    if ( (pam1.type=="numeric" || pam1.type=="date" || pam1.type=="nominal") && pam2.type=="nominal"){
        console.log("It's a bar h chart!");
        pGMan.addToManager(1);

        //aggregate(pam2,pam1);
        //displayBarchart(pam1,pam2);
    }

    if( (pam1.type=="numeric" || pam1.type=="date") && (pam2.type=="date" || pam2.type=="numeric") ){
        console.log("It's a line graph!");
        pGMan.addToManager(2);
        //displayLineGraph(pam1,pam2);
    }
    if( (pam1.type=="numeric" || pam1.type == "date") && (pam2.type=="numeric" || pam2.type=="date") ){
        //displayScatter(pam1,pam2);
        console.log("It's a scatter graph - v2!");
        pGMan.addToManager(3);
    }
    if(pam1.type=="nominal" && pam2.type=="nominal"){
        console.log("It's a scatter graph! Avoid prioritizing me because I look bad w/o jitter!");
        pGMan.addToManager(4);
        //needs to aggregate... something. I think apply to x axis a count.
        //displayScatter(pam1,pam2);
    }



    //wrote these for the future idk
    if( pam1.type=="lat" && pam1.type=="long"){
        console.log("It's a map!");
        pGMan.addToManager(5);
    }
    if( pam1.type=="long" && pam1.type=="lat"){
        console.log("It's a map v2!");
        pGMan.addToManager(5);
    }
    //idke about slideshow yet

    console.log("pG:" + pGMan.getAll());

    //if combo makes nothing
    if(pGMan.getLength() == 0){
        alert("Parameters chosen do not make any valid graphs. Please try again.");
        //would be nice to reset the parameters here, but I'm not sure if that'll clear their ids...
    }else{
        //for now, make first choice, but I'm writing something to make an ordering of the choices to give the user
        pGMan.prioritize(pam1, pam2);

        //put UI option popup here!
        //*user makes a choice*
        //CALL GRAPH CREATION HERE!

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