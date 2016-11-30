/**
Classify which graph is which
*
 */
function graphType() {
    var graphTypes = {
        VBC: 0,//vertical bar chart
        HBC: 1,//horizontal bar chart
        SVBC: 2, //stacked vertical bar chart
        SHBC: 3, //stacked horizontal barchart
        VLG: 4, //vertical line graph
        HLG: 5, //horizontal line graph
        MVLG: 6, //multi line vertical line graph
        MHLG: 7, //multi line horizontal line graph
        SP: 8 //scatterplot
        //add more as we make more charts
    };
}

graphType.prototype.setType = function(num){
    this.graphTypes = num;
}

graphType.prototype.getType = function(){
    return this.graphTypes;
}