

var xyManager = function() {
    console.log("xymanager created");
    var x_value;
    var y_value;
    var x_name;
    var y_name;

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
    this.x_name = xValue;
    console.log(xValue);
   // if(xValue == null){
     //   return;
    //}else {
        var x_val = xValue.substring(xValue.lastIndexOf("-") + 1);

        this.x_value = x_val;

        if (this.isSet()) {
            //call something to create the graph
            console.log("x=" + this.x_value + " y=" + this.y_value);
            this.startGraphing();
        }
    //}
};

xyManager.prototype.setY = function(yValue){
    this.y_name = yValue;
   // if(yValue == null) {
     //   return;
    //}else{
        var y_val = yValue.substring(yValue.lastIndexOf("-") + 1)

        this.y_value = y_val;
        if (this.isSet()) {
            //call something to create the graph
            console.log("x=" + this.x_value + " y=" + this.y_value);
            this.startGraphing();
        }
    //}
};

xyManager.prototype.isSet = function(){
    if(typeof this.x_value == 'undefined' || typeof this.y_value == 'undefined' || this.x_value == null || this.y_value ==null){
        return false;
    }else{
        console.log(this.x_value);
        console.log(this.y_value);
        return true;
    }
};

xyManager.prototype.getY = function(){
    return this.y_value;
};

xyManager.prototype.getX = function(){
    return this.x_value;
};

xyManager.prototype.getXName = function(){
    return this.x_name;
};

xyManager.prototype.getYName = function(){
  return this.y_name;
};

xyManager.prototype.startGraphing = function(){
    GlobalDataArray.clear();
    GetLink(this.x_value, this.y_value, GlobalStore);
    //pickGraphTypes(this.x_value, this.y_value);
    var xType = pManager.getType(this.x_value);
    var yType = pManager.getType(this.y_value);
    initFilter();
    getParaType(xType,yType);
};

xyManager.prototype.clearManager = function(){
  this.x_name =null;
  this.y_name=null;
  this.x_value=null;
  this.y_value=null;
};