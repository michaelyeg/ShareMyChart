/**
 * Accordions to organize all of the header sections
 */
/**
 * create the accordions with the general names
 * @param array_of_params
 */
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
        console.log(childrenList);
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
            btnx.setAttribute('id', classval + "-" + array_of_parameters[name].value.real_name);
            btnx.setAttribute('class','xButton');
           // btnx.onclick = xClick;

            btny = document.createElement('button');
            btny.appendChild(document.createTextNode("Y"));
            btny.setAttribute('id', classval + "-" + array_of_parameters[name].value.real_name);
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
    console.log(this.id);
});

/**
 * deals with all clicks of all y buttons
 * @param event
 */
$(document).on('click',".yButton",function(event){
    console.log(this.id);
});

/**
 * removes the placeholder or old contents once the new data file is selected
 * deletes all children of the div
 */
function deletePlaceholder(){
    var deleteLocation =document.getElementById('putAccordionHere');
    //var children = deleteLocation.children;
  $(deleteLocation).empty();

}