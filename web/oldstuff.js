//use this for testing:
Scatterplot.prototype.makeGraph2 = function() {

//console.log("wwwwwwwwwwwwwwwww");

    if(($('#graph').find("svg").length) == 0){
        //no graph currently exists, build this one
        Scatterplot.prototype.setgraphType(8);
        //Scatterplot.prototype.makeGraph(DataArray);
    } else{
        //otherwise, remove the old graph and build this one
        d3.select("svg").remove();
        Scatterplot.prototype.setgraphType(8);
        // Scatterplot.prototype.makeGraph(DataArray);

    }
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












/**
 * make a scatterplot graph from the data
 */
Scatterplot.prototype.makeGraph2 = function(){

    /*
     !!!!!!!!!! remove this and put it into a new function once we have different kinds of line graphs
     */
    if(($('#graph').find("svg").length) == 0){
        //no graph currently exists, build this one
        Scatterplot.prototype.setgraphType(8);
        //Scatterplot.prototype.makeGraph();
    } else{
        //otherwise, remove the old graph and build this one
        d3.select("svg").remove();
        Scatterplot.prototype.setgraphType(8);
        //Scatterplot.prototype.makeGraph();

    }

    /*
     !!!! remove this once we get real data from the files in here
     this simulates the data type for the test data
     */
    for(i=0;i<testDataSP.length;i++){
        testDataSP[i].date.type = "date";
    }

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
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;


    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    //var color = d3.scale.category10();

    /*var xAxis = d3.svg.axis()
     .scale(x)
     .orient("bottom");

     var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left"); */
    var xAxis = d3.axisBottom(x),
        //xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);


    var parseTime = d3.timeParse("%Y-%m-%d"); //dates must be in the formate of yyyy-mm-dd

    x.domain(d3.extent(data, function(d) { return d.date; })).nice();
    y.domain(d3.extent(data, function(d) { return d.money; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Sepal Width (cm)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sepal Length (cm)")

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.sepalWidth); })
        .attr("cy", function(d) { return y(d.sepalLength); })
        .style("fill", function(d) { return color(d.species); });


}








/**
 This file generates a bar graph from the user's data. Original code from (http://bl.ocks.org/mbostock/3885304)
 Bar Chart on D3's examples. Modifications include accepting an array instead of a .tsv file, and more in the future.

 Copyright (C) 2016 Diego Serrano Suarez, Jillian Lovas, Nicole Lovas, Margaret Guo, Michael Xi, and Landon Thys.

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

 Contact information:
 Diego Serrano Suarez: serranos@ualberta.ca
 Jillian Lovas: jlovas@ualberta.ca
 Nicole Lovas: nlovas@ualberta.ca
 Margaret Guo: yourui@ualberta.ca
 Micheal Xi: xi@ualberta.ca
 Landon Thys: lthys@ualberta.ca */

//var Graph = require("./Graph");

/**
 * Create a new BarChart that inherits from Graph
 * @constructor
 */
function BarChart() {
    Graph.call(this);
    var isHorizontal;
    var stacked;
}

BarChart.prototype = Object.create(Graph.prototype); //barchart inherits from Graph

BarChart.prototype.constructor = BarChart;

//hard-coded test data until we can access data from file
var testData = [
    {letter: "A", frequency: .034},
    {letter: "B", frequency: .55},
    {letter: "C", frequency: .321},
    {letter: "D", frequency: .567},
    {letter: "E", frequency: .998},
    {letter: "F", frequency: .0222},
    {letter: "G", frequency: .445},
    {letter: "H", frequency: .765},
    {letter: "I", frequency: .533},
    {letter: "J", frequency: .034},
    {letter: "K", frequency: .034},
    {letter: "L", frequency: .533}
];


/**
 * Listen for the click for the vertical bar chart
 *
 */
$(document).ready(function(){
    document.getElementById('verticalBarChart').addEventListener("click", BarChart.prototype.verticalBC);
})

/**
 * Listen for the click for the horizontal bar chart
 *
 */
$(document).ready(function(){
    document.getElementById('horizontalBarChart').addEventListener("click", BarChart.prototype.horizontalBC);
})

/**
 * prepare the settings for the vertical barchart
 */
BarChart.prototype.verticalBC = function(){
    BarChart.prototype.setHorizontal(false);
    //something about stacked
    BarChart.prototype.makeGraph();
}

/**
 * prepare the settings for the horizontal barchart
 */
BarChart.prototype.horizontalBC = function(){
    BarChart.prototype.setHorizontal(true);
    //something about stacked
    BarChart.prototype.makeGraph();
}


/**
 * get the value of isHorizontal
 * @returns {boolean}
 */
BarChart.prototype.getHorizontal = function(){
    return this.isHorizontal;
}

/**
 * set the value of isHorizontal
 * @param hbool
 */
BarChart.prototype.setHorizontal = function(hbool){
    this.isHorizontal = hbool;
}

/**
 * get the value of stacked
 * @returns {boolean}
 */
BarChart.prototype.getStacked = function(){
    return this.stacked;
}

/**
 * set the value of stacked
 * @param sbool
 */
BarChart.prototype.setStacked = function(sbool){
    this.stacked = sbool;
}

/**
 * make a vertical bar chart from the data
 */
BarChart.prototype.makeGraph = function() {

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


    /*
     Changes to the D3 example to accept array data instead of .tsv:
     http://stackoverflow.com/a/21668952
     stackoverflow user Teodor http://stackoverflow.com/users/840453/teodor
     */

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    //  var g = svg.append("g")
    //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    if (this.isHorizontal) {
        //makes a horizontal bar chart
        //-------------http://bl.ocks.org/kiranml1/6872226-----------------------------------

        y.domain([d3.max(testData, function (d) {
            return d.frequency;
        }), 0]); //so that the order is from lowest to highest
        x.domain(testData.map(function (d) {
            return d.letter;
        }));
        var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];

        var colorScale = d3.scaleQuantize()
            .domain([0,testData.length])
            .range(colors);

        var xscale = d3.scaleLinear()
            .domain([10,250]) //tick values basically
            .range([0,900]); //length of actual axis

        var yscale = d3.scaleLinear()
            .domain([0,testData.length])
            .range([0,480]);

        var xAxis = d3.axisBottom();
        xAxis
        //.orient('bottom')
            .scale(xscale)
        // .tickValues(tickVals); later

        var yAxis = d3.axisLeft();
        yAxis
        //.orient('left')
            .scale(yscale)
            .tickSize(2)
            //.tickFormat(function(d,i){ return categories[i]; })
            .tickValues(d3.range(17));

        //var g = svg.append("g")
        //    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var y_xis = svg.append('g')
            .attr("transform", "translate(50,0)")
            .attr('id','yaxis')
            .call(yAxis);

        var x_xis = svg.append('g')
            .attr("transform", "translate(50,480)")
            .attr('id','xaxis')
            .call(xAxis);

        var chart = svg.append('g')
            .attr("transform", "translate(150,0)")
            .attr('id','bar')
            .selectAll('rect')
            .data(testData)
            .enter()
            .append('rect')
            .attr('height',19)
            .attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
            .style('fill',function(d,i){ return colorScale(i); })
            .attr('width',function(d){ return 0; });

        /* old stuff
         g.append("g") //x axis
         .attr("class", "axis axis--x")
         .attr("transform", "translate(0," + height + ")")
         .scale(xscale)
         .call(d3.axisBottom(y).ticks(10, "%"));

         g.append("g") //y axis
         .attr("class", "axis axis--y")
         .call(d3.axisLeft(x))
         .append("text")
         .attr("transform", "rotate(-90)")
         .scale(yscale)
         //.attr("x", 6)
         // .attr("dx", "0.71em")
         .attr("text-anchor", "end")
         .text("Letter");

         g.selectAll(".bar")
         .data(testData)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("y", function (d) {
         return x(d.letter);

         })
         .attr("x", function (d) {
         return y(d.frequency);
         })
         .attr("height", x.bandwidth())
         .attr("width", function (d) {
         return height - y(d.frequency);
         });
         */
    } else {
        //makes a vertical bar chart

        x.domain(testData.map(function (d) {
            return d.letter;
        }));
        y.domain([0, d3.max(testData, function (d) {
            return d.frequency;
        })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "%"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

        g.selectAll(".bar")
            .data(testData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.letter);
            })
            .attr("y", function (d) {
                return y(d.frequency);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return height - y(d.frequency);
            });


    }
}

