/**
 * Created by landon on 30/10/16.
 */
//maybe make this a class with private globals and getters
//Globals for store and parameter array
//Call parameter manager

var graphStore;
var TypeArray = [];
var PredicateArray = [];
var ParameterList = {}


function init(){
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
    /*
    graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX : <http://example.org/>\
                        SELECT DISTINCT ?p FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o. FILTER(?p != rdf:type). } }',
                       */
    graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX : <http://example.org/>\
                        select distinct ?type FROM NAMED :rdfGraph { GRAPH ?g { ?s rdf:type ?type } }',
        function(err, results_type) {
            //Get the type for display as a draggable parameter
            console.log("Results type:");
            console.log(results_type);

            //Get the Name value from the object and push value to global array
            for(var i = 0; i < results_type.length; i++){
                var obj = {};
                var temp_name = results_type[i].type.value;
                var temp_array = temp_name.split('/');
                var name = temp_array[temp_array.length-1]
                TypeArray.push(name);

                obj[name] = [];
                //ParameterList.push(obj);
                //For each Type find the predicates that belong to it
                GetPredicateQuery(temp_name, name);
            }
            console.log("TypeArray: ");
            console.log(TypeArray);
        }
    );
}
function GetPredicateQuery(type, name){

    graphStore.execute(
        'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
         PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
         PREFIX : <http://example.org/>\
         select distinct ?p FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o; rdf:type <'+type+'> } }',
        function(err, results_predicate) {
            console.log("Results Predicates: ");
            console.log(results_predicate);
            for (var i = 0; i < results_predicate.length; i++) {
                //put each predicate in the array under its type
                //ParameterList[name].push(results_predicate[i]);
            }

        }

    );

}
function GetDataFromParam(){
    graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX schemaorg: <http://schema.org/>\
                        PREFIX : <http://example.org/>\
                        SELECT DISTINCT ?offer ?price ?date FROM NAMED :rdfGraph { GRAPH ?g { \
                                        ?offer schemaorg:price ?price. \
                                        ?offer schemaorg:orderDate ?date. } }',
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



/*
working query for predicate

 graphStore.execute(
 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
 PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
 PREFIX : <http://example.org/>\
 select distinct ?p FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o; rdf:type <http://schema.org/Order> } }',
 function(err, results_predicate) {
 console.log("Results Predicates: ");
 console.log(results_predicate);
 //Get the Name value from the object and push value to global array
 }

 );
 */


