/**
 * Created by User on 2016-10-01.
 */


jQuery(document).ready(function initDragnDrop(event, ui){
    //drags and reverts to original position if its not dropped in a valid place
    $('.dragndropShape').draggable({cancel:false,
                                     revert: "invalid",
                                     cursor: "move",
                                     stack: ".dragndropShape",
                                     hoverClass: "highlightBorder",
        start: function(ev, ui) {

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

    $('.dropMe').droppable({
        //drop: handleDrop,
        disabled: false,
        hoverClass: "drop-area",


            drop: function(ev, ui) {

                $(this).append($(ui.draggable));
                //console.log($(this).find().length);
                ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
                $(ev['target']).droppable('disable');
            }

    } );
});


//receives the drop
function handleDrop( eve, ui ) {


}
