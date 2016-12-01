/**
 * Accordions to organize all of the header sections
 */
/**
 * create the accordions with the general names
 * @param array_of_params
 */

var xymanager = new xyManager();

function createAccordions(array_of_params){
    deletePlaceholder();
    var insertLocation =document.getElementById('putAccordionHere');
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id','accordion');
    var called = false; //so the list of parameters is only called once per header
    var temp;
    var childrenList;
    loop1:
    for(var name in array_of_params){
        temp = document.createElement('h3');
        called = false;
        //newdiv.setAttribute
        //newdiv.setAttribute('id',i);
        //newdiv.id = array_of_params[name].name;
        //newdiv.className = 'dragndropShape';
        childrenList = $(newdiv).find('h3');//.children;
        //console.log(childrenList);
        for(var p=0;p<childrenList.length;p++){
            //only create one heading for each type
            if(!(childrenList[p].textContent.localeCompare(array_of_params[name].value.getClassName()))){
               // called = false;
               continue loop1;
            }

        }

        if(called == false){
            title = document.createTextNode(array_of_params[name].value.getClassName());
            temp.appendChild(title); //put text node into it
            //temp.appendChild(addContents(array_of_params, array_of_params[name].value.class_value));
            newdiv.appendChild(temp);
            $(addContents(array_of_params, array_of_params[name].value.class_value)).insertAfter(temp);
            called = true;
        }


    }

   // console.log(newdiv);
    $(newdiv).appendTo(insertLocation);

    $( "#accordion" ).accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
}
/**
 * provide the accordions with their parameters
 * @param array_of_parameters
 * @param index
 */
function addContents(array_of_parameters,classval){
   // console.log(array_of_parameters);
    var p;
    var title;
    var contents = document.createElement('div');

    for(name in array_of_parameters){
        if(array_of_parameters[name].value.class_value == classval){
            p = document.createElement('p');
            //put in x and y buttons
            btnx = document.createElement('button');
            btnx.appendChild(document.createTextNode("X"));
            btnx.setAttribute('id', "x-" + name);
            btnx.setAttribute('class','xButton');
           // btnx.onclick = xClick;

            btny = document.createElement('button');
            btny.appendChild(document.createTextNode("Y"));
            btny.setAttribute('id',"y-" + name);
            btny.setAttribute('class','yButton');
           // btny.onclick = yClick;

            //put in each parameter
            title = document.createTextNode(" " + array_of_parameters[name].value.real_name.charAt(0).toUpperCase() + array_of_parameters[name].value.real_name.slice(1));
            //console.log(title);
            p.appendChild(btnx);
            p.appendChild(btny);
            p.appendChild(title); //put text into it
            contents.appendChild(p);
        }


    }
//console.log(contents);
    return contents;
}

/**
 * deals with all clicks of all x buttons
 * @param event
 */
$(document).on('click',".xButton",function(event){
    button = document.getElementById(this.id);
    var oldXid = xymanager.getXName();
    console.log(oldXid);
    if(typeof oldXid == 'undefined' || oldXid ==null){
        button.style.backgroundColor='#337ab7';//change my background color to blue
        xymanager.setX(this.id);
        xymanager.placeCoordinateX();
    }else if(oldXid!=(this.id)){
        oldbutton = document.getElementById(oldXid);
        oldbutton.style.backgroundColor='#FFFFFF';//change old one's background color to white
        button.style.backgroundColor='#337ab7';//change my background color to blue
        xymanager.setX(this.id);
        xymanager.placeCoordinateX()
    } /*else { //you clicked on the same button that is already blue, so change it back to white
        button.style.backgroundColor = '#FFFFFF';
        xymanager.setX(null);
        //TODO: clear the data when this happens
        //TypeArray.splice(0,TypeArray.length);
        //pManager.clearManager();
        //clearGraph();
        //GlobalDataArray.clear();
    }*/

});

/**
 * deals with all clicks of all y buttons
 * @param event
 */
$(document).on('click',".yButton",function(event){
    button = document.getElementById(this.id);
    var oldYid = xymanager.getYName();
    if(typeof oldYid == 'undefined' || oldYid == null){
        button.style.backgroundColor='#337ab7';//change my background color to blue
        xymanager.setY(this.id);
        xymanager.placeCoordinateY();
    }else if(oldYid!=(this.id)){
        console.log(oldYid);
        oldbutton = document.getElementById(oldYid);
        oldbutton.style.backgroundColor='#FFFFFF';//change old one's background color to white
        button.style.backgroundColor='#337ab7';//change my background color to blue
        xymanager.setY(this.id);
        xymanager.placeCoordinateY();
    } /*else { //you clicked on the same button that is already blue, so change it back to white
        button.style.backgroundColor = '#FFFFFF';
        xymanager.setY(null);
        //TODO: clear the data when this happens
    }*/
});

/**
 * removes the placeholder or old contents once the new data file is selected
 * deletes all children of the div
 */
function deletePlaceholder(){
    var deleteLocation =document.getElementById('putAccordionHere');
    //var children = deleteLocation.children;
  $(deleteLocation).empty();
};

function putTextBack(){
    var newdiv = document.createElement('div');
    var text = document.createTextNode("Please select a data file.");
    newdiv.appendChild(text);
    newdiv.setAttribute('id', 'placeholder');

    var theSpot = document.getElementById('putAccordionHere');
    theSpot.appendChild(newdiv);


};