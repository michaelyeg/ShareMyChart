/**
All graphs will inhert from this one
How to make an abstract class in Javascript:
 Jordao, Stack Overflow: http://stackoverflow.com/users/31158/jord%C3%A3o
 http://stackoverflow.com/a/21220964
 */



/**
 * Graph is an abstract class that defines variables and functions for all other graphs
 * @constructor
 */
var Graph = function(){
    var xAxis;
    var yAxis;
    var filter;
    var size;
    var aggregate;
    var colorscheme;

    graphType.prototype = Object.create(graphType.prototype);

    graphType.prototype.constructor = graphType;

};

/**
 * create a graphType
 */
function graphType() {
    graphType.call(this);
}

/**
 * get the x axis value
 * @returns {xAxis}
 */
Graph.prototype.getxAxis = function(){
    return this.xAxis;
}

/**
 * get the y axis value
 * @returns {yAxis}
 */
Graph.prototype.getyAxis = function(){
    return this.yAxis;
}

/**
 * set the x axis value
 * @param xval
 */
Graph.prototype.setxAxis = function(xval){
    this.xAxis = xval;
}

/**
 * set the y axis value
 * @param yval
 */
Graph.prototype.setyaxis = function(yval){
    this.yAxis = yval;
}

/**
 * set the enum
 * @param type
 */
Graph.prototype.setgraphType = function(type){
    this.graphType = type;
}

/**
 * get the enum
 * @param type
 */
Graph.prototype.getgraphType = function(){
    return this.graphType;
}

/**
 * Inheriting classes define their own makeGraph function
 * @abstract
 */
Graph.prototype.makeGraph = function(){
    throw new Error("Abstract method!");
}



