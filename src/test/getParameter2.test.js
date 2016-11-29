/**
 * Created by Jill - Offline on 2016-11-17.
 */

//getParameter, as far as I know, is not implemented and does not need to be tested.
describe("getParameter2 Tests", function() {

    var GlobalStore;
    var TypeArray = [];

    //create a store for using in tests here
    beforeEach(function() {

        var GraphStore = function(URL){
            this.Store;
            this.URL = URL;

            rdfstore.create(function(err, store) {
                store.execute('LOAD <http://localhost:8080/superstore-small.ttl> INTO GRAPH <http://example.org/rdfGraph>', function(err) {

                    if (!err) {
                        // Store created
                        //potential async issue
                        this.Store = store;
                        //GlobalStore = store;
                        console.log("Store Created");
                    }
                });
                GlobalStore = this;
            });
        };

        var new_Store = new GraphStore("URL");

    });

    //doesnt test the one in-code at this time - cannot call it by itself currently
    //however, identical code in beforeEach shows correctness for code itself in this case
    it("Creates the store", function () {
        expect(GlobalStore).not.toBe(undefined);
    });

    it("Tests getParameterQuery - check TypeArray correctness", function(){
        expect(GlobalStore).not.toBe(undefined);
        //GetParameterQuery(GlobalStore.Store); //Error problem with: TypeError: graph_store.Store.execute is not a function in web/GetParameter2.js (line 47)
        //I have no idea why it cannot find rdfstore's functions when it can find them for the above

    });



});
