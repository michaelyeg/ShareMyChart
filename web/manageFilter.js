/**
 * Created by michaelximac on i20.
 */

var xT,yT;
var count = 0;

function getParaType(xType, yType){
    xT = xType;
    yT = yType;
}


function initFilter (){
    //console.log("~~~~~~~~~~~block");
    document.getElementById("dropup1").style.display = "block";
    document.getElementById("delete1").style.display = "block";
    document.getElementById("updatebutton").style.display = "block";

}

$("#filterX").click(function(){

    var _html = '<div class="input-group filter" id='+ count +'> <span class="input-group-addon"> <input type="checkbox" class="check"> </span> ' +
        '<span class="input-group-addon" id="sizing-addon'+count+'">X</span> ';
    _html += '<select name="priceCondition" id="condition'+count+'"> <option value="<"><</option> <option value="=">=</option>' +
        ' <option value=">">></option><option value="<="><=</option><option value=">=">>=</option> </select>';

    var date = '<input type="date" id="value'+count+'" value="0" size="4"><br>';
    var num = '<input type="number" id="value'+count+'" value="0" size="4"><br>';

    if (xT == "date"){
        $("#filterForm").append(_html+date+"</div>");
    }
    else $("#filterForm").append(_html+num+"</div>");
    count++;
});

$("#filterY").click(function(){

    var _html = '<div class="input-group filter" id='+ count +'> <span class="input-group-addon"> <input type="checkbox" class="check"> </span> ' +
        '<span class="input-group-addon" id="sizing-addon'+count+'">Y</span>';
    _html += '<select name="priceCondition" id="condition'+count+'"> <option value="<"><</option> <option value="=">=</option>' +
        ' <option value=">">></option><option value="<="><=</option><option value=">=">>=</option> </select> ';

    var date = '<input type="date" id="value'+count+'" value="0" size="4"><br>';
    var num = '<input type="number" id="value'+count+'" value="0" size="4"><br>';

    if (yT == "date"){
        $("#filterForm").append(_html+date+"</div>");
    }
    else $("#filterForm").append(_html+num+"</div>");
    count++;

});

/**
 * @description delete user selected filter UIs.
 */
function deleteFilter() {
    var filters = document.getElementsByClassName("filter");
    for (var i = 0; i <filters.length; i++){
        if (filters[i].getElementsByTagName("input")[0].checked == true){
            var elem = filters[i];
            filters[i].parentNode.removeChild(elem);
        }
    }
    count--;
}

/**
 * @description delete existing filter UIs.
 */
function resetFilterUI(){
    var filters = document.getElementById("filterForm");
    $(filters).empty();
    /*var parent=document.getElementById("dropup1").style.display = "block";
    $(parent).empty();
    var parent2 = document.getElementById("delete1").style.display = "block";
    $(parent2).empty();
    var parent3 = document.getElementById("updatebutton").style.display = "block";
    $(parent3).empty(); */
    document.getElementById("dropup1").style.display = "none";
    document.getElementById("delete1").style.display = "none";
    document.getElementById("updatebutton").style.display = "none";

    count=0;
}