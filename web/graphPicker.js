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

function pickGraphTypes(pam1, pam2) {

    var pGMan = new PossibleGraphManager();

    if ((pam1.type=="nominal" || pam1.type =="date" )&& (pam2.type=="numeric")){
        console.log("It's a bar v chart!");
        pGMan.addToManager(0);
    }

    //did this kinda quickly, might be wrong, very confusing
    if ( (pam1.type=="numeric" || pam1.type=="date" || pam1.type=="nominal") && pam2.type=="nominal")
    {
        console.log("It's a bar h chart!");
        pGMan.addToManager(1);
    }

    if( (pam1.type=="numeric" || pam1.type=="date") && (pam2.type=="date" || pam2.type=="numeric") ){
        console.log("It's a line graph!");
        pGMan.addToManager(2);

    }
    if( (pam1.type=="numeric" || pam1.type == "date") && (pam2.type=="numeric" || pam2.type=="date") ){
        console.log("It's a scatter graph A!");
        pGMan.addToManager(3);
    }
    if(pam1.type=="nominal" && pam2.type=="nominal"){
        console.log("It's a scatter graph B! Avoid prioritizing me because I look bad w/o jitter!");
        pGMan.addToManager(4);
        //needs to aggregate... something. I think apply to x axis a count.
    }



    //wrote these for the future idk
    if( pam1.type=="lat" && pam2.type=="long"){
        console.log("It's a map!");
        pGMan.addToManager(5);
    }
    if( pam1.type=="long" && pam2.type=="lat"){
        console.log("It's a map v2!");
        pGMan.addToManager(6);
    }
    //idke about slideshow yet

    testpG = pGMan;
    console.log("pG:" + testpG.getAll());
    visPG(pGMan);
    //if combo makes nothing
    if(pGMan.getLength() == 0){
        //alert("Parameters chosen do not make any valid graphs. Please try again.");
        //would be nice to reset the parameters here, but I'm not sure if that'll clear their ids...
    }else{
        //for now, make first choice, but I'm writing something to make an ordering of the choices to give the user
        pGMan.prioritize(pam1, pam2);
        //visPG(pGMan);
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

function visPG(pGMan){
    console.log("start picking graph");
    console.log(pGMan.getAll());
    var graph = pGMan.getAll();
    console.log("graph");
    console.log(graph.length);
    //graphArr = graph.split(",");
    var k = 0, i;
    var _html;
    $("#show-graph").empty();
    for (i = 0; i < 6; i++){
        if (i == graph[k]) {
            _html = '<div class="row">';
            _html += '<div class="col-md-4 col-md-offset-4">';
            k++;
            console.log(i);
            switch (i) {
                case 0:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/vertricalBar.png"  data-dismiss="modal" class="icon-default" id="vertiBar" onclick="BarChart.prototype.caller1()"></a></div></div>';
                    break;
                case 1:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/horizontalBar.png"  data-dismiss="modal" class="icon-default" id="horiBar" onclick="BarChart.prototype.caller2()"></a></div></div>';
                    break;
                case 2:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/lineChart.png" data-dismiss="modal" class="icon-default" id="lineCha" onclick="lineGraph.prototype.caller()"></a></div></div>';
                    break;
                case 3:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/scatterPlot.png" data-dismiss="modal" class="icon-default" id="scatPlo1" onclick="Scatterplot.prototype.normalscatterplot()"></a></div></div>';
                    break;
                case 4:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/scatterPlot.png" data-dismiss="modal" class="icon-default" id="scatPlo2" onclick="Scatterplot.prototype.normalscatterplot()"></a></div></div>';
                    break;
                case 5:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/map.png" data-dismiss="modal" class="icon-default" id="map1"></a></div></div>';
                    break;
                case 6:
                    _html += '<a href="javascript:void(0);" class="thumbnail">';
                    _html += '<img src="icons/map.png" data-dismiss="modal" class="icon-default" id="map2"></a></div></div>';
                    break;
            }
            $("#show-graph").append(_html);
        }
    }
    $("#dialog").modal('show');
    console.log("finish picking graph");
}
