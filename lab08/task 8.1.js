//width and height
var w = 500;
var h = 300;

//choosing the projection used for this graph
var projection = d3.geoMercator()
                //scale the map from global to only Victoria
                .center([145, -36.5])
                .translate([w/2, h/2])
                .scale(2450);

//specify a projection
var path = d3.geoPath()
            .projection(projection);

//add svg canvas
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

//read in the GeoJSON file and bind it to a path
d3.json("LGA_VIC.json").then(function(json) {
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);
});

