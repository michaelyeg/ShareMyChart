/**
 * Created by User on 2016-10-01.
 */


$(document).ready(function initDragnDrop(event, ui){
    //drags and reverts to original position if its not dropped in a valid place
    /*    $('.dragndropShape').draggable({cancel:false,
     revert: "invalid",
     cursor: "move",
     stack: ".dragndropShape",
     hoverClass: "highlightBorder",
     start: function(ev, ui) {
     //code from Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
     // http://stackoverflow.com/a/22211268
     $('.ui-droppable').each(function(i, el) {

     console.log($(el).find('.ui-draggable').length);
     if (!($(el).find('.ui-draggable').length)){//&&($(el).find('ui-draggable').data("occupied") == false || undefined) ) {
     $(el).droppable('enable'); // ^^^ checks to make sure its unoccupied
     console.log("enabled");
     }
     })
     }
     //helper: "clone" //can decide if we want to use clones or not
     });
     */
    $('.dropMe').droppable({
        disabled: false,
        hoverClass: "drop-area",
        accept: '.sortable li',

        drop: (function(ev, ui) {
//code from Harrison Powers, Stack overflow: http://stackoverflow.com/users/2474735/harrison-powers
// http://stackoverflow.com/a/22211268
            //$(this).append($(ui.draggable));
            // console.log("children: " +$(this).children.length);
            //console.log($(this).children[0].tagName + " and " + $(this).children[1].tagName);
            $(this).append($(ui.sortable));
            console.log($(ui.sortable));

            //.find('.ui-draggable').length
            //console.log($(this).find().length);
            //ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
            //   ui.sortable.position({of: $(this), my: 'center', at: 'center'}); should be used
            // ui.draggable.css({ width: 100% });

            var width = $(this).width();
            var height = $(this).height();
            /*
             ui.sortable.css({
             height: height,
             width: width
             });
             */
            //console.log($(el).find('.ui-draggable').length);
            //if (($(this).children.length > 2)){ //if the droppable is already occupied
            //    alert('occupied! ' + $(this).children.length);
            //}
            console.log("length: " + $(this).find(".dragndropShape").length);
            if ( $(this).find(".dragndropShape").length > 1 ){
                //var name= $(this).find(".dragndropShape")[0].textContent;
                //alert(name);
                //($(this).find(".dragndropShape")[0]).draggable('destroy');
                //($(this).find(".dragndropShape")[0]).remove();//delete this draggable
                var originalPosition = document.getElementById('drag_parameters');
                //console.log("children: " + $(originalPosition).find('.dragndropShape').length);
                console.log(originalPosition.lastElementChild);
                $($(this).find(".dragndropShape")[0]).insertAfter(originalPosition.lastElementChild);
                // originalPosition.appendChild($(this).find(".dragndropShape")[0]);
                //note to self: make a var for this^^^
                //originalPosition.appendChild($(this).find(".dragndropShape")[0]);
            }

            //$(ev['target']).droppable('disable');
        })

    } );
});

// (height and width match) STILL A WIP
function dropCallback(event, ui) {
    var $this = jQuery(this);
    $this.append(ui.draggable);

    var width = $this.width();
    var height = $this.height();

    ui.draggable.css({
        height: height,
        width: width,
        top: 0,
        left: 0
    });
}

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
        newdiv.setAttribute('id','draggable');
        newdiv.setAttribute('class','sortable');
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
        // connectWith: '.dropMe' //turn dropme into a sortable?
    });

});