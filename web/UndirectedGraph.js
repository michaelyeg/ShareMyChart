/**
 * Created by landon on 28/11/16.
 */


var Node = function(name){
    this.name = name;
    this.neighbours = [];
    this.parentPath = [];
    this.distance = -1
};
Node.prototype.addNeighbour = function(node, position, path){
    var temp = {node: node, position: position, path: path};
    this.neighbours.push(temp);
};
Node.prototype.clear = function () {
    this.neighbours = [];
};
Node.prototype.hasNeighbour = function(node) {
    var found = false;
    for (var i = 0; i < this.neighbours.length; i++) {
        if (this.neighbours[i].node.name == node.name) {
            found = true;
        }
    }
    return found
}


var UnDirGraph = function(){
    this.nodeList = [];
};
UnDirGraph.prototype.addNode = function (node) {
    this.nodeList.push(node);
};
UnDirGraph.prototype.hasNode = function(node){
    var found = false;
    for (var i = 0; i < this.nodeList.length; i++) {
        if (this.nodeList[i].name == node.name) {
            found = true;
        }
    }
    return found

};
UnDirGraph.prototype.getIndex = function(node){
    var index = -1;
    for(var i = 0; i < this.nodeList.length; i++){
        if(this.nodeList[i].name === node.name){
            index = i;
        }
    }
    return index;
};