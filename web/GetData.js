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
var Pam2 = new Parameter("http://schema.org/price","http://schema.org/Offer");
var Pam3 = new Parameter("http://schema.org/name", "http://schema.org/Place");
var Pam4 = new Parameter("http://schema.org/name", "http://schema.org/Person");
var Pam5 = new Parameter("http://schema.org/name", "http://schema.org/Product");
var Pam6 = new Parameter("http://schema.org/longitude", "http://schema.org/GeoCoordinates");
var GlobalData = [];
var GlobalX;
var GlobalY;
//TODO: update all the Javadocs ive changed alot of parameters
//TODO: Attempt using data with more then one possible path to the data type. Will they be in order in the global list?
//TODO: indicate that the Data has been Flipped and return the data back unflipped
/**
 * This function Discovers the Link between two Parameters and then Retreives the data from the Path discovered
 * Global Parameters created for testing in the console
 * @param {Parameter Object} Param1 - The X variable for the chart
 * @param {Parameter Object} Param2 - The Y variable for the chart
 * @param {Graph Store Object} graph - The already made Store.
 * @constructor
 */
function GetLink(Param1, Param2, graph){
    var uri1 = Param1.class_value;
    var uri2 = Param2.class_value;
    GlobalX = Param1;
    GlobalY = Param2;
    GlobalLink = [];

    for (var link_length = 0; link_length < 4; link_length++) {

        var query1 = QueryBuilderLink(uri1, uri2, link_length);
        var query2 = QueryBuilderLink(uri2, uri1, link_length);
        //console.log(query1);

        //Try looking for link bewteen classes.
        graph.execute(query1, GetLinkResult);
        graph.execute(query2, GetLinkResult);
    }

}


function GetLinkResult(err, results) {

    //console.log("Get One Link Results:");
    //console.log(results);
    var temp_results = [{name:GlobalX.real_name,uri:GlobalX.name},
                          {name:GetName(GlobalX.class_value), uri:GlobalX.class_value}];

    if (results.length > 0) {
        var object = results[0]
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


/**
 * Takes Two uri's for the X and Y variables respectivley. And grabs the data from the Path defined in the GlobalLink
 * Pushed data as an array of pairs, representing the X,Y data points. The Array is currently Stored in the GlobalData array
 *
 * @param uri1
 * @param uri2
 * @param graph
 */
//TODO: Update the GetData to use the new link format.
function GetData(uri1, uri2, graph, link_path){
    var DataObject;
    var DataArray = [];
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
            DataArray.push(DataObject);


        }
        console.log(DataArray);
    });


}