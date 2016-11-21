/**
 * Created by landon on 20/11/16.
 */
function Aggregate(XY){
    var data = GlobalDataArray.getArray();
    var NewArray = [];
    var tempOject = {};
    var ArrayFinal = [];
    var Obj;
    //Get distinct names

    if(XY == "X") {
        for (var object = 0; object < data.length; object++) {
            Obj = new DataObject(data[object].dataX, 0, data[object].nameX, data[object].nameY, data[object].typeX, data[object].typeY);

            for (var object2 = 0; object2 < data.length; object2++) {
                if (Obj.dataX === data[object2].dataX) {
                    Obj.dataY = Obj.dataY + 1
                }
            }
            NewArray.push(Obj);
        }
        for (var i = 0; i < NewArray.length; i++) {
            var found = false;
            for (var x = 0; x < ArrayFinal.length; x++) {
                if (NewArray[i].dataX === ArrayFinal[x].dataX) {
                    found = true;
                }
            }
            if (!found) {
                ArrayFinal.push(NewArray[i]);
            }
        }
    }

    if(XY == "Y") {
        for (var object = 0; object < data.length; object++) {
            Obj = new DataObject(0, data[object].dataY, data[object].nameX, data[object].nameY, data[object].typeX, data[object].typeY);

            for (var object2 = 0; object2 < data.length; object2++) {
                if (Obj.dataY === data[object2].dataY) {
                    Obj.dataX = Obj.dataX + 1
                }
            }
            NewArray.push(Obj);
        }
        for (var i = 0; i < NewArray.length; i++) {
            var found = false;
            for (var x = 0; x < ArrayFinal.length; x++) {
                if (NewArray[i].dataY === ArrayFinal[x].dataY) {
                    found = true;
                }
            }
            if (!found) {
                ArrayFinal.push(NewArray[i]);
            }
        }

    }
    return ArrayFinal;

}
