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
    for (var i=0; i<currentArray.size();i++){
        var ax=currentArray.Array[i].axis;
        switch (ax){
            case 'X':
                xFilter(currentArray.Array[i], DataCopy);
                break;
            case 'Y':
                yFilter(currentArray.Array[i], DataCopy);
                break;
        }
    }
    // TODO: how to reapply data and refresh the graph

}

function collectFilter(currentArray,count) {
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
                    DataCopy.delete(i);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataX==value){
                    DataCopy.delete(i);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataX<value){
                    DataCopy.delete(i);
                }
            };
            break;
    }
    return DataCopy;
}

function yFilter(fil, DataCopy) {
    console.log("Y filter!");
    var condition=fil.condition;
    var value=Number(fil.value);
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataY>value){
                    DataCopy.delete(i);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy.Array[i].dataY==value){
                    DataCopy.delete(i);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                console.log(DataCopy.Array[i].dataY);
                if (!(Number(DataCopy.Array[i].dataY)<value)){
                    DataCopy.delete(i);
                }
            };
            break;
    }
    return DataCopy;
}
/**
 * @description return selected value in dropdown list
 * @param selectElement
 * @returns {*}
 */
function selectValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex].value;
}