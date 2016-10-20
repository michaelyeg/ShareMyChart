/**
 * Created by User on 2016-10-01.
 */
//    $( init );

//var dropHelp = true;

jQuery(document).ready(function initDragnDrop(event, ui){
    //drags and reverts to original position if its not dropped in a valid place
    $('.dragndropShape').draggable({cancel:false,
                                     revert: "invalid",
                                     cursor: "move",
                                     stack: ".dragndropShape",
                                     hoverClass: "highlightBorder",
                                     helper: "clone"}); /* function(){
                                        //helper says the same as the thing it was dragged from
                                            var dragText = getText(this);

                                             return $("<div class=\"dragndropShape\" id=\"dragndropShape\"></div>");
                                         }}); */

    $('.dropMe').droppable( {
        drop: handleDrop,
        hoverClass: "drop-area"


    } );
});


//receives the drop
function handleDrop( event, ui ) {
    var draggable = ui.draggable;
    //$(this).append($(ui.helper.children()));
    alert( 'The button with ID "' + draggable.attr('id') + '" was dropped onto me!' );
    //event.dataTransfer.setData("Text", event.target.id);
}


//returns the text inside the dragged object
function getText(obj) {
return obj.textContent;
}

//sets the text in an object
function setText(obj, newtext){
obj.textContent = newtext;
}