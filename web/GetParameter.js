/**
 * Created by landon on 30/10/16.
 */
//maybe make this a class with private globals and getters
//Globals for store and parameter array
//Call parameter manager

var TypeArray = [];
var PredicateArray = [];
var ParameterList = {};
var GlobalStore;
/**
 *Creates a rdfstore for a given URL. The store ca then be queried.
 * @param URL
 * @constructor
 */
var GraphStore = function(URL){
    this.Store;
    this.URL = URL;
    //need to modify to make dynamic URL entry as a parameter of the function
    //just not sure how much of the string will need to be hardcoded and what path will be
    rdfstore.create(function(err, store) {
        store.execute('LOAD <http://localhost:8080/superstore-small.ttl> INTO GRAPH <http://example.org/rdfGraph>', function(err) {

            if (!err) {
                // Store created
                //potential async issue
                this.Store = store;
                GlobalStore = store;
                console.log("Store Created");
                var Confirm = confirm("Data will be loaded");
                if (Confirm){
                    GetParameterQuery(this);
                }
            }
        });
    });
};
//TODO: Make a clear function to wipe the Store


/**
 * Takes an Rdf store object and gets all the type from the graph
 * @param {GraphStore} graph_store
 */
function GetParameterQuery(graph_store) {
    console.log("Query executed");
    /*
     graphStore.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
     PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
     PREFIX : <http://example.org/>\
     SELECT DISTINCT ?p FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o. FILTER(?p != rdf:type). } }',
     */
    graph_store.Store.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX : <http://example.org/>\
                        select distinct ?type FROM NAMED :rdfGraph { GRAPH ?g { ?s rdf:type ?type } }',
        function(err, results_type) {
            //Get the type for display as a draggable parameter
            console.log("Results type:");
            console.log(results_type);

            //Get the Name value from the object and push value to global array
            for(var i = 0; i < results_type.length; i++){
                var name = GetName(results_type[i].type.value);
                TypeArray.push(name);
                //ParameterList.push(obj);
                //For each Type find the predicates that belong to it
                GetPredicateQuery(graph_store,results_type[i]);
            }
            console.log("TypeArray: ");
            console.log(TypeArray);
        }
    );
}

/**
 * Take a Rdf store and a type object and gets all the predicates associated with the Class
 * @param {GraphStore} graph_store
 * @param ClassObject
 */
function GetPredicateQuery(graph_store,ClassObject){
    var uri = ClassObject.type.value;
    graph_store.Store.execute(
        'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
         PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
         PREFIX : <http://example.org/>\
         select distinct ?p FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o; rdf:type <'+uri+'>. FILTER(?p != rdf:type). } }',
        function(err, results_predicate) {
            console.log("Results Predicates: " + uri);
            console.log(results_predicate);
            for (var i = 0; i < results_predicate.length; i++) {
                //Send to the Parameter class to be added to global list.
                //results_predicate[i] --> the predicate object
                //ClassObject --> the object for the class ex. Order or Offer
                //GetName(uri) --> will get the name in  reader
                //TODO: Create a parameter object with he predicate and then add to parameter object
            }
        }
    );
}

/**
 *
 * @constructor
 */
function GetDataFromParam(graph){
    graph.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
         PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
         PREFIX : <http://example.org/>\
         select ?p ?o FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o; rdf:type <http://schema.org/Order>. ?s <http://schema.org/orderDate> ?o.  FILTER(?p != rdf:type). } }',
        function(err, results) {
            console.log("Results:");
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var price = results[i].price;
            }
        }
    );
}


/**
 * Helper function to Get a readable title from a uri
 * @param {string} uri
 * @returns {string}
 */
function GetName(uri){
    var temp_array = uri.split('/');
    var name = temp_array[temp_array.length-1];
    return name;

}
console.log("Running Init!");
var new_Store = new GraphStore("URL");



