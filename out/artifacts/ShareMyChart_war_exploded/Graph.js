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
};


/**
 * get the x axis value
 * @returns {xAxis}
 */
Graph.prototype.getxAxis = function(){
    return xAxis;
}

/**
 * get the y axis value
 * @returns {yAxis}
 */
Graph.prototype.getyAxis = function(){
    return yAxis;
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
 * Inheriting classes define their own makeGraph function
 * @abstract
 */
Graph.prototype.makeGraph = function(){
    throw new Error("Abstract method!");
}



