/**
 * Created by landon on 20/11/16.
 */

function DataObject(dataX, dataY, nameX, nameY, typeX, typeY){
    this.dataX = dataX;
    this.dataY = dataY;
    this.nameX = nameX;
    this.nameY = nameY;
    this.typeX = typeX;
    this.typeY = typeY;
}

var DataArray = function (){
    this.Array = [];
    this.flip = 0;
}

DataArray.prototype.addData = function(object){
    if (this.flip == 0) {
        this.getInt(object);
    }else{
        var tempname = object.nameX;
        var tempdata = object.dataX;
       // var temptype = object.typeX;
        object.dataX = object.dataY;
        object.nameX = object.nameY;
        //object.typeX = object.typeY;
        object.nameY = tempname;
        object.dataY = tempdata;
        //object.typeY = temptype;
        this.getInt(object);
    }
};
DataArray.prototype.getArray = function(){
    return this.Array;
};
DataArray.prototype.clear = function(){
    this.Array = [];
    this.flip = 0;
};
DataArray.prototype.flipper = function(){
    this.flip = 1;
};
DataArray.prototype.getInt = function(object){
    if (object.typeX == "numeric"){
        object.dataX = parseFloat(object.dataX);
    }
    if (object.typeY == "numeric"){
        object.dataY = parseFloat(object.dataY);
    }
    this.Array.push(object);

}

DataArray.prototype.duplicate = function(){
    var copy = [];
    var obj = {};
    for(var i = 0; i < this.Array.length; i++) {
        obj = new DataObject(
            this.Array[i].dataX,
            this.Array[i].dataY,
            this.Array[i].nameX,
            this.Array[i].nameY,
            this.Array[i].typeX,
            this.Array[i].typeY
        );
        copy.push(obj);
    }
    return copy;
}

DataArray.prototype.delete=function(index){
    this.Array.splice(index,1);
}