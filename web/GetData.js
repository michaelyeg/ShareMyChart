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
        GetData(GlobalX.name, GlobalY.name, GlobalStore, temp_results);
    }
}


/**
 * Function is identical to the GetLink but it will be called and needs to have the parameters in the opposite order from the way the
 *
 * @param Param1
 * @param Param2
 * @param graph
 * @constructor
 */
function GetLinkFlip(Param1, Param2, graph) {
        var uri1 = Param1.class_value;
        var uri2 = Param2.class_value;
        GlobalLink = [];

        //Try looking for link bewteen classes.
        graph.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   SELECT ?link1 FROM NAMED :rdfGraph { GRAPH ?g { \
                   ?s ?link1 ?y. \
                   ?s rdf:type <'+uri1+'>.\
                   ?y rdf:type <'+uri2+'>.  } }',
            function (err, results) {
                console.log("Get One Link Flipped Results:");
                console.log(results);
                if (results == []){
                    return;
                }else{
                    for (var i = 0; i < results.length; i++) {
                        var found = false;
                        var temp = results[i].link1.value;
                        for (var x = 0; x < GlobalLink.length; x++) {
                            if (temp == GlobalLink[x]) {
                                found = true;
                            }
                        }
                        if (!found) {
                            GlobalLink.push(temp);
                        }
                    }
                    //If length is > 0 then a path exists and data will be retrived
                    if (GlobalLink.length > 0) {
                        //TODO: return paths of all links
                        console.log(uri1);
                        GetData(Param1.name, Param2.name, GlobalStore);
                    }
                }
            }
        );

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
    /*
    graph.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
         PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
         PREFIX : <http://example.org/>\
         select ?p ?o ?o3 FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o. \
        ?s <'+uri1+'> ?o.\
        ?s <'+GlobalLink[0][2].uri+'> ?o2.\
        ?o2 <'+uri2+'> ?o3.\
        FILTER(?p != rdf:type). } }',
        function(err, results) {
            console.log("Results:");
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var double = [results[i].o.value, results[i].o3.value];
                GlobalData.push(double);
            }
        }
    );
    */
    //run suing query builder
    graph.execute(query,function(err, results) {
        console.log("Results using query Builder:");
        for(var i = 0; i < results.length; i++){
            DataObject = {
                nameX:GetName(uri1),
                dataX:results[i].data1.value,
                typeX:GlobalX.type,
                nameY:GetName(uri2),
                dataY:results[i].data2.value,
                typeY:GlobalY.type
            };
            DataArray.push(DataObject);


        }
        console.log(DataArray);
    });


}