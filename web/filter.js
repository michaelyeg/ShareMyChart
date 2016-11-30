/**
 * Created by michaelximac on 2016-11-20.
 */
/**
 * @description single filter object
 * @param axis
 * @param condition
 * @param value
 */
var filter=function(axis,condition,value){
    // x or y
    this.axis=axis;
    this.condition=condition;
    this.value=value;
}

/**
 * @description store multiple filters into an array of objects
 */
var filterArray=function(){
    this.Array=[];
}

filterArray.prototype.addData=function(filter){
    this.Array.push(filter);
}

filterArray.prototype.delete=function(index){
    this.Array.splice(index,1);
}

filterArray.prototype.getArray=function () {
    return this.Array;
}

filterArray.prototype.clear=function () {
    this.Array=[];
}

filterArray.prototype.size=function () {
    return this.Array.length;
}