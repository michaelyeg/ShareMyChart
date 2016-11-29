

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
      this.setX( button );
  }else this.setY( button );

};

xyManager.prototype.setX = function(xValue){
    //check if value is already at 0
    var x_val = xValue.substring(xValue.lastIndexOf("-") + 1);

    this.x_value = x_val;

    if(this.isSet()){
        //call something to create the graph
        console.log("x=" + this.x_value + " y=" + this.y_value);
        this.startGraphing();
    }
};

xyManager.prototype.setY = function(yValue){
    var y_val = yValue.substring(yValue.lastIndexOf("-") + 1)

    this.y_value = y_val;
    if(this.isSet()){
        //call something to create the graph
        console.log("x=" + this.x_value + " y=" + this.y_value);
        this.startGraphing();
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

xyManager.prototype.startGraphing = function(){
    GetLink(this.x_value, this.y_value, GlobalStore);
    pickGraphTypes(this.x_value, this.y_value);
    var xType = pManager.getType(this.x_value);
    var yType = pManager.getType(this.y_value);
    initFilter();
    getParaType(xType,yType);
};