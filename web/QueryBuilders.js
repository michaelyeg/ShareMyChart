/**
 * Created by landon on 17/11/16.
 */


/**
 * Builds a Query bases off the size of the GlobalLink array. It will fill in all the links between uri1 and uri2
 * @param {string} uri1 - used for the first uri in the query.
 * @param {string} uri2 - used for the second uri in the query.
 * @return {string} - completed query to be used in sparql that connects all the links
 */
function QueryBuilderData(uri1, uri2, link_path){

    var X = link_path[0].uri;
    var Y = link_path[link_path.length-1].uri;
    var string1 = 'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                   PREFIX : <http://example.org/>\
                   select ?subject1 ?data1 ?subject2 ?data2 FROM NAMED :rdfGraph {GRAPH ?g { \
                   ?subject1 <'+X+'> ?data1.\
                   ?subject1 <'+link_path[2].uri+'> ?link3.  ';
    for (var i = 3; i < link_path.length-1; i++){
        console.log("i%2: "+(i%2));
        if ((i%2)==1) {
            string1 += '?link' + (i-2) + ' <' + link_path[i-1].uri + '> ?link' + i + '.';
        }
    }

    string1 += '?link'+(i-1)+ ' <' +Y+ '> ?data2.\ ' +
               ' ?subject2 <'+Y+'> ?data2. }}';

    console.log(string1);
    return string1;
}

/**
 *Creates a query to get the links given two uris and a the distance to search for. checks only the exact distance not up to the distance
 * entered.
 * @param uri1
 * @param uri2
 * @return {string} returns the query as a string
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