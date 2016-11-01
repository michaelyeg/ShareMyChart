/**
 * Created by landon on 30/10/16.
 */
//maybe make this a class with private globals and getters
//Globals for store and parameter array
var graphStore;
var parameterArray = [];
console.log("poop");


function init() {
    //need to modify to make dynamic URL entry as a parameter of the function
    //just not sure how much of the string will need to be hardcoded and what path will be
    rdfstore.create(function(err, store) {
        store.execute('LOAD <http://localhost:8080/data/superstore-small.ttl> INTO GRAPH <http://example.org/rdfGraph>', function(err) {

            if (!err) {
                // Store created
                //potential async issue
                graphStore = store;
                console.log("Store Created");
            }
        });
    });
}

function GetparameterQuery() {
    console.log("Query executed");
    graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX : <http://example.org/>\
                        SELECT DISTINCT ?type FROM NAMED :rdfGraph { GRAPH ?g { ?s rdf:type ?type } }',
        function(err, results) {
            console.log("Results:");
            console.log(results);
            //Get the Name value from the object and push value to global array
            for(var i = 0; i < results.length; i++){
                var temp_name = results[i].type.value;
                var temp_array = temp_name.split('/');
                parameterArray.push(temp_array[temp_array.length-1]);
            }
            console.log("ParameterArray: ");
            console.log(parameterArray);
        }
    );
}

console.log("Running Init!");
init();

