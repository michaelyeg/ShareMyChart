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
var Pam3 = new Parameter("http://schema.org/name", "http://schema.org/Product");
var GlobalData = [];

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
    GlobalLink = [];
    /*
     select ?link1 where { ?x ?link1 ? ?y ; rdf:type schemaorg:ParcelDelivery. ?y rdf:type schemaorg:Offer }
     */
    graph.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   SELECT ?link1 FROM NAMED :rdfGraph { GRAPH ?g { \
                   ?s ?link1 ?y; \
                   rdf:type <'+uri1+'>.\
                   ?y rdf:type <'+uri2+'>.  } }',
        function (err, results) {
            console.log("Get One Link Results:" );
            console.log(results);

            for (var i = 0; i < results.length; i++){
                var found = false;
                var temp = results[i].link1.value;
                for (var x = 0; x < GlobalLink.length; x++){
                    if (temp == GlobalLink[x]){
                        found = true;
                    }
                }
                if (!found){
                    GlobalLink.push(temp);
                }
            }

            //If length is > 0 then a apth exists and data will be retrived
            if(GlobalLink.length > 0) {
                console.log(uri1);
                GetData(Param1.name, Param2.name, GlobalStore);
            }

        }
    );

}
//TODO:Make this function to make a dynamic query based on how long the link is.
function QueryBuilder(uri1, uri2){
    var string1 = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>';
    var string2 = 'select ?subject ?data1 ?data2 FROM NAMED :rdfGraph {GRAPH ?g { \
                   ?subject <'+uri1+'> ?data1.';


    var stingx = '}}';
}

//TODO: Why does the function only work one way? try a reverse of the above function.
/**
 * Takes Two uri's for the X and Y variables respectivley. And grabs the data from the Path defined in the GlobalLink
 * Pushed data as an array of pairs, representing the X,Y data points. The Array is currently Stored in the GlobalData array
 *
 * @param uri1
 * @param uri2
 * @param graph
 */
function GetData(uri1, uri2, graph){
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
}