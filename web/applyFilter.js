/**
 * Created by michaelximac on 2016-11-19.
 */
/**
 * @description apply filter to backend from frontend
 */
function applyFilter() {
    var c=count;
    if (c==0){
        resetFilter();
        return;
    }
    var currentArray=new filterArray();
    while(c--){
        currentArray=collectFilter(currentArray,c);
    }
    // Grab the data array and make a copy
    //var Data=GlobalDataArray.getArray();
    // Question for Landon: How am i supposed to get the ORIGINAL (unmodified) dataarray in case i want to reset the filter?
    var DataCopy=GlobalDataArray.duplicate();
    for (var i=0; i<currentArray.size();i++){
        var ax=currentArray.Array[i].axis;
        switch (ax){
            case 'X':
                DataCopy=xFilter(currentArray.Array[i], DataCopy);
                break;
            case 'Y':
                DataCopy=yFilter(currentArray.Array[i], DataCopy);
                break;
        }
    }
    // TODO: how to reapply data and refresh the graph
    reloadGraph(DataCopy);
}

function resetFilter(){
    return;
}

function reloadGraph(data) {
    var type=graphmanager.getGraphType();
    switch (type){
        case '1':
            graphmanager.makeVBC(data);
            break;
        case '2':
            graphmanager.makeHBC(data);
            break;
        case '3':
            graphmanager.makeLG(data);
            break;
        case '4':
            graphmanager.makeSP(data);
            break;
    }
}
/**
 * @description collect filter objects from UI
 * @param currentArray
 * @param count
 * @returns {*}
 */
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

/**
 * @description apply filter for x-axis
 * @param fil
 * @param DataCopy
 * @returns {*}
 */
function xFilter(fil, DataCopy){
    var condition=fil.condition;
    var value=fil.value;
    console.log("Before:"+DataCopy.length);
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                if (!(DataCopy[i].dataX>value)){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!(DataCopy[i].dataX==value)){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!(DataCopy[i].dataX<value)){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case '<=':
            for (var i=0; i < DataCopy.length; i++){
                if (DataCopy[i].dataX>value){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case '>=':
            for (var i=0; i < DataCopy.length; i++){
                if (DataCopy[i].dataX<value){
                    DataCopy.splice(i,1);
                }
            };
            break;
    }
    console.log("After:"+DataCopy.length);
    return DataCopy;
}

/**
 * @description apply filter for y-axis
 * @param fil
 * @param DataCopy
 * @returns {*}
 */
function yFilter(fil, DataCopy) {
    var condition=fil.condition;
    var value=fil.value;
    console.log("Before:"+DataCopy.length);
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                if (!(DataCopy[i].dataY>value)){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!(DataCopy[i].dataY==value)){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!(DataCopy[i].dataY<value)){
                    // Delete that object
                    DataCopy.splice(i,1);
                }
            };
            break;
        case '<=':
            for (var i=0; i < DataCopy.length; i++){
                if (DataCopy[i].dataY>value){
                    DataCopy.splice(i,1);
                }
            };
            break;
        case '>=':
            for (var i=0; i < DataCopy.length; i++){
                if (DataCopy[i].dataY<value){
                    DataCopy.splice(i,1);
                }
            };
            break;
    }
    console.log("After:"+DataCopy.length);
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