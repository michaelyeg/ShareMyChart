/**
 * Created by michaelximac on 2016-11-20.
 */

$("#numericButton").click(function () {
    var _html = '<div class="panel-body" id="drag_parameters">';
    _html += '<div class="input-group"> <span class="input-group-addon"> <input type="checkbox"> ' +
        '</span> <div class="dropMe" id="dropf1">drop</div> </div>';
    _html += '<select name="numberCondition"> <option value="<"><</option> ' +
        '<option value="=">=</option> <option value=">">></option> </select>';
    _html += '<input type="number" name="orderNumber">';
    $("#filterForm").append(_html);
});

$("#dateButton").click(function () {
    var _html = '<div class="panel-body" id="drag_parameters">';
    _html += '<div class="input-group"> <span class="input-group-addon"> <input type="checkbox"> ' +
        '</span> <div class="dropMe" id="dropf2">drop</div> </div>';
    _html += '<select name="numberCondition"> <option value="<"><</option> ' +
        '<option value="=">=</option> <option value=">">></option> </select>';
    _html += '<input type="date" name="orderNumber"><br>';
    $("#filterForm").append(_html);
});