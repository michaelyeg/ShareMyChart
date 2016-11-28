/**
 * Accordions to organize all of the header sections
 */
/**
 * create the accordions with the general names
 * @param array_of_params
 */
function createAccordions(array_of_params){
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
            console.log("jiffdsf");
            title = document.createTextNode(array_of_params[name].value.getClassName());
            temp.appendChild(title); //put text node into it
            //temp.appendChild(addContents(array_of_params, array_of_params[name].value.class_value));
            newdiv.appendChild(temp);
            $(addContents(array_of_params, array_of_params[name].value.class_value)).insertAfter(temp);
            called = true;
        }
    console.log("nooo");

    }

   // console.log(newdiv);
    $(newdiv).appendTo(insertLocation);

    $( "#accordion" ).accordion({
        collapsible: true
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
            title = document.createTextNode(array_of_parameters[name].value.real_name.charAt(0).toUpperCase() + array_of_parameters[name].value.real_name.slice(1));
            //console.log(title);
            p.appendChild(title); //put text node into it
            contents.appendChild(p);
        }


    }
//console.log(contents);
    return contents;
}
