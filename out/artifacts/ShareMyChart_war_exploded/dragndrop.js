/**
 * Created by User on 2016-10-01.
 */

//hard-coded test data
var array_of_paramnames = ["Stocks", "Employee Salaries", "Sales", "Budget Spent", "Months", "Orders", "Fahjkshdas"];

$(document).ready(function initDragnDrop(event, ui){
    //drags and reverts to original position if its not dropped in a valid place

    $('.dropMe').droppable({
        disabled: false,
        hoverClass: "drop-area",
        connectToSortable: '.sortable',

        drop: (function(ev, ui) {


            var id = $(ui.draggable).attr("id");
            var name = $(ui.draggable)[0].childNodes[0].nodeValue;

            $(ui.draggable).remove(); //remove the sortable, create a draggable on the droppable

                newdiv = document.createElement('div');   //create a div
                newdiv.setAttribute('id', id);
                // newdiv.setAttribute('class','sortable');
                newdiv.id = id
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
            console.log("length: " + $(this).find(".dragndropShape").length);
            if ( $(this).find(".dragndropShape").length > 1 ){
                replacedValue = $(this).find(".dragndropShape")[0];
//newdiv is a new draggable sitting inside the droppable, li is the old value getting sent back into the sortable

                var li = $("<li class='dragndropShape'/>").text(replacedValue.childNodes[0].nodeValue);
                li.id = replacedValue.id;
                $(replacedValue).remove();
                $(".sortable").append(li);
                $(".sortable").sortable('refresh');
            }

        })

    } );
});


//creates the appropriate number of draggable elements after the user uploads a file
$(document).ready(function createDrags(array_of_params){
    /*
     Dynamically creating HTML elements using Javascript:
     KooiInc, Stack Overflow: http://stackoverflow.com/users/58186/kooiinc
     http://stackoverflow.com/a/5536711
     */

    array_of_params = array_of_paramnames; //change after we have file reading correct
    var list = document.createElement('ul');
    list.setAttribute("id","sortable");
    list.className = "sortable";

    var createdDrags = "";
    var newdiv;
    var insertLocation =document.getElementById('drag_parameters');
    for(i=0;i<array_of_params.length;i++){
        newdiv = document.createElement('li');   //create a li element
        newdiv.setAttribute('id',array_of_params[i]);
        newdiv.id = array_of_params[i];
        newdiv.className = 'dragndropShape';
        createdDrags = document.createTextNode(array_of_params[i]);
        newdiv.appendChild(createdDrags); //put text node into draggable
        list.appendChild(newdiv); //put draggable into the list
    }
    console.log(list);
    $(list).insertAfter(insertLocation);
    $('.sortable').sortable({
         connectWith: '.dragndropShape',
         appendTo: 'body'
    });




});