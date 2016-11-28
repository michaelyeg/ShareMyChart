/**
 * Created by landon on 30/10/16.
 */
//maybe make this a class with private globals and getters
//Globals for store and parameter array
//Call parameter manager

var TypeArray = [];
var GlobalStore;

var pManager = new ParameterManager();



/**
 *Creates a rdfstore for a given URL. The store ca then be queried.
 * @param URL
 * @constructor
 */
var GraphStore = function(URL){ //**TODO - make this into an actual function, or a class

    //clear stuff if there's any upon switching to another file
    if(typeof GlobalStore !== 'undefined') {
        console.log(GlobalStore);
        GlobalStore.clear('http://example.org/rdfGraph', function (err1) {

            if(!err1) {
                TypeArray.splice(0,TypeArray.length);
                pManager.clearManager();
                console.log("Cleared the graph. Here's TypeArray.");
                console.log(TypeArray);
                console.log(GlobalStore);

                clearDrags(URL, reload_function);
                clearGraph();
                GlobalDataArray.clear();


            }
        });
    }else {

        this.Store;
        URLl = "http://localhost:8080/data/superstore-small.ttl";
        //need to modify to make dynamic URL entry as a parameter of the function
        //just not sure how much of the string will need to be hardcoded and what path will be

        rdfstore.create(function (err, store) {
            console.log("GET THE URL: " + URL); //LOAD <'+URL+'>
            store.execute('LOAD <' + URL + '> INTO GRAPH <http://example.org/rdfGraph>', function (err) {

                if (!err) {
                    // Store created
                    //potential async issue
                    this.Store = store;
                    GlobalStore = store;
                    console.log("Store Created");
                    var Confirm = confirm("Data will be loaded");
                    if (Confirm) {
                        //console.log(this);
                        GetParameterQuery(this.Store);
                    }
                }
            });
        });


    }//end of else
};


function reload_function(URL){
    GlobalStore.execute('LOAD <' + URL + '> INTO GRAPH <http://example.org/rdfGraph>', function (err) {

        if (!err) {
            // Store created
            //potential async issue
            this.Store = GlobalStore;
            //GlobalStore = store;

            var Confirm = confirm("Data will be loaded");
            if (Confirm) {
                //console.log(this);
                GetParameterQuery(this.Store);
            }
        }
    });
}

/**
 * Takes an Rdf store object and gets all the type from the graph
 * @param {GraphStore} graph_store
 */
function GetParameterQuery(graph_store) {

    console.log("Query executed");

    graph_store.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                        PREFIX : <http://example.org/>\
                        select ?s ?p ?o ?t FROM NAMED :rdfGraph { GRAPH ?g { ?s ?p ?o; rdf:type ?t. FILTER(?p != rdf:type). } }',
        function(err, results_type) { //edited above from: select distinct ?type FROM NAMED :rdfGraph { GRAPH ?g { ?s rdf:type ?type } }',
            //Get the type for display as a draggable parameter
        //    console.log("Results type:");
        //    console.log(results_type);

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
        //    console.log("TypeArray: ");
         //   console.log(TypeArray);

            //get valid predicates, record their values, record final datatype
                            for(var i=0; i < results_type.length; i++){
                                //figure out the datatype
                                getDatatype(results_type[i], gotDatatype);

            }
            var dict = pManager.getParameters();
            createDrags(dict);
        }
    );
}


/*
    Callback function for when it has checked the datatype from the parameter
    @param {string} d_type - the datatype found from getDatatype()
    @param {object} results_type - a single object found from the query
 */
function gotDatatype(d_type, results_type){
    var unknown=false;
    //if it's unknown, then it's a blank node. Ignore those ones (unknown stays false)
        if(!d_type.localeCompare("unknown")){
            unknown=true;
        }

        if(!unknown) {
            //check that the predicate isn't already in the manager
            if (!pManager.checkExists(results_type['p'].value, results_type['t'].value, d_type)) {
                var pam = new Parameter(results_type['p'].value, results_type['t'].value);

                pManager.addParameter(pam);
                pManager.addDatatype(pManager.getIndexForNC(results_type['p'].value, results_type['t'].value), d_type);
                pManager.simplifyType(pManager.getIndexForNC(results_type['p'].value, results_type['t'].value)); //used to be a callback for the above, but still didnt work

            }else{
                //parameter already exists, but still want to try assigning the datatype if it's nominal

                pManager.addDatatype(pManager.getIndexForNC(results_type['p'].value, results_type['t'].value), d_type);
                pManager.simplifyType(pManager.getIndexForNC(results_type['p'].value, results_type['t'].value));
            }
        }






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
                var type = 'unknown';
                if (oneResult['o']['token'] == 'literal'){

                    if (oneResult['o']['type'] && oneResult['o']['type'].match('^http://www.w3.org/2001/XMLSchema#')){
                        var prefix = 'http://www.w3.org/2001/XMLSchema#';
                        type = oneResult['o']['type'].substr(prefix.length);

                    }
                    else if (parseInt(oneResult['o']['value'])){ //this may have issue if the value parsed is negative!
                        type = 'integer';
                    }
                    else if (parseFloat(oneResult['o']['value'])){ //same as above, but leave for now
                        type = 'float';

                    }else{


                        //in here if it is a string literal
                        //could possibly be other things but I don't knoooow how you'd catch a string
                        type = 'string';
                    }
                }
                callback(type, oneResult);
            }



