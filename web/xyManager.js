

var xyManager = function() {
    console.log("xymanager created");
    var x_value;
    var y_value;
};


xyManager.prototype.getArray = function(){
    var xy_array = [];
    xy_array.push(this.x_value);
    xy_array.push(this.y_value);
    return xy_array;
};

xyManager.prototype.setValue = function(button){
  if(button.indexOf('x') != -1){
      this.setX( button.substring(button.lastIndexOf("-") + 1) );
  }else this.setY( button.substring(button.lastIndexOf("-") + 1) );

};

xyManager.prototype.setX = function(xValue){
    //check if value is already at 0
    this.x_value = xValue;

    if(this.isSet()){
        //call something to create the graph
    }
};

xyManager.prototype.setY = function(yValue){
    this.y_value = yValue;
    if(this.isSet()){
        //call something to create the graph
    }
};

xyManager.prototype.isSet = function(){
    if(typeof this.x_value == 'undefined' || typeof this.y_value == 'undefined'){
        return false;
    }else{
        return true;
    }
};

xyManager.prototype.getY = function(){
    return this.y_value;
};

xyManager.prototype.getX = function(){
    console.log("made it");
    return this.x_value;
};