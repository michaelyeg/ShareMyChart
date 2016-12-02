/**
 * Created by landon on 20/11/16.
 */
function Aggregate(XY, data){
    //var data = GlobalDataArray.getArray();
    var NewArray = [];
    var tempOject = {};
    var ArrayFinal = [];
    var Obj;
    //Get distinct names

    if(XY == "X") {
        console.log(data);
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
                if (Obj.dataY == data[object2].dataY) {
                    Obj.dataX = Obj.dataX + 1
                }
            }
            NewArray.push(Obj);
        }
        for (var i = 0; i < NewArray.length; i++) {
            var found = false;
            for (var x = 0; x < ArrayFinal.length; x++) {
                if (NewArray[i].dataY == ArrayFinal[x].dataY) {
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




/**
 * @description - Sorts the data for displaying in a graph
 * @param XY - whether to sort the x or y axis
 * @param data - the array to sort (more like an object)
 */
function sortData(XY, data){
    var NewArray = [];
    var tempOject = {};
    var ArrayFinal = [];

    //if x, sort the x values, else sort the y values
    if(XY == "X"){
        var min = data[0];
        var minIndex=0;
        console.log("min:");
        console.log(min);

        if(min.typeX == "date"){
           NewArray = dateSortX(data);
            return NewArray;

        }else if(min.typeX =="numeric") {
            //for numeric data

            var count = data.length;

            while (count > 0) {
                for (var object = 0; object < data.length; object++) {
                    var result = containsObject(min, NewArray);
                    console.log(result);
                    if (min.dataX > data[object].dataX && !result ) {
                        console.log("New min found!");
                        min = data[object];
                        //minIndex=object;
                        console.log("The new min:");
                        console.log(min);
                    }

                }

                minIndex = data.indexOf(min);

                console.log("A loop of the data complete");
                var obj = new DataObject(min.dataX, min.dataY, min.nameX, min.nameY, min.typeX, min.typeY);
                NewArray.push(obj);

                //remove the one you just added to NewArray
                data.splice(minIndex, 1);
                count--;

                //assign min to next value not in NewArray
                for(var j=0; j < data.length; j++) {
                    if( !containsObject(data[j], NewArray) ){
                        min = data[j];
                    }
                }
                console.log("New min for next loop around:");
                console.log(min);

            }
        }else if(min.typeX == "nominal"){
            return data;
        }

        return NewArray;

    }else if (XY =="Y"){
        var min = data[0];
        var minIndex=0;
        console.log("min:");
        console.log(min);


        if(min.typeY == "date"){
            NewArray = dateSortY(data);
            return NewArray;

        }else if(min.typeY =="numeric") {
            //for numeric data

            var count = data.length;

            while (count > 0) {
                for (var object = 0; object < data.length; object++) {
                    var result = containsObject(min, NewArray);
                    console.log(result);
                    if (min.dataY > data[object].dataY && !result ) {
                        console.log("New min found!");
                        min = data[object];
                        //minIndex=object;
                        console.log("The new min:");
                        console.log(min);
                    }

                }

                minIndex = data.indexOf(min);

                console.log("A loop of the data complete");
                var obj = new DataObject(min.dataX, min.dataY, min.nameX, min.nameY, min.typeX, min.typeY);
                NewArray.push(obj);

                //remove the one you just added to NewArray
                data.splice(minIndex, 1);
                count--;

                //assign min to next value not in NewArray
                for(var j=0; j < data.length; j++) {
                    if( !containsObject(data[j], NewArray) ){
                        min = data[j];
                    }
                }
                console.log("New min for next loop around:");
                console.log(min);

            }
        }else if(min.typeY == "nominal"){
            return data;
        }

        return NewArray;



    }//end of else

}

//function from StackOverflow user cdhowie
//http://stackoverflow.com/questions/4587061/how-to-determine-if-object-is-in-array
function containsObject(obj, list) {
    var i=0;

    //console.log(list[0]);
    //console.log(obj);
    //console.log(list[1]);

    for (i; i < list.length; i++) {
        if (list[i].dataX == obj.dataX && list[i].dataY ==obj.dataY) {
            return true;
        }
    }

    return false;
}


function dateSortX(data){
    console.log("here! :)");
    var results = [];
    var Dateformat = [];
    var size = data.length;
    var index = 0;
    var min;

    //Convet the type of the Dateformat array
    for(var i = 0; i < data.length; i++){
        Dateformat.push( new Date(data[i].dataX));
    }
    console.log(Dateformat);

    while(index < size){
        min = 0;
        for(var i = 0; i < data.length ; i++){
            if (Dateformat[i]< Dateformat[min]){
               min = i

            }
        }
        console.log("pushing");
        console.log(data[min]);
        results.push(data[min]);
        data.splice(min,1);
        Dateformat.splice(min, 1);
        console.log(data);
        console.log(Dateformat);
        index++;
    }
    console.log("here :)");
    console.log(results);

    return results;
}

function dateSortY(data){
    console.log("here! :)");
    var results = [];
    var Dateformat = [];
    var size = data.length;
    var index = 0;
    var min;

    //Convet the type of the Dateformat array
    for(var i = 0; i < data.length; i++){
        Dateformat.push( new Date(data[i].dataY));
    }
    console.log(Dateformat);

    while(index < size){
        min = 0;
        for(var i = 0; i < data.length ; i++){
            if (Dateformat[i]< Dateformat[min]){
                min = i

            }
        }
        console.log("pushing");
        console.log(data[min]);
        results.push(data[min]);
        data.splice(min,1);
        Dateformat.splice(min, 1);
        console.log(data);
        console.log(Dateformat);
        index++;
    }
    console.log("here :)");
    console.log(results);

    return results;
}