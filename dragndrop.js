/**
 * Created by User on 2016-10-01.
 */
//    $( init );

function initDragnDrop() {
    //drags and reverts to original position if its not dropped in a valid place
    $('#drag').draggable({cancel:"false",
        revert: "invalid",
        cursor: "move",
        snap : "drop",
        stack : ".drag"}); // doesnt work??

    $('#drop').droppable( {
        drop: handleDrop
    } );
}
function handleDrop( event, ui ) {
    var draggable = ui.draggable;
    alert( 'The button with ID "' + draggable.attr('id') + '" was dropped onto me!' );
}
