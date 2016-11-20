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

    if (pManager.getType(pam1)=="nominal" && (pManager.getType(pam2)=="numeric" || pManager.getType(pam2)=="date" || pManager.getType(pam2)=="nominal")){
        console.log("It's a bar v chart!");
        pGMan.addToManager(0);

        //aggregate(pam2,pam1);
        //displayBarchart(pam1,pam2);
    }

    //did this kinda quickly, might be wrong, very confusing
    if ( (pManager.getType(pam1)=="numeric" || pManager.getType(pam1)=="date" || pManager.getType(pam1)=="nominal") && pManager.getType(pam2)=="nominal"){
        console.log("It's a bar h chart!");
        pGMan.addToManager(1);

        //aggregate(pam2,pam1);
        //displayBarchart(pam1,pam2);
    }

    if( (pManager.getType(pam1)=="numeric" || pManager.getType(pam1)=="date") && (pManager.getType(pam2)=="date" || pManager.getType(pam2)=="numeric") ){
        console.log("It's a line graph!");
        pGMan.addToManager(2);
        //displayLineGraph(pam1,pam2);
    }
    if( (pManager.getType(pam1)=="numeric" || pManager.getType(pam1)=="date") && (pManager.getType(pam2)=="numeric" || pManager.getType(pam2)=="date") ){
        //displayScatter(pam1,pam2);
        console.log("It's a scatter graph - v2!");
        pGMan.addToManager(3);
    }
    if(pManager.getType(pam1)=="nominal" && pManager.getType(pam2)=="nominal"){
        console.log("It's a scatter graph! Avoid prioritizing me because I look bad w/o jitter!");
        pGMan.addToManager(4);
        //needs to aggregate... something. I think apply to x axis a count.
        //displayScatter(pam1,pam2);
    }



    //wrote these for the future idk
    if( pManager.getType(pam1)=="lat" && pManager.getType(pam1)=="long"){
        console.log("It's a map!");
        pGMan.addToManager(5);
    }
    if( pManager.getType(pam1)=="long" && pManager.getType(pam1)=="lat"){
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
        pGman.prioritize(pam1, pam2);

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