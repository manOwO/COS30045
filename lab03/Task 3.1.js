 // width and height of svg
 var w = 500;
 var h = 100;
 
 //padding to shorten the available screen space
 var padding = 30;

 //third array: 1st 2 values are the point's position x and y, last value is for the size of each data points
 var dataset = [
     [5, 20],
     [480, 90],
     [250, 50],
     [100, 33],
     [330, 95],
     [410, 12],
     [475, 44],
     [25, 67],
     [85, 21],
     [220, 88],
     [510, 150]
 ];

 //Worked example from Murray
 var xScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) {
                     return d[0];
                 }), d3.max(dataset, function(d) {
                     return d[0];
                 })])
                 .range([padding, w - padding]);

 var yScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) {
                     return d[1];
                 }), d3.max(dataset, function(d) {
                     return d[1];
                 })])
                 .range([padding, h - padding]);

 //add a new variable svg to create an svg screen with a width and a height
 var svg = d3.select("#chart")
             .append("svg")
             .attr("width", w)
             .attr("height", h);

 //worked example from Murray: draw data points as circles 
 svg.selectAll("circle")
     .data(dataset) //for each arrays in the dataset
     .enter()
     .append("circle")
     .attr("fill", "slategrey") //color: slategrey
     .attr("cx", function (d, i){
                 return xScale(d[0]); //refer to the 1st value in each arrays in dataset
             })
     .attr("cy", function(d){
         return yScale(d[1]); //refer to the 2nd value in each arrays in dataset
     })
     .attr("r", 5);

 //generate labels using the data in the dataset
 svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function (d){
         return d[0] + ", " + d[1]; //print 1st and 2nd value in the array
     })
     .attr("x", function(d){ //add cordinates as attributes for display
         return xScale(d[0]); //x position of the label is at the data point's x position
     })
     .attr("y", function(d){ //add cordinates as attributes for display
         return yScale(d[1]) - 5; //y position of the label is at the data point's y position
     })
     .attr("fill", "green")
     .style("font-size", 8)
     .style("font-family", "Arial, Helvetica, sans-serif");
