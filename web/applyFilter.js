/**
 * Created by michaelximac on 2016-11-19.
 */
function applyFilter(param, datatype, condition, number) {
    var numericCondition=document.forms[0].numberCondition;
    numberCondition=selectValue(numberCondition);
    var orderNumber=document.forms[0].orderNumber.value;

    var dateCondition=document.forms[0].dateCondition;
    dateCondition=selectValue(dateCondition);
    var dateValue=document.forms[0].dateValue;
    // Grab the data array
    var Data=GlobalDataArray.getArray();
    var DataCopy=Data.prototype.duplicate();

    switch (datatype){
        case 'numeric':
            switch (condition){
                case '>':
                    for (var i=0; i < DataCopy.length; i++){
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
    }
}

/**
 * @description return selected item in dropdown list
 * @param selectElement
 * @returns {*}
 */
function selectValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
}