/**
 * Created by User on 2016-10-01.
 */


$(document).ready(function initDragnDrop(event, ui){
    //drags and reverts to original position if its not dropped in a valid place

    $('.dropMe').droppable({
        disabled: false,
        hoverClass: "drop-area",
       // accept: '.sortable li',
        connectToSortable: '.sortable',

        drop: (function(ev, ui) {
//code from Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
// http://stackoverflow.com/a/22211268
            //$(this).append($(ui.draggable));
            // console.log("children: " +$(this).children.length);
            //console.log($(this).children[0].tagName + " and " + $(this).children[1].tagName);


            //.find('.ui-draggable').length
            //console.log($(this).find().length);
            //ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
             // dragged.position({of: $(this), my: 'center', at: 'center'});
            // ui.draggable.css({ width: 100% });

          //  var width = $(this).width();
          //  var height = $(this).height();


            //dragged = $(ui.draggable);

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
                connectToSortable: '.sortable',

                //  start: function(ev, ui) {
                    //code from Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
                    // http://stackoverflow.com/a/22211268
               /*     $('.ui-droppable').each(function(i, el) {

                        console.log($(el).find('.ui-draggable').length);
                        if (!($(el).find('.ui-draggable').length)){//&&($(el).find('ui-draggable').data("occupied") == false || undefined) ) {
                            $(el).droppable('enable'); // ^^^ checks to make sure its unoccupied
                            console.log("enabled");
                        }
                    })
                }*/
            });
           // $(newdiv).insertAfter($(this));
            $(this).append($(newdiv));
            $('newdiv').position({of: $(this), my: 'left top', at: 'left top'});

            //console.log($(el).find('.ui-draggable').length);
            //if (($(this).children.length > 2)){ //if the droppable is already occupied
            //    alert('occupied! ' + $(this).children.length);
            //}

            console.log("length: " + $(this).find(".dragndropShape").length);
            if ( $(this).find(".dragndropShape").length > 1 ){
                replacedValue = $(this).find(".dragndropShape")[0];
                //var name= $(this).find(".dragndropShape")[0].textContent;
                //alert(name);
                //($(this).find(".dragndropShape")[0]).draggable('destroy');
                //($(this).find(".dragndropShape")[0]).remove();//delete this draggable
                //var originalPosition = document.getElementById('drag_parameters');
                //console.log("children: " + $(originalPosition).find('.dragndropShape').length);
                //console.log("last child on droppable: " + originalPosition.lastElementChild);
               // $($(this).find(".dragndropShape")[0]).insertAfter(originalPosition.lastElementChild);
                // originalPosition.appendChild($(this).find(".dragndropShape")[0]);
                //note to self: make a var for this^^^
//newdiv is a new draggable sitting inside the droppable, li is the old value getting sent back into the sortable

                var li = $("<li class='dragndropShape'/>").text(replacedValue.childNodes[0].nodeValue);
                li.id = replacedValue.id;
                $(replacedValue).remove();
                $(".sortable").append(li);

                $(".sortable").sortable('refresh');
            }

            //$(ev['target']).droppable('disable');
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


    //test parameter data, replace when we have real data
    var array_of_paramnames = ["Stocks", "Employee Salaries", "Sales", "Budget Spent", "Months", "Orders", "Fahjkshdas"];
    array_of_params = array_of_paramnames;
    var list = document.createElement('ul');
    list.setAttribute("id","sortable");
    list.className = "sortable";

    var createdDrags = "";
    var newdiv;
    var insertLocation =document.getElementById('drag_parameters');
    for(i=0;i<array_of_params.length;i++){
        newdiv = document.createElement('li');   //create a div
        newdiv.setAttribute('id',array_of_params[i]);
       // newdiv.setAttribute('class','sortable');
        newdiv.id = array_of_params[i];
        newdiv.className = 'dragndropShape';
        createdDrags = document.createTextNode(array_of_params[i]);
        newdiv.appendChild(createdDrags);

        //turn it into a draggable object
        /* $(newdiv).draggable(
         {cancel:false,
         revert: "invalid",
         cursor: "move",
         stack: ".dragndropShape",
         hoverClass: "highlightBorder",
         start: function(ev, ui) { */
//code from Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
// http://stackoverflow.com/a/22211268
        /*                $('.ui-droppable').each(function(i, el) {

         // console.log($(el).find('.ui-draggable').length);
         if (!($(el).find('.ui-draggable').length)){
         //$(el).droppable('enable'); // ^^^ checks to make sure its unoccupied
         //console.log("enabled");
         }
         })
         } */
        //helper: "clone" //can decide if we want to use clones or not
        /*          }


         );
         */
        //  $(newdiv).draggable().css("position", "absolute");

        //insertLocation.appendChild(newdiv); //make each draggable a child of the original location
        //$(newdiv).insertAfter(insertLocation);

        list.appendChild(newdiv);
    }
    console.log(list);
    $(list).insertAfter(insertLocation);
    $('.sortable').sortable({
         connectWith: '.dragndropShape',
         appendTo: 'body'
    });




});