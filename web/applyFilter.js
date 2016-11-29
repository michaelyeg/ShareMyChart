/**
 * Created by michaelximac on 2016-11-19.
 */
function applyFilter() {
    // Grab the data array and make a copy
    var c=count;
    var filterArray=new filterArray;
    while(c--){
        filterArray=collectFilter(filterArray,c);

    }
    var Data=GlobalDataArray.getArray();
    // Question for Landon: How am i supposde to get the ORIGINAL (unmodified) dataarray in case i want to reset the filter?
    var DataCopy=Data.prototype.duplicate();
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

function collectFilter(filterArray,count) {
    //TODO: acquire filter data from frontend
    var axis, condition, value;
    axis=document.getElementById("sizing-addon"+count).innerHTML;
    console.log(axis);
    var filter = new filter(axis,condition,value);
    filterArray.prototype.addData(filter);
    return filterArray;
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
 * @description return selected item in dropdown list
 * @param selectElement
 * @returns {*}
 */
function selectValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
}