

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

/**
 * clears the x names and values
 */
xyManager.prototype.clearX = function(){
    this.x_name = null;
    this.x_value = null;
}

/**
 * clears the y names and values
 */
xyManager.prototype.clearY = function(){
    this.y_name = null;
    this.y_value = null;
}
/**
 * show the current x value at the top right part of the page
 */
xyManager.prototype.placeCoordinateX = function(){
    var place = document.getElementById("xParameter");
    //if(place.hasChildNodes()){
        xymanager.clearCoordinateX();
    //}
    var index = this.getX();
    var text = pManager.getRealName(index);
    //text = "X | " + text.charAt(0).toUpperCase() + text.slice(1);
    text = text.charAt(0).toUpperCase() + text.slice(1);
    var name = document.createTextNode(text);
    place.append(name);
};

/**
 * show the current y value at the top right part of the page
 */
xyManager.prototype.placeCoordinateY = function(){
    var place = document.getElementById("yParameter");
    //if(place.hasChildNodes()){
        xymanager.clearCoordinateY();
    //}
    var index = this.getY();
    var text = pManager.getRealName(index);
    //text = "Y | " + text.charAt(0).toUpperCase() + text.slice(1);
    text = text.charAt(0).toUpperCase() + text.slice(1);
    var name = document.createTextNode(text);
    place.append(name);

};

/**
 * clear the x value shown at top right of the page
 */
xyManager.prototype.clearCoordinateX = function(){
    var place = document.getElementById("xParameter");
    if(place.textContent.length > 5){
        place.textContent = "";
        place.textContent = " X | ";
    }

};

/**
 * clear the y value shown at top right of the page
 */
xyManager.prototype.clearCoordinateY = function(){
    var place = document.getElementById("yParameter");
    if(place.textContent.length > 5){
        place.textContent = "";
        place.textContent = " Y | ";
    }

};