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


//var dray2 = GlobalDataArray.getArray();

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
/*var testDataBC = [
    {letter: "A", frequency: 0.034},
    {letter: "B", frequency: 0.55},
    {letter: "C", frequency: 0.321},
    {letter: "D", frequency: 0.567},
    {letter: "E", frequency: 0.998},
    {letter: "F", frequency: 0.0222},
    {letter: "G", frequency: 0.445},
    {letter: "H", frequency: 0.765},
    {letter: "I", frequency: 0.533},
    {letter: "J", frequency: 0.034},
    {letter: "K", frequency: 0.034},
    {letter: "L", frequency: 0.533}
];
*/


/**
 * creates the aggregate and sets up graph-making
 */
BarChart.prototype.caller2 = function(){
    dray = Aggregate("Y");
    console.log(dray);
    BarChart.prototype.horizontalBC(dray);

}

/**
 * creates the aggregate and sets up graph-making
 */
BarChart.prototype.caller1 = function(){
    dray = Aggregate("X");
    console.log(dray);
    BarChart.prototype.verticalBC(dray);

}


/**
 * prepare the settings for the vertical barchart
 * clear the old graph if there is one in the way
 */
BarChart.prototype.verticalBC = function(dray){
   // if(dray.length ==0){
   //     alert("Please select data parameters");
   //}else {

        if (($('#graph').find("svg").length) == 0) {
            //no graph currently exists, build this one
           // BarChart.prototype.setgraphType(0);
            BarChart.prototype.setHorizontal(false);
            //something about stacked
            BarChart.prototype.makeGraph(dray);
        } else {
            //otherwise, remove the old graph and build this one
            d3.select("svg").remove();
           // BarChart.prototype.setgraphType(0);
            BarChart.prototype.setHorizontal(false);
            //something about stacked
            BarChart.prototype.makeGraph(dray);

        }
    //}
}

/**
 * prepare the settings for the horizontal barchart
 * clear the old graph if there is one in the way
 */
BarChart.prototype.horizontalBC = function(dray){

   // if(dray.length ==0){
   //     alert("Please select data parameters");
   // }else {
        var graphLocation = document.getElementById('graph');
console.log(graphLocation);
        if (($('#graph').find("svg").length) == 0) {
            //no graph currently exists, build this one
          //  BarChart.prototype.setgraphType(1);
            BarChart.prototype.setHorizontal(true);
            //something about stacked
            BarChart.prototype.makeGraph(dray);
        } else {
            //otherwise, remove the old graph and build this one
            d3.select("svg").remove();
           // BarChart.prototype.setgraphType(1);
            BarChart.prototype.setHorizontal(true);
            //something about stacked
            BarChart.prototype.makeGraph(dray);

        }
    //}
}


