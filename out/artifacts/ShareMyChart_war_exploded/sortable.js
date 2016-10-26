/**
 * Created by User on 2016-10-23.
 */

//holds the draggable items!

jQuery(document).ready(function initSortable(event, ui){

    $( "#sortable").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();


});