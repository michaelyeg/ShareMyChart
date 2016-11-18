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

var pManager = new ParameterManager();

/**
 *Creates a rdfstore for a given URL. The store ca then be queried.
 * @param URL
 * @constructor
 */
var GraphStore = function(URL){
    this.Store;
    URLl = "http://localhost:8080/data/superstore-small.ttl";
    //need to modify to make dynamic URL entry as a parameter of the function
    //just not sure how much of the string will need to be hardcoded and what path will be
    rdfstore.create(function(err, store) {
        console.log("GET THE URL: "+URL);
        store.execute('LOAD <'+URL+'> INTO GRAPH <http://example.org/rdfGraph>', function(err) {

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
                        select ?s ?p ?o ?t FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o; rdf:type ?t. FILTER(?p != rdf:type). } }',
        function(err, results_type) { //edited above from: select distinct ?type FROM NAMED :rdfGraph { GRAPH ?g { ?s rdf:type ?type } }',
            //Get the type for display as a draggable parameter
            console.log("Results type:");
            console.log(results_type);

            //Get the Name value from the object and push value to global array
            for(var i = 0; i < results_type.length; i++){
                var name = GetName(results_type[i]['t'].value);
                if(TypeArray.indexOf(name) ==-1) {
                    TypeArray.push(name);
                }
                //ParameterList.push(obj);
                //For each Type find the predicates that belong to it
                //GetPredicateQuery(graph_store,results_type[i]); COMMENTED OUT
            }
            console.log("TypeArray: ");
            console.log(TypeArray);

            //get valid predicates, record their values, record final datatype
                            for(var i=0; i < results_type.length; i++){
                                var unknown=false;
                                //figure out the datatype
                                getDatatype(results_type[i], function(d_type){
                                    if(!d_type.localeCompare("unknown")){
                                        unknown=true;
                                    }

                                    if(!unknown) {
                                        //check that the predicate isn't already in the manager
                                        if (!pManager.checkExists(results_type[i]['p'].value, results_type[i]['t'].value, d_type)) {
                                            var pam = new Parameter(results_type[i]['p'].value, results_type[i]['t'].value);

                                            pManager.addParameter(pam);
                                            pManager.simplifyType(); //used to be a callback for the above, but still didnt work

                                        }
                                    }


                });

            }
            var dict = pManager.getParameters();
            createDrags(dict);
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
//var new_Store = new GraphStore("URL");

//gets the data type associated with the predicate
function getDatatype(oneResult, callback) {
    /*
    theStore.Store.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                   PREFIX : <http://example.org/>\
                   PREFIX schemaorg: <http://schema.org/>\
                   SELECT DISTINCT ?p ?o FROM NAMED :rdfGraph\
                                  { GRAPH ?g {\
                                               ?s ?p ?o.\
                                                FILTER (\
                                                ?p != rdf:type).\
                                             }}',
        function (err, results) {
            console.log("Results: Jill's");
            console.log(results);
            for (var i = 0; i < results.length; i++) {
            */
                //var result = results[i]['o'];   var dataType = getDatatype(results_type[i]);
                var type = 'unknown';

                if (oneResult['o']['token'] == 'literal'){
                    if (oneResult['o']['type'] && oneResult['o']['type'].match('^http://www.w3.org/2001/XMLSchema#')){
                        var prefix = 'http://www.w3.org/2001/XMLSchema#';
                        type = oneResult['o']['type'].substr(prefix.length);
                        //console.log(type);

                    }
                    else if (parseInt(oneResult['value'])){
                        type = 'integer';
                    }
                    else if (parseFloat(oneResult['value'])){
                        type = 'float';

                    }else{

                        if(oneResult.p.value.localeCompare("http://schema.org/orderNumber") ==0)
                            console.log("I am checking " + oneResult.o.value +" and I have type:" + type);

                        //in here if it is a string literal
                        //could possibly be other things but I don't knoooow how you'd catch a string
                        type = 'string';
                    }
                }
                callback(type);
            }

            //pManager.simplifyTypes(); //turn into a callback function!

        //});

//}