/**
 * get the value of isHorizontal
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
 BarChart.prototype.makeGraph = function(dray) {

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

    // var parseDate = d3.timeParse("%Y-%m-%d"); //dates must be in the format of yyyy-mm-dd

     /*
      Changes to the D3 example to accept array data instead of .tsv:
      http://stackoverflow.com/a/21668952
      stackoverflow user Teodor http://stackoverflow.com/users/840453/teodor
      */

     var svg = d3.select("svg"),
         margin = {top: 20, right: 20, bottom: 50, left: 80},
         width = +svg.attr("width") - margin.left - margin.right,
         height = +svg.attr("height") - margin.top - margin.bottom;



     var g = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



     if (this.isHorizontal) {
         //makes a horizontal bar chart
         /*
         The Horizontal bar chart code is from (http://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998) under the MIT licence,
         which is compatible with the GPL v3 License.

          Copyright (c) 2016 Nicole Lovas, Jillian Lovas, Margaret Guo, Landon Thys, Michael Xi, and Diego Serrano Suarez.

          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
           files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
            copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
             and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

          The above copyright notice and this permission notice shall be included in all copies or substantial portions of
          the Software.

          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
           IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
           WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
           OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          */


      /*   var svg = d3.select("svg"),
             margin = {top: 20, right: 20, bottom: 30, left: 80},
             width = +svg.attr("width") - margin.left - margin.right,
             height = +svg.attr("height") - margin.top - margin.bottom; */

       //  var tooltip = d3.select("body").append("div").attr("class", "toolTip");

         var y;

         //check to see if the data is a date value and use scaletime if it is
         /*if(dray[0].typeX == "date"){
             x = d3.scaleTime().range([0, width]);
             x.domain(d3.extent(dray, function(d) { return new Date(d.dataX); }));
         } else{
             x = d3.scaleLinear().range([0, width]);
             x.domain([0, d3.max(dray, function(d) { return d.dataX; })]);
         }*/

         if(dray[0].typeY == "date"){
             y = d3.scaleBand().range([0, height]);
             //y.domain([0, d3.max(dray, function(d) { return d.dataY; })]); //starts at 0, ends at max + a value
             y.domain(dray.map(function(d) { return d.dataY; }));
         /*
           problem with date issue #10
             y = d3.scaleTime().range([0,height]);
             y.domain(d3.extent(dray, function(d) { return new Date(d.dataY); }));
         */

         }else{
             y = d3.scaleBand().range([0, height]);
             //y.domain([0, d3.max(dray, function(d) { return d.dataY; })]); //starts at 0, ends at max + a value
             y.domain(dray.map(function(d) { return d.dataY; }));
         }

         var x = d3.scaleLinear().range([0, width]);
         //var y = d3.scaleBand().range([0, height]);

             x.domain([0, d3.max(dray, function(d) { return d.dataX; })]);
           //  y.domain(dray.map(function(d) { return d.dataY; }));



             g.append("g")
                 .attr("class", "x axis")
                 .attr("transform", "translate(0," + height + ")")
                 .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return d; }).tickSizeInner([-height]));

             g.append("g")
                 .attr("class", "y axis")
                 .call(d3.axisLeft(y));

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


             g.selectAll(".bar")
                 .data(dray)
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", 0)
                 .attr("height", y.bandwidth())
                 .attr("y", function(d) { return y(d.dataY); })
                 .attr("width", function(d) { return x(d.dataX); });

   /*   var   barOuterPad = .2
       var  barPad = .1

         y = d3.scaleBand()
             .domain(testDataBC.map(function(d){  d.letter}))
             .rangeRound([0, g.selectAll(".bar").offsetHeight], barPad, barOuterPad)

         svg.append('rect')
             .data(testDataBC)
             .enter().append('rect')
             .attr('y', function(d){ y(d.letter)})
             .attr('width', y.bandwidth())
*/
     } else { //vertical bar chart
         /*
Vertical bar chart code from (http://bl.ocks.org/mbostock/3885304) under the GPL v3 license.
 Copyright (C) 2016  Nicole Lovas, Jillian Lovas, Margaret Guo, Landon Thys, Michael Xi, and Diego Serrano Suarez.

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

         var x, y;

         //check to see if the data is a date value and use scaletime if it is
         if(dray[0].typeX == "date"){
             //handling date as a nominal for now
             x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
             //x.domain([0, d3.max(dray, function(d) { return d.dataX; })]); //starts at 0, ends at max + a value
             x.domain(dray.map(function (d) { return d.dataX; }));

             /*

             problem with date in vertical bar graph noted in issue #10

             var parseDate = d3.timeParse("%y-%m-%d");
             x = d3.scaleTime().range([0, width]);
             x.domain(d3.extent(dray, function(d) { return parseDate(d.dataX); }));
            */
         } else{
             x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
             //x.domain([0, d3.max(dray, function(d) { return d.dataX; })]); //starts at 0, ends at max + a value
             x.domain(dray.map(function (d) { return d.dataX; }));
         }

        /* if(dray[0].typeY == "date"){
             y = d3.scaleTime().range([height + 50, 0]);
             y.domain(d3.extent(dray, function(d) { return new Date(d.dataY); }));
         }else{
             y = d3.scaleLinear().range([height + 50, 0]);
             y.domain([0, d3.max(dray, function(d) { return d.dataY; })]); //starts at 0, ends at max + a value
             console.log("y domain:" + y.domain());
         } */

         //x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
              y = d3.scaleLinear().rangeRound([height, 0]);

         /*x.domain(testDataBC.map(function (d) {
             return d.letter;
         })); */
         y.domain([0, d3.max(dray, function (d) {
             return d.dataY;
         })]);

         g.append("g")
             .attr("class", "axis axis--x")
             .attr("transform", "translate(0," + height + ")")
             .call(d3.axisBottom(x));

         g.append("g")
             .attr("class", "axis axis--y")
             .call(d3.axisLeft(y))//.ticks(10, "%"))
             .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", "0.71em")
             .attr("text-anchor", "end")
             .text(dray[0].nameX);

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

         console.log(width);

         //if it's date, use your own made bandwidth bc d3's hates date
         if(dray[0].typeX =="date") {
             g.selectAll(".bar")
                 .data(dray)
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", function (d) {
                     //if (dray[0].typeX == "date") { //changed
                     //    console.log("Me");
                     //    return 13; //x(13)
                     //} else {
                     //    console.log("No, me");
                         return x(d.dataX);
                         //return x( parseDate(d.dataX) ); part of date not working on x axis
                     //}
                 })
                 .attr("y", function (d) {
                     return y(d.dataY);
                 })
                 .attr("width", width/dray.length)
                 .attr("height", function (d) {
                     return height - y(d.dataY);
                 });
         }else{
            //use d3's bandwidth function bc it works
             g.selectAll(".bar")
                 .data(dray)
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", function (d) {
                     if(dray[0].typeX =="date"){ //changed
                         return x(13);
                     }else{
                         return x(d.dataX);
                     }
                 })
                 .attr("y", function (d) {
                     return y(d.dataY);
                 })
                 .attr("width", x.bandwidth())
                 .attr("height", function (d) {
                     return height - y(d.dataY);
                 });

         }



     }
 }

