/**
 * Created by michaelximac on 2016-11-20.
 */

var xT,yT;
var count = 0;

function getParaType(xType, yType){
    xT = xType;
    yT = yType;
}


function initFilter (){
    console.log("~~~~~~~~~~~block");
    document.getElementById("dropup1").style.display = "block";
    document.getElementById("delete1").style.display = "block";
    document.getElementById("updatebutton").style.display = "block";
}

$("#filterX").click(function(){

    var _html = '<div class="input-group filter" id='+ count +'> <span class="input-group-addon"> <input type="checkbox" class="check"> </span> ' +
        '<span class="input-group-addon" id="sizing-addon3">X - axis</span> ';
    _html += '<select name="priceCondition"> <option value="<"><</option> <option value="=">=</option>' +
        ' <option value=">">></option> </select>';

    var date = '<input type="date" value="0" size="4"><br>';
    var num = '<input type="numeric" value="0" size="4"><br>';

    if (xT == "date"){
        $("#filterForm").append(_html+date+"</div>");
    }
    else $("#filterForm").append(_html+num+"</div>");
    count++;

});

$("#filterY").click(function(){

    var _html = '<div class="input-group filter" id='+ count +'> <span class="input-group-addon"> <input type="checkbox" class="check"> </span> ' +
        '<span class="input-group-addon" id="sizing-addon3">Y - axis</span>';
    _html += '<select name="priceCondition"> <option value="<"><</option> <option value="=">=</option>' +
        ' <option value=">">></option> </select> ';

    var date = '<input type="date" value="0" size="4"><br>';
    var num = '<input type="numeric" value="0" size="4"><br>';

    if (yT == "date"){
        $("#filterForm").append(_html+date+"</div>");
    }
    else $("#filterForm").append(_html+num+"</div>");
    count++;

});


function deleteFilter() {
    var filters = document.getElementsByClassName("filter");
    for (var i = 0; i <filters.length; i++){
        if (filters[i].getElementsByTagName("input")[0].checked == true){
            console.log(i);
            var elem = filters[i];
            filters[i].parentNode.removeChild(elem);
        }
    }
}