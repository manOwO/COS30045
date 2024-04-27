function lineChart() {
    //width and height of svg
    var w = 600;
    var h = 300;
    var padding = 20;

    //add a new variable svg to create an svg screen at the position having id="chart" with a width and a height
    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    //setting up the scales
    xScale = d3.scaleTime() //since xScale is a date
                    .domain([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; })
                    ]) //refer the domain to the correct column heading
                    .range([padding, w]);
    
    yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) { return d.number; })]) //refer the domain to the correct column heading
                    .range([h - padding, 0]);

    //create x Axis scaled xScale having 5 ticks
    var xAxis = d3.axisBottom()
        .ticks(5)
        .scale(xScale);

    //create y Axis scaled yScale having 5 ticks
    var yAxis = d3.axisRight()
        .ticks(5)
        .scale(yScale);

    //set up the line (not used)
    line = d3.line()
            .x(function(d) {return xScale(d.date);})
            .y(function(d) {return yScale(d.number);})

    //set up the area
    area = d3.area()
            .x(function(d) {return xScale(d.date);})
            //base line for area shape
            .y0(function() {return yScale.range() [0];})
            .y1(function(d) {return yScale(d.number);});

    //draw the line on the screen
    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "grey");

    //draw x axis of the chart, transformed bottom h - padding
    svg.append("g")
        .attr("transform", "translate(0, " + (h - padding)  + ")")
        .call(xAxis);

    //draw y axis from the chart, transformed right a padding
    svg.append("g")
        .attr("transform", "translate(" + (padding) + ", 0)")
        .call(yAxis);

    //add some annotations
    //the line showing half a million unemployed
        //the line
    svg.append("line")
        .attr("class", "line halfMilMark")
        //start of line
        .attr("x1", padding)
        .attr("y1", yScale(500000))
        //end of line
        .attr("x2", w)
        .attr("y2", yScale(500000));

        //the annotating text of the line
    svg.append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed")
        .attr("fill", "red");
}

//reading the data
d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month-1),
            number: +d.number
        };})
    .then(function(data) {
        //add code to load the data into the dataset
        dataset = data;
        lineChart(dataset); //put dataset into the function lineChart()

        console.table(dataset, ["date", "number"]); // check the data has gone ok
        
    });

