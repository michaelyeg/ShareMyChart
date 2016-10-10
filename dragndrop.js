/**
 * Created by User on 2016-10-01.
 */
//    $( init );
$(document).ready(function initDragnDrop(){
    //drags and reverts to original position if its not dropped in a valid place
    $('.dragndropShape').draggable({cancel:false,
                                     revert: "invalid",
                                     cursor: "move",
                                     stack: ".dragndropShape",
                                     helper: function(){
                                             return $("<div class=\"dragndropShape\" id=\"dragndropShape\"> Hello </div>");
                                         }});

    $('.dropMe').droppable( {
        drop: handleDrop,
        hoverClass: "drop-area"
       /* over: function(event, ui) {
            //var property=document.getElementById(btn);
            $(this).style.backgroundColor=rgb('244,113,33');
            ui.draggable.data("current-droppable", $(this));
        }*/

    } );
});
//receives the drop
function handleDrop( event, ui ) {
    var draggable = ui.draggable;
    alert( 'The button with ID "' + draggable.attr('id') + '" was dropped onto me!' );
}

