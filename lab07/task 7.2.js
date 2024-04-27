//width and height of svg
var w = 300;
var h = 300;

var dataset = [14, 5, 26, 23, 9, 6, 17, 33, 20]; //a variable that hold the dataset with around 5 values under 30

//add a new variable svg to create an svg screen with a width and a height
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//set up the pie chart parameters
var outerRadius = w / 2;
var innerRadius = 0;

//generate paths for the lines in the pie chart, including angles which can be used to draw segments of the pie chart
var pie = d3.pie() 

//generate paths for the data bound to the arcs group
var arc = d3.arc() 
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

//set up the arc function to read data from our pie function 
var arcs = svg.selectAll("g.arc")
                .data(pie(dataset))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//color scheme to attach to the arcs group
var color = d3.scaleOrdinal(d3.schemeCategory10); //d3 native color scheme (no. 10)

//draw the arcs
arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", function(d, i) {
        return arc(d, i);
    });

//add text labels
arcs.append("text")
    .text(function(d) {
        return d.value;
    }) //return arc's data value
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")"; //positioned the text labels of each arc to the respective segments
    });