/**
 * Created by michaelximac on 2016-11-19.
 */
function applyFilter(filterArray) {
    // Grab the data array and make a copy
    var Data=GlobalDataArray.getArray();
    var DataCopy=Data.prototype.duplicate();

    for (var filter in filterArray){
        var datatype=filter.type;

        switch (datatype){
            case 'numeric':
                numericFilter(filter, DataCopy);
                break;
            case 'date':
                dateFilter(filter, DataCopy);
                break;
        }
    }


}

function numericFilter(filter, DataCopy){
    var condition=filter.condition;
    var number=filter.number;
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                // Question for Landon: How am i supposed to acquire the data below?
                if (!DataCopy[i]>number){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy[i]==number){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy[i]<number){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
    }
    return;
}

function dateFilter(filter, DataCopy) {
    var condition=filter.condition;
    var date=filter.date;
    switch (condition){
        case '>':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy[i]>date){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case  '=':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy[i]==date){
                    DataCopy.prototype.delete(i);
                }
            };
            break;
        case '<':
            for (var i=0; i < DataCopy.length; i++){
                if (!DataCopy[i]<date){
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