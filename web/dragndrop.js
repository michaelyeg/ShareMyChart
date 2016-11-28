/**
 * Drag and Drop ui made from the Jquery UI library
 * Utilizes Draggable, Droppable, and Sortable types
 */


/**
 * initializes the droppables for parameters
 */
$(document).ready(function initDragnDrop(event, ui){

    $('.dropMe').droppable({
        disabled: false,
        hoverClass: "drop-area",
        connectToSortable: '.sortable',
        drop: (function(ev, ui) {
            //get the id of the object dropped onto the droppable and which droppable
            var dropId = $(this).attr("id");
            var dragid = $(ui.draggable).attr("id");
//console.log(dragid);
            //doSomething(dropId, dragId); //use the Id's to do something to the graph

            //next, deal with the draggables and sortable:

            var name = $(ui.draggable)[0].childNodes[0].nodeValue;

            $(ui.draggable).remove(); //remove the sortable, create a draggable on the droppable

            //create a draggable object to sit on top of the droppable, since the sortable can't do that
                newdiv = document.createElement('div');
                newdiv.setAttribute('id', dragid);
                newdiv.id = dragid;
            console.log("id is: " + newdiv.getAttribute("id"));
                newdiv.className = 'dragndropShape';
                createdDrags = document.createTextNode(name);
                newdiv.appendChild(createdDrags);

            $(newdiv).draggable({cancel:false,
                revert: "invalid",
                cursor: "move",
                stack: ".dragndropShape",
                hoverClass: "highlightBorder",
                connectToSortable: '.sortable'
                });

            $(this).append($(newdiv));
            $('newdiv').position({of: $(this), my: 'left top', at: 'left top'});

// Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
// http://stackoverflow.com/a/22211268
            //if there is already something in the droppable:
            if ( $(this).find(".dragndropShape").length > 1 ){
                replacedValue = $(this).find(".dragndropShape")[0];

// li is the old value getting sent back into the sortable
                var li = $("<li class='dragndropShape'/>").text(replacedValue.childNodes[0].nodeValue);
                var newId = replacedValue.getAttribute("id");
                $(li).attr("id",newId);
                $(replacedValue).remove();
                $(".sortable").append(li);
                $(".sortable").sortable('refresh');
            }

            var dropArray = document.getElementsByClassName("dropMe");
            console.log(dropArray);
            //console.log("Child0 is:" + dropArray[0].children.length + "Child1 is: " + dropArray[1].children.length)

            //check for if both parameters have been dropped - cue the visualizer!
            if(dropArray[0].children.length >= 1 && dropArray[1].children.length >= 1){
                //inside the if-statement for both parameters have been dropped
                console.log("Both pams dropped - call visualizer for graphs here!");

                //remove this once visualizer is done:
                //gets the data from the two parameters, then calls scatterplot:
                GetLink(dropArray[0].children[0].attributes[0].nodeValue, dropArray[1].children[0].attributes[0].nodeValue, GlobalStore);

               /* var scatterplot = new Scatterplot();
               scatterplot.normalscatterplot(GlobalDataArray.getArray()); */
                //console.log( "This is: " + dropArray[0].attr('id') );

                /*
                * FIRST call Landon's connection options thing, THEN call the graph visualizer!
                * Both for now are just going with their first option, if UI is possible for the S4.
                */
                //console.log("First: " + dropArray[0].children[0].attributes[0].nodeValue + "Second: " + dropArray[1].children[0].attributes[0].nodeValue)
                pickGraphTypes(dropArray[0].children[0].attributes[0].nodeValue, dropArray[1].children[0].attributes[0].nodeValue);
                var xType = ParameterManager.prototype.getType(dropArray[0].children[0].attributes[0].nodeValue);
                var yType = ParameterManager.prototype.getType(dropArray[1].children[0].attributes[0].nodeValue);
                initFilter();
                getType(xType,yType);
            }

        })

    } );
});


/**
 * Create a sortable list from an array of parameters.
 * @param: Dictionary[]
 */
function createDrags(array_of_params){ //document.ready
    /*
     Dynamically creating HTML elements using Javascript:
     KooiInc, Stack Overflow: http://stackoverflow.com/users/58186/kooiinc
     http://stackoverflow.com/a/5536711
     */

    //array_of_params = array_of_paramnames; //change after we have file reading correct
    var list = document.createElement('ul');
    list.setAttribute("id","sortable");
    list.className = "sortable";

//console.log(array_of_params);

    var createdDrags = "";
    var newdiv;
    var insertLocation =document.getElementById('drag_parameters');
    var i = 0;
    for(var name in array_of_params){
        newdiv = document.createElement('li');   //create a li element
        newdiv.setAttribute('id',i);
        //newdiv.id = array_of_params[name].name;
        newdiv.className = 'dragndropShape';
        createdDrags = document.createTextNode(array_of_params[name].name);
        newdiv.appendChild(createdDrags); //put text node into draggable
        list.appendChild(newdiv); //put draggable into the sortable list
        i++;
    }

    //$(list).insertAfter(insertLocation);
    $(list).appendTo(insertLocation);
    $('.sortable').sortable({
         connectWith: '.dragndropShape',
         appendTo: 'body',

        /*
        receive: function(event, ui) {
            //console.log(ui);
            var idback = ui.sender[0].attributes[0].nodeValue;
            console.log('receiving id', idback);
           // console.log("draggable: " + $(ui.item).id);
            $(this).data().uiSortable.currentItem.id = idback;
            //console.log("draggable: " + $(ui.item).id);
        }
        */
    });

};

/**
 * @description - clears the UI parameters shown
 */
function clearDrags(URL, clear_callback){
console.log("call on meeeee");

    //console.log(document.getElementById('sortable'));
    //var p = document.getElementById('sortable');
    //p.destroy();
   // var c = document.getElementsByClassName('sortable ui-sortable');
    //console.log(c);

    //var delLocation =document.getElementById('drag_parameters');
    console.log(document.getElementsByClassName('sortable'));
    $('.sortable').empty(); //**TODO make this clear the draggables again!! Somehow it was lost
    //console.log($(delLocation).find(".sortable").length);
     //console.log(delLocation);
  /*  var dropMes = document.getElementsByClassName('.dropMe');
    var droppedPams1 = $(dropMes[0]).find("dragndropShape");
    var droppedPams2 = $(dropMes[1]).find("dragndropShape");

    console.log(dropMes);

    droppedPams1[0].remove();
    droppedPams2[1].remove();
*/
  var dropp = document.getElementsByClassName("dropMe");
    console.log(dropp);
    var d1=$(dropp[0]).find('.dragndropShape');
    var d2 = $(dropp[1]).find('.dragndropShape');

    console.log(d1);
        //d1[0].remove();
    //d2[0].remove();

    clear_callback(URL);
    /*while (delLocation.hasChildNodes()) {
        delLocation.removeChild(delLocation.lastChild);
    }*/

}

