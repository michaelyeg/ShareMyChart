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
var Pam7 = new Parameter("http://schema.org/eligibleQuantity", "http://schema.org/Offer");
var GlobalX;
var GlobalY;
var GlobalDataArray = new DataArray();
//TODO: update all the Javadocs ive changed alot of parameters
//TODO: Attempt using data with more then one possible path to the data type. Will they be in order in the global list?
/**
 * @description This function Discovers the Link between two Parameters and then Retrieves the data from the Path discovered
 * Global Parameters created for testing in the console
 * @param Param1 - The X variable for the chart
 * @param Param2 - The Y variable for the chart
 * @param graph - The Store object
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

    MakeGraph(graph);
/*
    for (var link_length = 0; link_length < 4; link_length++) {


        if(uri1 !== uri2) {
            var query1 = QueryBuilderLink(uri1, uri2, link_length);
            var query2 = QueryBuilderLink(uri2, uri1, link_length);
            //console.log(query1);

            //Try looking for link bewteen classes.
            graph.execute(query1, GetLinkResult);
            graph.execute(query2, GetLinkResultFlipped);

        }else{
            var specialArray = [{name:GlobalX.real_name, uri:GlobalX.name}, GlobalX, {name:GlobalY.real_name,uri:GlobalY.name}];
            //console.log(specialArray);
            GetData(GlobalX.name, GlobalY.name, GlobalStore, specialArray);
            break;

        }

    }
    */

}


/**
 * Out of Date Function
 * @param err
 * @param results
 * @constructor
 */
function GetLinkResult(err, results) {


    //console.log("Get One Link Results:");
    //console.log(results);
    //console.log(GlobalX);
    //console.log(GlobalY);
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
        //console.log("HERE:");
        //console.log(temp_results)
        //TODO: send data to the prompt instead of skipping and going right to GetData
        GetData(GlobalX.name, GlobalY.name, GlobalStore, temp_results);

    }
}
/**
 * Out Of Date Function
 * @param err
 * @param results
 * @constructor
 */
