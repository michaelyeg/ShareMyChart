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


var TwoLinkQuery = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   select ?link1 ?midType ?link2 FROM NAMED :rdfGraph { GRAPH ?g  { \
                   ?x ?link1 ?mid . ?mid ?link2 ?y ; rdf:type <http://schema.org/Order>. ?mid rdf:type ?midType . ?y rdf:type schemaorg:Offer }'

//TODO: Attempt using data with more then one possible path to the data type. Will they be in order in the global list?
//TODO: indicate that the Data has been Flipped and return the data back unflipped
/**
 * @description This function Discovers the Link between two Parameters and then Retreives the data from the Path discovered
 * Global Parameters created for testing in the console
 * @param Param1 - The X variable for the chart
 * @param Param2 - The Y variable for the chart
 * @param graph - The already made Store.
 * @constructor
 */
function GetLink(Param1, Param2, graph){
    var uri1 = Param1.class_value;
    var uri2 = Param2.class_value;
    GlobalLink = [];



    var query1 = QueryBuilderLink(uri1, uri2, 3);
    console.log(query1);

    //Try looking for link bewteen classes.

    graph.execute(query1,
        function (err, results) {
            console.log("Get One Link Results:" );
            console.log(results);
            console.log(results[0]);
            console.log(results[0].length);
            var count=0;
            for(var p = 0; p < results[0].length; p++){
                count+=1;
                console.log(results[0][p]);
            }
            //If results are empty try flip the parameters to match the triples in the turtle file.
            if (results.length == 0){
                console.log("here");
                GetLinkFlip(Param2,Param1,GlobalStore);
            }else {
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
                    //TODO: have it just returnt he paths of all links
                    console.log(uri1);
                    GetData(Param1.name, Param2.name, GlobalStore);
                }
            }
        }
    );


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
 * @description Takes Two uri's for the X and Y variables respectivley. And grabs the data from the Path defined in the GlobalLink
 * Pushed data as an array of pairs, representing the X,Y data points. The Array is currently Stored in the GlobalData array
 *
 * @param uri1
 * @param uri2
 * @param graph
 * @todo Why does the function only work one way? try a reverse of the above function.
 */
function GetData(uri1, uri2, graph){

    var query = QueryBuilderData(uri1, uri2, GlobalStore );
    graph.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
         PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
         PREFIX : <http://example.org/>\
         select ?p ?o ?o3 FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o. \
        ?s <'+uri1+'> ?o.\
        ?s <'+GlobalLink[0]+'> ?o2.\
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
    //run suing query builder
    graph.execute(query,function(err, results) {
        console.log("Results using query Builder:");
        console.log(results);

    });


}