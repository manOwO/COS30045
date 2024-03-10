function barChart() {
    //width and height of svg
    var w = 500;
    var h = 150;

    //add a new variable svg to create an svg screen with a width and a height
    var padding = 1;

    //add a new variable svg to create an svg screen at the position having id="chart" with a width and a height
    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    //graph the rectangular bars
    //d.wombats since "wombats" is the name of the column
    svg.selectAll("rect")
        .data(wombatSightings) //for each value in the dataset wombatSigthings
        .enter()
        .append("rect")
        .attr("x", function (d, i){
                    return i * (w / wombatSightings.length); //x position of each bars = index of value * width of each bar including padding for spacing out bars
                })
        .attr("y", function(d){
            return h - d.wombats * 4; //y position of the bar = height of the svg - height of the bar
        })
        .attr("width", w / wombatSightings.length - padding) //width of the svg/length of dataset (to divide equally the width of each bars) - padding for spaing out the bars
        .attr("height", function(d) {
            return d.wombats * 4; //multiple height by 4
        })
        .attr("fill", function(d){
            if (d.wombats > 15) {
                return "blue"; //if value in column "wombats" is greater than 15, the bar is blue
            } else {
                return "#0000b3"; //else, the bar is darker blue
            }
        });
}

function init() {
    //reading the data
    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data; //name the dataset
    
        barChart(wombatSightings); //put dataset into the function barChart()
    });
}
window.onload = init; //call function init() whenever the window is onload
