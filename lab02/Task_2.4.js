function barChart() {
    var w = 500;
    var h = 100;

    var padding = 1;

    var lightness = 50;

    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function (d, i){
                    return i * (w / wombatSightings.length);
                })
        .attr("y", function(d){
            return h - d.wombats * 2;
        })
        .attr("width", w / wombatSightings.length - padding)
        .attr("height", function(d) {
            return d.wombats * 2;
        })
        .attr("fill", function(d){
            if (d.wombats > 15) {
                return "blue";
            } else {
                return "#0000b3";
            }
        });
}
function init() {
    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data;
    
        barChart(wombatSightings);
    });
}
window.onload = init;
