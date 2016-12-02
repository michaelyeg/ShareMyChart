/**
 * Created by michaelximac on 2016-11-03.
 */

/**
 * @description Pick graph based on their data type.
 * @param pam1 - index of parameter one (x-axis)
 * @param pam2 - index of parameter two (y-axis)
 * Use the parameter manager to locate and figure out their types!
 */

var testpG;
/**
 *
 * @param pam1
 * @param pam2
 * @param testThing - literally just for tests to not hit the UI part and not finish.
 */
function pickGraphTypes(pam1, pam2, testThing) {

    var pGMan = new PossibleGraphManager();
    //**TODO: vertical and horizontal bar charts should be the same values possible, decide!
    if ((pam1.type=="nominal" || pam1.type =="date" )&& (pam2.type=="numeric")){
        //console.log("It's a bar v chart!");
        pGMan.addToManager(0);
    }

    //did this kinda quickly, might be wrong, very confusing
    if ( (pam1.type=="numeric" || pam1.type=="date" ) && ( pam2.type=="nominal" || pam2.type=="date") )
    {
        //console.log("It's a bar h chart!");
        pGMan.addToManager(1);
    }

    if( (pam1.type=="numeric" || pam1.type=="date") && ( pam2.type=="numeric") ){
        //console.log("It's a line graph!");
        pGMan.addToManager(2);

    }
    if( (pam1.type=="numeric" || pam1.type == "date") && (pam2.type=="numeric" || pam2.type=="date") ){
        //console.log("It's a scatter graph A!");
        pGMan.addToManager(3);
    }
    //Issue 11: cannot make nominal-nominal scatterplot
   /* if(pam1.type=="nominal" && pam2.type=="nominal"){
        console.log("It's a scatter graph B! Avoid prioritizing me because I look bad w/o jitter!");
        pGMan.addToManager(4);
        //needs to aggregate... something. I think apply to x axis a count.
    } */



    //wrote these for the future idk
  /*  if( pam1.type=="lat" && pam2.type=="long"){
        console.log("It's a map!");
        pGMan.addToManager(5);
    }
    if( pam1.type=="long" && pam2.type=="lat"){
        console.log("It's a map v2!");
        pGMan.addToManager(6);
    } */
    //idke about slideshow yet

    testpG = pGMan;
    console.log("pG:" + testpG.getAll());

    //if combo makes nothing
    if(pGMan.getLength() == 0){
        //TODO: have an error message properly pop up when there are no possible graphs
        //alert("Parameters chosen do not make any valid graphs. Please try again.");
        //would be nice to reset the parameters here
    }else{
        //UI for the user to choose best graph
        pGMan.prioritize(pam1, pam2);
        if(typeof testThing == 'undefined') visPG(pGMan);


    }


}

/**
 * @description Aggregate counts of specified parameters.
 * @returns {dictionary} Returns a dictionary of aggregateParameter: count.
 */
/*
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
*/

/**
 * @description - Creates the UI for the user to choose the best graph possible for their chosen parameters.
 * @param pGMan - an Object of possibleGraphManager that holds an array that has been sorted to show the best graph first.
 */
function visPG(pGMan){
    //console.log("start picking graph");
    //console.log(pGMan.getAll());
    var graph = pGMan.getAll();
    //console.log("graph");
    //console.log(graph.length);
    //graphArr = graph.split(",");
    var k = 0, i;
    var _html;
    $("#show-graph").empty();
    for (i = 0; i < graph.length; i++){
        //if (i == graph[k]) {
            _html = '<div class="row">';
            _html += '<div class="col-md-4 col-md-offset-4">';
            //k++;
            console.log(graph[i]);
            switch (graph[i]) {
                case 0:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/vertricalBar.png"  data-dismiss="modal" class="icon-default" id="vertiBar" onclick="graphmanager.makeVBC(GlobalDataArray.getArray())"></a></div></div>';
                    //k++;
                    break;
                case 1:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/horizontalBar.png"  data-dismiss="modal" class="icon-default" id="horiBar" onclick="graphmanager.makeHBC(GlobalDataArray.getArray())"></a></div></div>';
                    //k++;
                    break;
                case 2:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/lineChart.png" data-dismiss="modal" class="icon-default" id="lineCha" onclick="graphmanager.makeLG(GlobalDataArray.getArray())"></a></div></div>';
                    //k++;
                    break;
                case 3:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/scatterPlot.png" data-dismiss="modal" class="icon-default" id="scatPlo1" onclick="graphmanager.makeSP(GlobalDataArray.getArray())"></a></div></div>';
                    //k++;
                    break;
                case 4:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/scatterPlot.png" data-dismiss="modal" class="icon-default" id="scatPlo2" onclick="graphmanager.makeSP(GlobalDataArray.getArray())"></a></div></div>';
                    //k++;
                    break;
                case 5:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/map.png" data-dismiss="modal" class="icon-default" id="map1"></a></div></div>';
                    //k++;
                    break;
                case 6:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/map.png" data-dismiss="modal" class="icon-default" id="map2"></a></div></div>';
                    //k++;
                    break;
            }
            $("#show-graph").append(_html);
        //}
    }
    $("#dialog").modal('show');
    //console.log("finish picking graph");
}
