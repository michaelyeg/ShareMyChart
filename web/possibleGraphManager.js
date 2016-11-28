/**
 * Created by Jill - Offline on 2016-11-19.
 *
 */
//var scatterplot = new Scatterplot();
//var barchart = new BarChart();
//var linegraph = new lineGraph();

var PossibleGraphManager = function(){
    $.pG = [];
};

PossibleGraphManager.prototype.addToManager = function(item){
    $.pG.push(item);
};

PossibleGraphManager.prototype.clearManager = function(){
    $.pG = [];
};

PossibleGraphManager.prototype.getAll = function(){
    return $.pG;
};

PossibleGraphManager.prototype.getLength = function(){
  return $.pG.length;
};

PossibleGraphManager.prototype.prioritize = function(pam1, pam2){
    if($.pG.length ==1){
        //just let it be, only one choice
        ;
    }else{
        //check their data types in regards to the graph choices, decide that way?
        var graphPoints = [
            {name: "vbar", points: 0, number: 0},
            {name: "hbar", points: 0, number: 1},
            {name: "vline", points: 0, number: 2},
            {name: "scatterA", points: 0, number: 3},
            {name: "scatterB", points: 0, number: 4}
        ];


        //first check the absolutes, then check the not so absolutes
        //these ones make the best versions of their graphs, 5 points to prioritize them
        if(pam1.type =="nominal" && pam1.type =="numeric"){
            //vbar
            graphPoints[0].points += 5;
        }

        if(pam1.type =="numeric" && pam2.type =="nominal"){
            //hbar
            graphPoints[1].points +=5;
        }

        if(pam1.type == "date" && pam2.type == "numeric"){
            //vline
            graphPoints[2].points += 5;
        }

        if(pam1.type == "numeric" && pam2.type == "numeric"){
            //scatterA
            graphPoints[3].points += 5;
        }

        if(pam1.type == "nominal" && pam2.type == "nominal"){
            //scatterB
            graphPoints[4].points += 5;
        }

        //next are the not-so-awesome representations of the data, possible, but not the best ones
        //gets 1 point each, and more than one graph can be of each

        if(pam1.type == "date" && pam2.type == "date"){
            //vline and scatterA
            graphPoints[2].points +=1;
            graphPoints[3].points +=1;
        }

        if(pam1.type == "date" && pam2.type == "nominal"){
            //hbar
            graphPoints[1].points +=1;
        }

        if(pam1.type == "numeric" && pam2.type == "date"){
            //vline and scatterA
            graphPoints[2].points += 1;
            graphPoints[3].points +=1;
        }

        //nominal/date is not possible with the current graphs we have

        console.log("After: vBar: " + graphPoints[0].points + " hBar: " + graphPoints[1].points + " vline: " +
            graphPoints[2].points + "scatterA: " + graphPoints[3].points + " scatterB: " + graphPoints[4].points);

        //now apply the priority to the possible graphs
        //just should swap the ordering around a bit for the ui part
        //some help from here: http://stackoverflow.com/questions/16095301/finding-highest-values-amongst-javascript-variables

        var temp = [];

        for(var i =0; i < $.pG.length; i++){
            //find the current max, move it's graph to the front of pG
            var highest = 0;
            var result = 0;
            for(var k =0; k < graphPoints.length; k++){
                if(graphPoints[k].points > highest){
                    highest = graphPoints[k].points;
                    result = graphPoints[k];
                }
            }//end of inner loop

            console.log("h: "+ highest + " result: " + result.name);

            if( temp.indexOf(result.number) ==-1 ){
                temp.push(result.number);
            }



        }//end of outer loop

        console.log("temp");
        console.log(temp);

        //merge with pG - pG ignores the values already inserted
        $.pG = arrayUnique(temp.concat($.pG));
        console.log($.pG);

    }//end of else

//function from StackOverFlow user LiraNuna, edited by David Furlong
//http://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
    function arrayUnique(array) {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }


   /* dray = Aggregate("X"); //aggregate on x axis for vertical BC
console.log(dray);
    barchart.verticalBC(dray); //currently wont work with the button!! :C
*/
 /*  dray = Aggregate("Y");
    console.log(dray);
    barchart.horizontalBC(dray);
*/

 /*dray = Aggregate("X");
    console.log(dray);
    linegraph.horizontalLG(dray); */

    //scatterplot.normalscatterplot(GlobalDataArray.getArray());

}