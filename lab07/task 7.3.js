//width and height of svg
var w = 300;
var h = 300;

//set up the data
var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
    ];

//set up the stack
var stacks = d3.stack() //generate stacks
                .keys(["apples", "oranges", "grapes"]); //specify the categories of interest

//set up the svg canvas
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//color scheme to attach to the arcs group
var color = d3.scaleOrdinal(d3.schemeCategory10); //d3 native color scheme (no. 10)
//set up the arcs
var groups = svg.selectAll("g")
                .data(stacks(dataset))
                .enter()
                .append("g")
                .style("fill", function(d, i) {
                    return color(i);
                });

//create an ordinal scaleable x-axis based on the range of the data set
var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length)) //from 0 to 7
                .range([0,w])  //from 0 to width of the svg
                .paddingInner(0.05); //adding padding for spacing and make sure every bands are inside the svg

//create an ordinal scaleable y-axis based on the item values in the data set
var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) {
                    return d.apples + d.oranges + d.grapes;
                })])
                .range([h, 0]);

//draw the rectangles
var rects = groups.selectAll("rect")
                    .data(function(d) {
                        return d;
                    })
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return xScale(i);
                    })
                    .attr("y", function(d, i) {
                        return yScale(d[1]);
                    })
                    .attr("height", function(d) {
                        return yScale(d[0]) - yScale(d[1]);
                    })
                    .attr("width", xScale.bandwidth());
