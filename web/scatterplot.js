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

//var dray = GlobalDataArray.getArray();


/**
 * Create a new lineGraph that inherits from Graph
 * @constructor
 */
function Scatterplot() {
    Graph.call(this);
   // var isHorizontal;

}

Scatterplot.prototype = Object.create(Graph.prototype); //scatterplot inherits from Graph

Scatterplot.prototype = new Graph();
Scatterplot.prototype.constructor = Scatterplot;


/**
 * prepare the settings for the normal scatterplot
 * clear the old graph if there is one in the way
 */
Scatterplot.prototype.normalscatterplot = function(dray){
    //if(dray.length ==0){
    //    alert("Please select data parameters");
    //}else {


        if (($('#graph').find("svg").length) == 0) {
            //no graph currently exists, build this one
            //Scatterplot.prototype.setgraphType(8);
            Scatterplot.prototype.makeGraph(dray);
        } else {
            //otherwise, remove the old graph and build this one
            d3.select("svg").remove();
           // Scatterplot.prototype.setgraphType(8);
            Scatterplot.prototype.makeGraph(dray);

        }
   // }

}

/**
 * creates a scatterplot based on the user's data
 */
Scatterplot.prototype.makeGraph = function(dray) {


 //if this works it needs to be refactored by sprint 5
  /*  var tempArray = [];
    var t;
    for(i =0;i<DataArray.length;i++) {
        t = {
            dataX: DataArray[i].dataX,
            dataY: DataArray[i].dataY
        };
        tempArray.push(t);
    }*/
//console.log("temparraymax:");
   // console.log(tempArray);
  // console.log(d3.max(tempArray, function(d) { return d.dataY; }));
    var graphLocation = document.getElementById('graph');

    var margin = {top: 30, right: 20, bottom: 110, left: 80},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


   // var parseDate = d3.timeParse("%Y-%m-%d"); //dates must be in the format of yyyy-mm-dd

    //--------------------------------------------------------------------


    //Object.prototype.toString.call(date) === '[object Date]'
    //console.log("is x a date? "+(DataArray.typeX == "date"));

    var x, y;

    //check to see if the data is a date value and use scaletime if it is
    if(dray[0].typeX == "date"){
        //x = d3.scaleTime().range([0, width]);
        //x.domain(d3.extent(dray, function(d) { return new Date(d.dataX); }));

        x = d3.scaleBand().range([0, width]);
        //y.domain([0, d3.max(dray, function(d) { return d.dataY; })]); //starts at 0, ends at max + a value
        x.domain(dray.map(function(d) { return d.dataX; }));
    } else{
        //nominal:
        if(dray[0].typeX == "nominal") {
            x = d3.scaleLinear().range([0, width]);
            x.domain(dray.map(function(d) { return d.dataY; }));
            console.log("x domain:" + x.domain());
        } else{
            //other data types except date and nominal
            x = d3.scaleLinear().range([0, width]);
            x.domain([0, d3.max(dray, function (d) {
                return d.dataX;
            })]); //starts at 0, ends at max + a value
            console.log("x domain:" + x.domain());
        }
    }

    if(dray[0].typeY == "date"){
        //y = d3.scaleTime().range([height + 50, 0]);
        //y.domain(d3.extent(dray, function(d) { return new Date(d.dataY); }));
        y = d3.scaleBand().range([height + 50, 0]);
        //y.domain([0, d3.max(dray, function(d) { return d.dataY; })]); //starts at 0, ends at max + a value
        y.domain(dray.map(function(d) { return d.dataY; }));

    }else{

        if(dray[0].typeX == "nominal") {
            //if the type is nominal
            y = d3.scaleLinear().range([height + 50, 0]);
            y.domain(dray.map(function(d) { return d.dataY; }));
            console.log("y domain:" + y.domain());
        } else{
            //if the type is neither nominal nor date
        y = d3.scaleLinear().range([height + 50, 0]);
        y.domain([0, d3.max(dray, function(d) { return d.dataY; })]); //starts at 0, ends at max + a value
        console.log("y domain:" + y.domain());
        }
    }

  /*  var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height + 50, 0]); */


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



    /*
        x.domain(d3.extent(testDataSP, function(d) { return new Date(d.date); }));
        y.domain([0, d3.max(testDataSP, function(d) { return d.money; })+200000]); //starts at 0, ends at max + a value
*/

     //y.domain(d3.extent(testDataSP, function(d) { return d.money; }));


// append scatter plot dots to main chart area
        var dots = focus.append("g");
     //   dots.attr("clip-path", "url(#clip)"); //this causes the dots to be clipped if theyre on the edge

    if( (dray[0].typeX == "date") && (dray[0].typeY == "date") ){
        //if both are dates
        dots.selectAll("dot")
            .data(dray)
            .enter().append("circle")
            .attr('class', 'dot')
            .attr("r",5)
            .style("opacity", .5)
            .attr("cx", function(d) { return x(d.dataX); })
            .attr("cy", function(d) { return y(d.dataY); })

    } else   if( (dray[0].typeX == "date") && (dray[0].typeY != "date") ){
        //if x is a date only
        dots.selectAll("dot")
            .data(dray)
            .enter().append("circle")
            .attr('class', 'dot')
            .attr("r",5)
            .style("opacity", .5)
            .attr("cx", function(d) { return x(d.dataX); })
            .attr("cy", function(d) { return y(d.dataY); })

    }else   if( (dray[0].typeX != "date") && (dray[0].typeY == "date") ){
        //if y is a date only
        dots.selectAll("dot")
            .data(dray)
            .enter().append("circle")
            .attr('class', 'dot')
            .attr("r",5)
            .style("opacity", .5)
            .attr("cx", function(d) { return x(d.dataX); })
            .attr("cy", function(d) { return y(d.dataY); })

    } else   if( (dray[0].typeX != "date") && (dray[0].typeY != "date") ){
        //if neither are dates
        dots.selectAll("dot")
            .data(dray)
            .enter().append("circle")
            .attr('class', 'dot')
            .attr("r",5)
            .style("opacity", .5)
            .attr("cx", function(d) { return x(d.dataX); })
            .attr("cy", function(d) { return y(d.dataY); })

    }

//append the axis

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
            .text(dray[0].nameY);

        svg.append("text")
            .attr("transform",
                "translate(" + ((width + margin.right + margin.left)/2) + " ," +
                ((height + 50) + margin.bottom - margin.top) +  ")")
            .style("text-anchor", "middle")
            .text(dray[0].nameX);





    };