function GetLinkResultFlipped(err, results) {

    //console.log("Get One Link Results:");
    //console.log(results);
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
 * @description Takes Two uri's for the X and Y parameters respectively. And grabs the data from the Path defined in the GlobalLink
 * Pushed data as an array of pairs, representing the X,Y data points. The Array is currently Stored in the GlobalData array
 *
 * @param uri1
 * @param uri2
 * @param graph
 * @param Why does the function only work one way? try a reverse of the above function.
 */
//TODO: Update the GetData to use the new link format.
function GetData(uri1, uri2, graph, link_path){

    var DataObject;
    var query = QueryBuilderData(uri1, uri2, link_path );

    graph.execute(query,function(err, results) {

        for(var i = 0; i < results.length; i++){
            DataObject = {
                nameX:GlobalX.real_name,
                dataX:results[i].data1.value,
                typeX:GlobalX.type,
                nameY:GlobalY.real_name,
                dataY:results[i].data2.value,
                typeY:GlobalY.type
            };
            GlobalDataArray.addData(DataObject);
        }
        pickGraphTypes(GlobalX, GlobalY);
    });

}


/**
 * The fucntion creates and Undirected graph of the data so that link paths can be found.
 * @param store - Rdf store object
 * @constructor
 */
function MakeGraph(store){
    var query  = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
                  PREFIX : <http://example.org/> \
                  SELECT DISTINCT ?type1 ?type2 ?link1 FROM NAMED :rdfGraph { GRAPH ?g { \
                  ?x1 rdf:type ?type1.\
                  ?x2 rdf:type ?type2.\
                  ?x1 ?link1 ?x2.\
                  } }"
    store.execute(query, formatGraph);
}

/**
 * This function is called from within the Make Graph to handle the results of the query.
 * it passes the data to the Get data function
 * @param err
 * @param results
 */
function formatGraph(err, results){
    var UnGraph = new UnDirGraph();

    for (var i = 0; i < results.length; i++){
        var node1 = results[i].type1.value;
        var node2 = results[i].type2.value;
        var path = results[i].link1.value;

        var NewNode = new Node(node1);
        if(!UnGraph.hasNode(NewNode)){
            UnGraph.addNode(NewNode)
        }
        var index = UnGraph.getIndex(NewNode)
        UnGraph.nodeList[index].addNeighbour(node2, 2, path);

        NewNode = new Node(node2);
        if(!UnGraph.hasNode(NewNode)){
            UnGraph.addNode(NewNode)
        }
        index = UnGraph.getIndex(NewNode)
        UnGraph.nodeList[index].addNeighbour(node1, 1, path);
    }
    GraphSearch(UnGraph, GlobalX.class_value, GlobalY.class_value);
}



/**
 * This uses BFS to find all paths from a root to a node in the undirected graph
 * @param Graph - and undirected graph of parameters
 * @param param1 - a uri of the choosen X parameter type
 * @param param2 - a uri of the choosen Y parameter type
 * @constructor
 */
function GraphSearch(Graph, param1, param2){
    var root = new Node(param1);
    var index1 = Graph.getIndex(root);
    Graph.nodeList[index1].distance = 0;

    //Check special edge case where they are from the same type
    if(param1 == param2){
        //make a list of length three following the same format that the link result would follow otherwise
        //[[x, type, y]]  --> needs to be a nested array, as thats how the query builder takes arrays
        GetData(GlobalX.name, GlobalY.name, GlobalStore, [[GlobalX.name, param1, GlobalY.name ]] );

    }else {
        var toSearch = [Graph.nodeList[index1]];
        var found = [];

        while (toSearch.length > 0) {
            var current = toSearch[0];

            for (var i = 0; i < current.neighbours.length; i++) {

                //Get the node from the graph of the neighbour
                var tempNode = new Node(current.neighbours[i].node);
                var tempIndex = Graph.getIndex(tempNode);
                var node = Graph.nodeList[tempIndex];

                if (node.distance == -1) {
                    var path = current.neighbours[i].path;
                    node.distance = current.distance + 1;
                    node.parentPath.push(path);
                    toSearch.push(node);

                    if (node.name == param2) {

                        var list = backTrack(node, root, Graph);
                        found.push(list);
                    }
                }
            }
            toSearch.splice(0, 1);
        }
        GetData(GlobalX.name, GlobalY.name, GlobalStore, found[0]);
    }
}

/**
 * @description A helper function to back track and create the link path from the found node back to the root
 * @param node
 * @param root
 * @param Graph
 * @returns Array of 2 arrays, array[0]: is the link path, array[1]: the position array
 */
function backTrack(node, root, Graph){
    /*
    Need to make the link path in the desired form for display
    Form is X param, Xtype, link1, Type1, link2, Type2, link3.....Ytype, Y param
    shortest possible path is X param, type, Y param.

    There is also a parallel list for the position. The query builder needs to know the order of each triple.
     */

    //because we push things to the list it will be backwards so Y must be added first and it will be flipped at the end
    var linkPath = [GlobalY.name];
    var parlinkPath = [2];
    var current = node;
    var emerg = 0;

    //Once we find the root node we know we have looped back far enough
    while (current.name != root.name && emerg < 20){
        linkPath.push(current.name);
        linkPath.push(current.parentPath[0]);

        for(var i = 0; i < current.neighbours.length; i++){

            //Find the neighbour that has the same path as the parent path. Make this neighbour the next one to check.
            if(current.neighbours[i].path == current.parentPath){
                if(current.neighbours[i].position == 2){
                    parlinkPath.push(1,0);
                }else{
                    parlinkPath.push(2,0);
                }

                var tempNode = new Node(current.neighbours[i].node);
                var index = Graph.getIndex(tempNode);
                current = Graph.nodeList[index];


                break;
            }
        }
        emerg++;
    }
    linkPath.push(GlobalX.class_value, GlobalX.name);
    parlinkPath.push(1,2)
    return [linkPath.reverse(),parlinkPath.reverse()];
}