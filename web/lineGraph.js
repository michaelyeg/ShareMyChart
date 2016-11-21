/*
     generates a line graph from provided data.
     Code from: https://bl.ocks.org/mbostock/3883245
     Copyright (C) 2016  Diego Serrano Suarez, Jillian Lovas, Nicole Lovas, Margaret Guo, Michael Xi, and Landon Thys.

     This program is free software: you can redistribute it and/or modify
     it under the terms of the GNU General Public License as published by
     the Free Software Foundation, either version 3 of the License, or
     (at your option) any later version.

     This program is distributed in the hope that it will be useful,
     but WITHOUT ANY WARRANTY; without even the implied warranty of
     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     GNU General Public License for more details.

     You should have received a copy of the GNU General Public License
     along with this program.  If not, see <http://www.gnu.org/licenses/>.
     */


var dray2 = GlobalDataArray.getArray();

    /**
     * Create a new lineGraph that inherits from Graph
     * @constructor
     */
    function lineGraph() {
        Graph.call(this);
        var isHorizontal;

    }

    lineGraph.prototype = Object.create(Graph.prototype); //linegraph inherits from Graph

    lineGraph.prototype.constructor = lineGraph;

//hard-coded test data until we can access data from file
 /*   var testDataLC = [
        {date: "1990-10-01", money: 1000.15},
        {date: "1990-10-01", money: 324.56},
        {date: "1990-11-23", money: 44.55},
        {date: "1990-11-27", money: 1000.15},
        {date: "1994-03-14", money: 156000.15},
        {date: "1994-18-08", money: 444.65},
        {date: "1995-07-05", money: 3.00},
        {date: "1995-10-31", money: 1.99},
        {date: "2000-11-18", money: 10604.15},
        {date: "2001-12-12", money: 1000234.42},
        {date: "2002-04-02", money: 10.01},
        {date: "2003-09-12", money: 223533.15},
        {date: "2004-12-20", money: 100.16},
        {date: "2005-05-14", money: 1000.15},
        {date: "2006-04-04", money: 1043500.15},
        {date: "2007-02-11", money: 5567000.15},
        {date: "2008-01-05", money: 0.00},
        {date: "2009-01-07", money: 5.99},
        {date: "2010-01-05", money: 69420.00}

    ];

    var testDataLC2 = [
        {meters: 14, engines: 1},
        {meters: 14, engines: 1},
        {meters: 16, engines: 1},
        {meters: 15, engines: 1},
        {meters: 20, engines: 2},
        {meters: 21, engines: 2},
        {meters: 14, engines: 2},
        {meters: 30, engines: 2},
        {meters: 19, engines: 2},
        {meters: 32, engines: 3},
        {meters: 26, engines: 3},
        {meters: 37, engines: 3},
        {meters: 28, engines: 3},
        {meters: 35, engines: 3},
        {meters: 43, engines: 4},
        {meters: 44, engines: 4},
        {meters: 59, engines: 5}
    ] */

    /**
     * Listen for the click for the vertical line graph
     *
     */
    $(document).ready(function(){
        document.getElementById('vlinegraph').addEventListener("click", lineGraph.prototype.caller);
    })

/**
 * creates the aggregate and sets up graph-making
 */
lineGraph.prototype.caller = function(){
    dray = Aggregate("X");
    console.log(dray);
    lineGraph.prototype.horizontalLG(dray);

}


/**
 * get the value of isHorizontal
 * @returns {boolean}
 */
lineGraph.prototype.getHorizontal = function(){
    return this.isHorizontal;
}

/**
 * set the value of isHorizontal
 * @param hbool
 */
lineGraph.prototype.setHorizontal = function(hbool){
    this.isHorizontal = hbool;
}

/**
 * prepare the settings for the vertical linegraph
 * clear the old graph if there is one in the way
 */
