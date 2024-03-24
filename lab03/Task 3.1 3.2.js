function init() {
    // width and height of svg
    var w = 500;
    var h = 300;
    
    //padding to shorten the available screen space
    var padding = 30;

    //dataset sample
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
    ];

    //Worked example from Murray

    //scale given data points using hard coded data set to any given SVG canvas so that all of the data always appears on the canvas at x axis
    var xScale = d3.scaleLinear()
                    .domain([d3.min(dataset, function(d) {
                        return d[0];
                    }), d3.max(dataset, function(d) {
                        return d[0];
                    })]) //input's x ranges from smallest to greatest
                    .range([padding, w - padding]); //chart's x axis graphed length from padding to w - padding

    //scale given data points using hard coded data set to any given SVG canvas so that all of the data always appears on the canvas at y axis
    var yScale = d3.scaleLinear()
                    .domain([d3.min(dataset, function(d) {
                        return d[1];
                    }), d3.max(dataset, function(d) {
                        return d[1];
                    })]) //input's y ranges from smallest to greatest
                    .range([padding, h - padding]); //chart's y axis graphed length from padding to h - padding

    //create x Axis scaled xScale having 5 ticks
    var xAxis = d3.axisBottom()
                .ticks(5)
                .scale(xScale);

    //create y Axis scaled yScale having 5 ticks
    var yAxis = d3.axisRight()
                .ticks(5)
                .scale(yScale);

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
        .attr("r", 2);

    //generate labels using the data in the dataset
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d){
            return d[0] + ", " + d[1]; //print 1st and 2nd value in the array
        })
        .attr("x", function(d){ //add cordinates as attributes for display
            return xScale(d[0]); //x position of the label is at the data point's x position and 's scaled based on the xScale function mentioned
        })
        .attr("y", function(d){ //add cordinates as attributes for display
            return yScale(d[1]) - 5; //y position of the label is at the data point's y position scaled based on the yScale function mentioned
        })
        .attr("fill", "green")
        .style("font-size", 8)
        .style("font-family", "Arial, Helvetica, sans-serif");

    //draw x axis of the chart, transformed bottom h - padding
    svg.append("g")
        .attr("transform", "translate(0, " + (h - padding)  + ")")
        .call(xAxis);

    //draw y axis from the chart, transformed right a padding
    svg.append("g")
        .attr("transform", "translate(" + (padding) + ", 0)")
        .call(yAxis);
}

window.onload = init;
