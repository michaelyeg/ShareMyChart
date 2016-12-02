/**
 * Created by landon on 28/11/16.
 */

/**
 * The Node object for a graph. takes a name which should be a uri
 */
var Node = function(name){
    this.name = name;
    this.neighbours = [];
    this.parentPath = [];
    this.distance = -1
};

/**
 * Adds a neighbour to the node
 * @param {string} node - name of the node
 * @param {integer} position - 1 for left 2 for right
 * @param {uri} path - the uri connecting the two nodes
 */
Node.prototype.addNeighbour = function(node, position, path){
    var temp = {node: node, position: position, path: path};
    this.neighbours.push(temp);
};

/**
 * clears the neighbour lis and resets the parent path and distance
 */
Node.prototype.clear = function () {
    this.neighbours = [];
    this.parentPath = [];
    this.distance = -1;
};

/**
 * checks if a node has a neighbour
 * @param node
 * @return {boolean}
 */
Node.prototype.hasNeighbour = function(node) {
    var found = false;
    for (var i = 0; i < this.neighbours.length; i++) {
        if (this.neighbours[i].node.name == node.name) {
            found = true;
        }
    }
    return found
};

/**
 * This creates a new Undirected Graph object
 * @constructor
 */
var UnDirGraph = function(){
    this.nodeList = [];
};
/**
 * This function takes a Node object and places it in the graph
 * @param {Node} node
 */
UnDirGraph.prototype.addNode = function (node) {
    this.nodeList.push(node);
};

/**
 * Checks if the graph already has a node in it
 * @param node
 * @return {boolean}
 */
UnDirGraph.prototype.hasNode = function(node){
    var found = false;
    for (var i = 0; i < this.nodeList.length; i++) {
        if (this.nodeList[i].name == node.name) {
            found = true;
        }
    }
    return found

};

/**
 * Takes a node object and returns the index for that object
 * @param node
 * @return {number}
 */
UnDirGraph.prototype.getIndex = function(node){
    var index = -1;
    for(var i = 0; i < this.nodeList.length; i++){
        if(this.nodeList[i].name === node.name){
            index = i;
        }
    }
    return index;
};