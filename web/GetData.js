/**
 * Created by landon on 03/11/16.
 */
var GlobalLink = [];
var Uri1 = "http://schema.org/Order";
var Uri2 = "http://schema.org/Offer";
var Uri3 = "http://schema.org/Person";
var Prd2 = "http://schema.org/price";
var Prd1 = "http://schema.org/orderDate";
var Pam1 = new Parameter("http://schema.org/orderDate","http://schema.org/Order");
var Pam11 = new Parameter("http://schema.org/orderNumber","http://schema.org/Order");
var Pam2 = new Parameter("http://schema.org/price","http://schema.org/Offer");
Pam2.type = "numeric";
var Pam3 = new Parameter("http://schema.org/name", "http://schema.org/Place");
var Pam4 = new Parameter("http://schema.org/name", "http://schema.org/Person");
var Pam5 = new Parameter("http://schema.org/name", "http://schema.org/Product");
var Pam6 = new Parameter("http://schema.org/longitude", "http://schema.org/GeoCoordinates");
var GlobalX;
var GlobalY;
var GlobalDataArray = new DataArray();
//TODO: update all the Javadocs ive changed alot of parameters
//TODO: Attempt using data with more then one possible path to the data type. Will they be in order in the global list?
//TODO: indicate that the Data has been Flipped and return the data back unflipped
/**
 * @description This function Discovers the Link between two Parameters and then Retrieves the data from the Path discovered
 * Global Parameters created for testing in the console
 * @param Param1 - The X variable for the chart
 * @param Param2 - The Y variable for the chart
 * @param graph - The already made Store.
 * @constructor
 */
function GetLink(Param1, Param2, graph){

/*
    var uri1 = Param1.class_value;
    var uri2 = Param2.class_value;
    GlobalX = Param1;
    GlobalY = Param2;
    GlobalLink = [];
    GlobalDataArray.clear();
    */

    var uri1 = pManager.getClass(Param1);
    var uri2 = pManager.getClass(Param2);
    GlobalX = pManager.getParameter(Param1);
    GlobalY = pManager.getParameter(Param2);
    GlobalLink = [];


    for (var link_length = 0; link_length < 4; link_length++) {

        var query1 = QueryBuilderLink(uri1, uri2, link_length);
        var query2 = QueryBuilderLink(uri2, uri1, link_length);
        console.log(query1);

        //Try looking for link bewteen classes.

        graph.execute(query1, GetLinkResult);
        graph.execute(query2, GetLinkResultFlipped);

    }

}




function GetLinkResult(err, results) {


    console.log("Get One Link Results:");
    console.log(results);
    console.log(GlobalX);
    console.log(GlobalY);
    var temp_results = [{name:GlobalX.real_name,uri:GlobalX.name},
                          {name:GetName(GlobalX.class_value), uri:GlobalX.class_value}];

    if (results.length > 0) {
        var object = results[0];
        for (var key in object){
            var ListItem  = {};
            var x = object[key].value;
            ListItem.name = GetName(x);
            ListItem.uri = x;
            temp_results.push(ListItem);
        }
        ListItem = {name:GetName(GlobalY.class_value), uri:GlobalY.class_value};
        temp_results.push(ListItem);
        ListItem = {name:GlobalY.real_name, uri:GlobalY.name};
        temp_results.push(ListItem);
        GlobalLink.push(temp_results);
        //TODO: send data to the prompt instead of skipping and going right to GetData
        GetData(GlobalX.name, GlobalY.name, GlobalStore, temp_results);

    }
}

function GetLinkResultFlipped(err, results) {

    console.log("Get One Link Results:");
    console.log(results);
    var temp_results = [{name:GlobalY.real_name,uri:GlobalY.name},
        {name:GetName(GlobalY.class_value), uri:GlobalY.class_value}];

    if (results.length > 0) {
        var object = results[0]
        for (var key in object){
            var ListItem  = {};
            var x = object[key].value;
            ListItem.name = GetName(x);
            ListItem.uri = x;
            temp_results.push(ListItem);
        }
        ListItem = {name:GetName(GlobalX.class_value), uri:GlobalX.class_value};
        temp_results.push(ListItem);
        ListItem = {name:GlobalX.real_name, uri:GlobalX.name};
        temp_results.push(ListItem);
        GlobalLink.push(temp_results);
        //TODO: send data to the prompt instead of skipping and going right to GetData
        GlobalDataArray.flipper();
        GetData(GlobalX.name, GlobalY.name, GlobalStore, temp_results);
    }
}



/**
 * @description Takes Two uri's for the X and Y variables respectively. And grabs the data from the Path defined in the GlobalLink
 * Pushed data as an array of pairs, representing the X,Y data points. The Array is currently Stored in the GlobalData array
 *
 * @param uri1
 * @param uri2
 * @param graph
 * @todo Why does the function only work one way? try a reverse of the above function.
 */
//TODO: Update the GetData to use the new link format.
function GetData(uri1, uri2, graph, link_path){


    var DataObject;
    var query = QueryBuilderData(uri1, uri2, link_path );

    graph.execute(query,function(err, results) {
        console.log("Results using query Builder:");
        for(var i = 0; i < results.length; i++){
            DataObject = {
                nameX:link_path[0].name,
                dataX:results[i].data1.value,
                typeX:GlobalX.type,
                nameY:link_path[link_path.length-1].name,
                dataY:results[i].data2.value,
                typeY:GlobalY.type
            };

            //DataArray.push(DataObject);
            console.log(DataObject);
            GlobalDataArray.addData(DataObject);

        }
        console.log(GlobalDataArray);


        pickGraphTypes(GlobalX, GlobalY);

        console.log(Aggregate("X"));

    });


}