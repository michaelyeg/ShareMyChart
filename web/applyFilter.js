/**
 * Created by michaelximac on 2016-11-19.
 */
function applyFilter() {
    var c=count;
    var currentArray=new filterArray();
    while(c--){
        currentArray=collectFilter(currentArray,c);
    }
    // Grab the data array and make a copy
    var Data=GlobalDataArray.getArray();
    // Question for Landon: How am i supposed to get the ORIGINAL (unmodified) dataarray in case i want to reset the filter?
    var DataCopy=GlobalDataArray.duplicate();
    for (var filter in filterArray){
        var axis=filter.axis;
        switch (axis){
            case 'X':
                xFilter(filter, DataCopy);
                break;
            case 'Y':
                yFilter(filter, DataCopy);
                break;
        }
    }


}

function collectFilter(currentArray,count) {
    //TODO: acquire filter data from frontend
    var axis, condition, value;
    axis=document.getElementById("sizing-addon"+count).innerHTML;
    var s=document.getElementById("condition"+count);
    condition=selectValue(s);
    value=document.getElementById("value"+count).value;

    var newfilter = new filter(axis,condition,value);
    currentArray.addData(newfilter);
    return currentArray;
}

function xFilter(filter, DataCopy){
    var condition=filter.condition;
    var value=filter.value;
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataX>value){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataX==value){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataX<value){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
    }
    return;
}

function yFilter(filter, DataCopy) {
    var condition=filter.condition;
    var value=filter.value;
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataY>value){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataY==value){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataY<value){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
    }
    return;
}
/**
 * @description return selected value in dropdown list
 * @param selectElement
 * @returns {*}
 */
function selectValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex].value;
}