/**
 * Created by landon on 17/11/16.
 */


/**
 * Builds a Query bases off the size of the GlobalLink array. It will fill in all the links between uri1 and uri2
 * @param {string} uri1 - used for the first uri in the query.
 * @param {string} uri2 - used for the second uri in the query.
 * @return {string} - completed query to be used in sparql that connects all the links
 */
//TODO Make it take in a link_path and use that instead of the global list. link ath should be an array with the path of the
//TODO Test with more links then one
function QueryBuilderData(uri1, uri2, link_path){
    var string1 = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   select ?subject ?data1 ?data2 FROM NAMED :rdfGraph {GRAPH ?g { \
                   ?subject <'+uri1+'> ?data1.\
                   ?subject <'+GlobalLink[0]+'> ?link1.  ';
    for (var i = 1; i < GlobalLink.length; i++){
        string1 += '?link'+i+' <'+GlobalLink[i]+'> ?link'+(i+1)+'.'
    }

    string1 += '?link'+(GlobalLink.length)+ ' <' +uri2+ '> ?data2. }}';

    return string1;
}

/**
 *Creates a query to get the links given two uris and a the distance to search for. checks only the exact distance not up to the distance
 * entered.
 * @param uri1
 * @param uri2
 * @return {string} returns the query as a string
 */
/*
 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
 PREFIX : <http://example.org/>\
 SELECT ?link1 FROM NAMED :rdfGraph { GRAPH ?g { \
 ?s ?link1 ?y; \
 rdf:type <'+uri1+'>.\
 ?y rdf:type <'+uri2+'>.  } }'
 */
function QueryBuilderLink(uri1, uri2, link_distance){
    var query = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                PREFIX : <http://example.org/>\
                SELECT DISTINCT ?link1 ';
    //add the select statment based on the link_distance:
    for (var i = 1; i < link_distance; i++ ){
        query += '?MidType'+i+' ';
        query += '?link'+(i+1)+' ';
    }
    query += 'FROM NAMED :rdfGraph { GRAPH ?g { ';

    //Add triple for each list length
    for (var x = 1; x <= link_distance; x++){
        if ( x >= link_distance){
            query += '?x'+x+' ?link'+x+' ?y .';
            query += '?y rdf:type <'+uri2+'>. '
        }else{
            query += '?x'+x+' ?link'+x+' ?x'+(x+1)+'. ';

        }
        if (x == 1){
            query += '?x1 rdf:type <'+uri1+'>. ' ;
        }else{
            query += '?x'+x+' rdf:type ?MidType'+(x-1)+'. ';

        }
    }
    query += '} }';

    return query;

}