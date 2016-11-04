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
 * @description Listen for the click for the vertical bar chart
 *
 */
$(document).ready(function(){
    document.getElementById('verticalBarChart').addEventListener("click", BarChart.prototype.makeGraph);
})

/**
 * @description get the value of isHorizontal
 * @returns {boolean}
 */
BarChart.prototype.getHorizontal = function(){
    return this.isHorizontal;
}

/**
 * @description set the value of isHorizontal
 * @param hbool
 */
BarChart.prototype.setHorizontal = function(hbool){
    this.isHorizontal = hbool;
}

/**
 * @description get the value of stacked
 * @returns {boolean}
 */
BarChart.prototype.getStacked = function(){
    return this.stacked;
}

/**
 * @description set the value of stacked
 * @param sbool
 */
BarChart.prototype.setStacked = function(sbool){
    this.stacked = sbool;
}

/**
 * @description make a vertical bar chart from the data
 */
 BarChart.prototype.makeGraph = function(){
   var graphLocation =document.getElementById('graph');
   /*
   How to create an svg tag with javascript:
    http://stackoverflow.com/a/8215105
    stackoverflow user Techn4k: http://stackoverflow.com/users/685450/techn4k
    */

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

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(testData.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(testData, function(d) { return d.frequency; })]);

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
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.frequency); });

 }

