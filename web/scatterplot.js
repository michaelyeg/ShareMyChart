/*
 generates a scatterplot from provided data.
 Code from: http://bl.ocks.org/rajvansia/ce6903fad978d20773c41ee34bf6735c
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

/**
 * Create a new lineGraph that inherits from Graph
 * @constructor
 */
function Scatterplot() {
    Graph.call(this);
   // var isHorizontal;

}

Scatterplot.prototype = Object.create(Graph.prototype); //scatterplot inherits from Graph

Scatterplot.prototype.constructor = Scatterplot;

//hard-coded test data until we can access data from file
var testDataSP = [
  //  {date: "1990-10-01", money: 1000.15},
 //   {date: "1990-10-01", money: 324.56},
   // {date: "1990-11-23", money: 44.55},
  //  {date: "1990-11-27", money: 1000.15},
  //  {date: "1994-03-14", money: 156000.15},
  //  {date: "1994-18-08", money: 444.65},
  //  {date: "1995-07-05", money: 3.00},
  //  {date: "1995-10-31", money: 1.99},
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


/**
 * Listen for the click for the scatterplot graph
 *
 */
$(document).ready(function(){
    document.getElementById('scatterplot').addEventListener("click", Scatterplot.prototype.normalscatterplot);
})


/**
 * prepare the settings for the normal scatterplot
 * clear the old graph if there is one in the way
 */
Scatterplot.prototype.normalscatterplot = function(){


    if(($('#graph').find("svg").length) == 0){
        //no graph currently exists, build this one
        Scatterplot.prototype.setgraphType(8);
        Scatterplot.prototype.makeGraph();
    } else{
        //otherwise, remove the old graph and build this one
        d3.select("svg").remove();
        Scatterplot.prototype.setgraphType(8);
        Scatterplot.prototype.makeGraph();

    }


}

/**
 * creates a scatterplot based on the user's data
 */
Scatterplot.prototype.makeGraph = function() {


    /*
     !!!! remove this once we get real data from the files in here
     this simulates the data type for the test data
     */
    for(i=0;i<testDataSP.length;i++){
        testDataSP[i].date.type = "date";
    }

    var graphLocation = document.getElementById('graph');

    var margin = {top: 30, right: 20, bottom: 110, left: 80},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    var parseDate = d3.timeParse("%Y-%m-%d"); //dates must be in the formate of yyyy-mm-dd

    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height + 50, 0]);


    var xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y);


    var svg = d3.select(graphLocation).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr('style','border: 1px solid black');

  /*  svg.append("defs").append("clipPath") //clips dots if theyre on the edge
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height); */

    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




        x.domain(d3.extent(testDataSP, function(d) { return new Date(d.date); }));
        y.domain([0, d3.max(testDataSP, function(d) { return d.money; })+200000]); //starts at 0, ends at max + a value
     //y.domain(d3.extent(testDataSP, function(d) { return d.money; }));


// append scatter plot to main chart area
        var dots = focus.append("g");
     //   dots.attr("clip-path", "url(#clip)"); //this causes the dots to be clipped if theyre on the edge
        dots.selectAll("dot")
            .data(testDataSP)
            .enter().append("circle")
            .attr('class', 'dot')
            .attr("r",5)
            .style("opacity", .5)
            .attr("cx", function(d) { return x(new Date(d.date)); })
            .attr("cy", function(d) { return y(d.money); })

        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height + 60) + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        focus.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Money");

        svg.append("text")
            .attr("transform",
                "translate(" + ((width + margin.right + margin.left)/2) + " ," +
                ((height + 50) + margin.bottom - margin.top) +  ")")
            .style("text-anchor", "middle")
            .text("Date");





    };