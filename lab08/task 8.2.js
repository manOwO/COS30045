//width and height
var w = 500;
var h = 300;

//choosing the projection used for this graph
var projection = d3.geoMercator()
                //scale the map global to only Victoria
                .center([145, -36.5])
                .translate([w/2, h/2])
                .scale(2450);

//specify a projection
var path = d3.geoPath()
            .projection(projection);

//set the color range
var color = d3.scaleOrdinal()
                .range(["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]); //color scheme

//add svg canvas
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
            // .attr("fill", "grey");

//read in the unemployment data
d3.csv("VIC_LGA_unemployment.csv", function(d) {
    return {
        LGA: +d.LGA,
        unemployed: +d.unemployed
    };
}).then(function(data) {
    //read map data, link map data and employment data
    d3.json("LGA_VIC.json").then(function(json) {
        //merge the ag. data and GeoJSON
        //loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {
            //grab area's name
            var dataLGA = data[i].LGA;

            //grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].unemployed);

            //find the corresponding area inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonLGA = json.features[j].properties.LGA_name;

                if (dataLGA == jsonLGA) {
                    //copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    //stop looking through the JSON
                    break;
                }
            }
        }

        //bind JSON file to a path
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d, i) {
                return color(i); //add color encoding for unemployment data
            });
        
        //add Victorian towns and cities from the VIC_city.csv
        d3.csv("VIC_city.csv", function(d) {
            return {
                //add '+' to change string to other forms (remove the '')
                place: d.place,
                lat: +d.lat,
                lon: +d.lon
            };
        }).then(function(data) {
            //draw dots to indicate position of the cities
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                //use projection to map the longitude and latitude from real map to screen
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .style("fill", "black")
                .attr("r", 2)

            //write labels to indicate the cities
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                //use projection to map the longitude and latitude from real map to screen
                .attr("x", function(d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("y", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .style("fill", "black")
                //return the place's name
                .text(function(d) {return d.place;});
        });
    });
});