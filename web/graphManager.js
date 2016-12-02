
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
    //this.graphType = new graphType();
    this.graphType = 0; //empty

};

/**
 * make a vertical bar chart by calling from the barchart class
 * @param values
 */
graphManager.prototype.makeVBC = function(values){
    if(graphmanager.isData(values)){
        this.graphType = 1;
        var dray = Aggregate("X", values);
        dray = sortData("X", dray);
        console.log(dray);
        this.barChart.verticalBC(dray);
    } else return;



};

/**
 * make a horizontal barchart by calling from the barchart class
 * @param values
 */
graphManager.prototype.makeHBC = function(values){
    if(graphmanager.isData(values)) {

        this.graphType = 2;
        var dray = Aggregate("Y", values);
        console.log(dray);
        dray = sortData("Y", dray);
        this.barChart.horizontalBC(dray);
    } else return;
};

/**
 * make a line graph by calling from the linegraph class
 * @param values
 */
graphManager.prototype.makeLG = function(values){
    if(graphmanager.isData(values)) {
        console.log(values);
        this.graphType = 3;
        if(values[0].typeX == "numeric" && values[0].typeY == "numeric"){
            this.lineGraph.horizontalLG(values);
        }
        var dray = Aggregate("X", values);
        console.log(dray);
        dray = sortData("X", dray);
        //console.log(dray2);
        this.lineGraph.horizontalLG(dray);
    } else return;
};

/**
 * make a scatterplot by calling from the scatterplot class
 * @param values
 */
graphManager.prototype.makeSP = function(values){
    if(graphmanager.isData(values)) {
        this.graphType = 4;
        var agrDray;
        //check if x or y is nominal to aggregate
        if (values[0].typeX == "nominal" && values[0].typeY == "nominal") {
            agrDray = Aggregate("X", values);
            console.log(agrDray);
            agrDray = sortData("X", agrDray);
            //console.log(dray2);
            this.scatterplot.normalscatterplot(agrDray);

        } else {
//if neither value is nominal
            this.scatterplot.normalscatterplot(values);
        }

    }else return;

};

/**
 * retrieve the type of graph currently displayed
 * @returns {number}
 */
graphManager.prototype.getGraphType = function(){
    return this.graphType;
};

/**
 * are there currently data parameters selected?
 * @param data
 * @returns {boolean}
 */
graphManager.prototype.isData = function(data){
    if(data.length ==0) {
        alert("Please select data parameters");
        return false;
    }
    else return true;
}
