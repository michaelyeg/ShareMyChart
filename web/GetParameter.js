/**
 * Created by landon on 30/10/16.
 */
//maybe make this a class with private globals and getters
//Globals for store and parameter array

var graphStore;
var parameterArray = [];


function init() {
    //need to modify to make dynamic URL entry as a parameter of the function
    //just not sure how much of the string will need to be hardcoded and what path will be
    rdfstore.create(function(err, store) {
        store.execute('LOAD <http://localhost:8080/superstore-small.ttl> INTO GRAPH <http://example.org/rdfGraph>', function(err) {

            if (!err) {
                // Store created
                //potential async issue
                graphStore = store;
                console.log("Store Created");
                var Confirm = confirm("Data will be loaded");
                if (Confirm){
                    GetParameterQuery();
                }
            }
        });
    });
}

function GetParameterQuery() {
    console.log("Query executed");
    graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX : <http://example.org/>\
                        SELECT DISTINCT ?p FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o. FILTER(?p != rdf:type). } }',
        function(err, results) {
            console.log("Results:");
            console.log(results);
            //Get the Name value from the object and push value to global array
            for(var i = 0; i < results.length; i++){
                var temp_name = results[i].p.value;
                var temp_array = temp_name.split('/');
                parameterArray.push(temp_array[temp_array.length-1]);
            }
            console.log("ParameterArray: ");
            console.log(parameterArray);
        }
    );
}

function GetDataFromParam(){
    graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX schemaorg: <http://schema.org/>\
                        PREFIX : <http://example.org/>\
                        SELECT DISTINCT ?price ?method FROM NAMED :rdfGraph { GRAPH ?g { \
                                        ?method schemaorg:price ?price ; \
                                        a schemaorg:orderDate . } }',
        function(err, results) {
            console.log("Results:");
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var price = results[i].price;
            }

        });
}
console.log("Running Init!");
init();
/*
console.log("Running Get Params");
GetParameterQuery();
*/