lineGraph.prototype.horizontalLG = function(dray){
    if(dray.length ==0){
        alert("Please select data parameters");
    }else {

        if (($('#graph').find("svg").length) == 0) {
            //no graph currently exists, build this one
            lineGraph.prototype.setgraphType(4);
            lineGraph.prototype.setHorizontal(false);
            lineGraph.prototype.makeGraph(dray);
        } else {
            //otherwise, remove the old graph and build this one
            d3.select("svg").remove();
            lineGraph.prototype.setgraphType(4);
            lineGraph.prototype.setHorizontal(false);
            lineGraph.prototype.makeGraph(dray);

        }
    }

}




    /**
     * make a vertical line graph from the data
     */
    lineGraph.prototype.makeGraph = function(dray) {




    var graphLocation = document.getElementById('graph');
    //put some stuff in here about looking at horizontal and stacked
    /*
     How to create an svg tag with javascript:
     http://stackoverflow.com/a/8215105
     stackoverflow user Techn4k: http://stackoverflow.com/users/685450/techn4k
     */
//create the box that contains the graph
    var svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgg.setAttribute('style', 'border: 1px solid black');
    svgg.setAttribute('width', '960');
    svgg.setAttribute('height', '500');
    svgg.setAttribute('overflow', 'auto');
    svgg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    $(graphLocation).append($(svgg));

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 80},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   //var parseTime = d3.timeParse("%Y-%m-%d"); //dates must be in the formate of yyyy-mm-dd

 /*   function getDate(d) {
        d.date = parseTime(d.date);
        d.money = +d.money;
        return d;
    }

    x.domain(d3.extent(data, function (d) {
        return parseDate(d.date);
    })); */
//http://stackoverflow.com/questions/39069892/d3-multi-line-chart-error-path-attribute-d-expected-number-mnan-nanlnan


        var x, y;

        //check to see if the data is a date value and use scaletime if it is
        if(dray[0].typeX == "date"){
            x = d3.scaleTime().rangeRound([0, width]);
            x.domain(d3.extent(dray, function(d) { return new Date(d.dataX); }));
        } else{
            x = d3.scaleLinear().rangeRound([0, width]);
            x.domain([0, d3.max(dray, function(d) { return d.dataX; })]); //starts at 0, ends at max + a value
        }

        if(dray[0].typeY == "date"){
            y = d3.scaleTime().rangeRound([height -20, 0]);
            y.domain(d3.extent(dray, function(d) { return new Date(d.dataY); }));
        }else{
            y = d3.scaleLinear().range([height -20, 0]);
            y.domain(d3.extent(dray, function(d) { return d.dataY; }));
        }


   /* var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([(height -20), 0]);*/




        if( (dray[0].typeX == "date") && (dray[0].typeY == "date") ){
            //if both are dates
            var line = d3.line()
                .x(function(d) { return x(new Date(d.dataX)); })
                .y(function(d) { return y(new Date(d.dataY)); });

        } else   if( (dray[0].typeX == "date") && (dray[0].typeY != "date") ){
            //if x is a date only
            var line = d3.line()
                .x(function(d) { return x(new Date(d.dataX)); })
                .y(function(d) { return y(d.dataY); });

        }else   if( (dray[0].typeX != "date") && (dray[0].typeY == "date") ){
            //if y is a date only
            var line = d3.line()
                .x(function(d) { return x(d.dataX); })
                .y(function(d) { return y(new Date(d.dataY)); });


        } else   if( (dray[0].typeX != "date") && (dray[0].typeY != "date") ){
            //if neither are dates
            var line = d3.line()
                .x(function(d) { return x(d.dataX); })
                .y(function(d) { return y(d.dataY); });

        }



  /*  d3.tsv("data.tsv", function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
        return d;
    }, function(error, data) {
        if (error) throw error; */

      /*  x.domain(d3.extent(testDataLC, function(d) { return new Date(d.date); }));
        y.domain(d3.extent(testDataLC, function(d) { return d.money; })); */

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height-20) + ")") //want 410
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
           /* .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Money ($)");*/

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(dray[0].nameY);

        g.append("text")
            .attr("transform",
                "translate(" + ((width + margin.right + margin.left)/2) + " ," +
                ((height +10) + margin.bottom - margin.top) +  ")")
            .style("text-anchor", "middle")
            .text(dray[0].nameX);

        g.append("path")
            .datum(dray)
            .attr("class", "line")
            .attr("d", line);

}