
var graphmanager = new graphManager(); //global manager
/**
 * ensures that only one of each kind of graph is made.
 * @future programmers: you could turn these graphs into singletons
 * @constructor
 */
function graphManager() {
    this.barChart = new BarChart();
    this.lineGraph = new lineGraph();
    this.scatterplot = new Scatterplot();
    this.graphType = new graphType();

};

graphManager.prototype.makeVBC = function(values){
    this.graphType = 0;
    var dray = Aggregate("X", values);
    this.barChart.verticalBC(dray);
};

graphManager.prototype.makeHBC = function(values){
    this.graphType = 1;
    var dray = Aggregate("Y", values);
    this.barChart.horizontalBC(dray);
};

graphManager.prototype.makeLG = function(values){
    console.log(values);
    this.graphType = 4;
    var dray = Aggregate("X", values);
    this.lineGraph.horizontalLG(dray);
};

graphManager.prototype.makeSP = function(values){
    this.graphType = 8;
    this.scatterplot.normalscatterplot(values);
};

graphManager.prototype.clearGraph = function(){
    var graph = document.getElementById('graph');

};

graphManager.prototype.getGraphType = function(){
    return this.graphType.getType();
};

/**
 * @description Listen for the click for the vertical bar chart
 *
 */
/*$(document).ready(function(){
    document.getElementById('verticalBarChart').addEventListener("click", graphManager.prototype.makeVBC(GlobalDataArray.getArray()));
});
*/
/**
 * Listen for the click for the horizontal bar chart
 *
 */
/*$(document).ready(function(){
    document.getElementById('horizontalBarChart').addEventListener("click", graphManager.prototype.makeHBC(GlobalDataArray.getArray()));
});
*/
/**
 * Listen for the click for the scatterplot graph
 *
 */
/*$(document).ready(function(){
    document.getElementById('scatterplot').addEventListener("click", graphManager.prototype.makeSP(GlobalDataArray.getArray()));
});*/

/**
 * Listen for the click for the vertical line graph
 *
 */
/*$(document).ready(function(){
    document.getElementById('vlinegraph').addEventListener("click", graphManager.prototype.makeLG(GlobalDataArray.getArray()));
});*/


/*

The following are functions that call the functions in this class, since you cannot pass functions variables through button presses.
this would be refactored if there was more time
------------------------------------------------------------------------------------------------------------------------------------------------
 *//*
graphManager.prototype.callVBC = function(){
    graphmanager.makeVBC(GlobalDataArray.getArray());
};

graphManager.prototype.callHBC = function(){
    graphmanager.makeHBC(GlobalDataArray.getArray());
};

graphManager.prototype.callLG = function(){
    graphmanager.makeLG(GlobalDataArray.getArray());
};

graphManager.prototype.callSP = function(){
    graphmanager.makeSP(GlobalDataArray.getArray());
};*/