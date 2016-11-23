/**
 * Created by michaelximac on 2016-11-20.
 */
function filter(parameter,condition,type,number,date){
    this.type=type;
    this.parameter=parameter;
    this.condition=condition;
    this.number=number;
    this.date=date;
}

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