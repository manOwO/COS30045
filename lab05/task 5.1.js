function init() {
            //width and height of svg
            var w = 500;
            var h = 150;
    
            var dataset = [14, 5, 26, 23, 9, 6, 17]; //a variable that hold the dataset with around 5 values under 30
            
            var lightness = 70; //the default lightness of the color of the rectangular bars
    
            //create an ordinal scaleable x-axis based on the range of the data set
            var xScale = d3.scaleBand()
                            .domain(d3.range(dataset.length)) //from 0 to 7
                            .range([0,w]) //from 0 to width of the svg
                            .paddingInner(0.05); //adding padding for spacing and make sure every bands are inside the svg

            //create an ordinal scaleable y-axis based on the item values in the data set
            var yScale = d3.scaleBand()
                            .domain(d3.range(0, d3.max(dataset))) //from 0 to the highest value in the dataset
                            .range([0,h]) //from 0 to height of the svg
                            .paddingInner(0.1); //adding padding for spacing and make sure every bands are inside the svg

            //add a new variable svg to create an svg screen with a width and a height
            var svg = d3.select("#chart")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
            
            //add an event listener
            d3.select("button")
                .on("click", function() {
                    var numValues = dataset.length; //number of values in the original dataset

                    var maxValue = 25; //the values of the updated dataset must be below 25

                    dataset = []; //clear out the dataset

                    //add random new items to the updated dataset
                    for (var i = 0; i < numValues; i++) {
                        var newNumber = Math.floor(Math.random()*maxValue);
                        dataset.push(newNumber);
                    }

                    //update the y related aspects of the new dataset as the x does not change (since the number of values in the dataset is still the same)
                    //draw the bands
                    svg.selectAll("rect")
                        .data(dataset) //for each value in the updated dataset
                        .attr("fill", function(d){
                            return "hsl(40, 100%, " + (lightness - d) +  "% )"; //color customisation: the orange's lightness is depended on the value in the dataset: the larger the value, the less light the orange
                        })
                        .attr("y", function(d) {
                            return h - yScale(d); //position the bar as it originately is at y = 0
                        })
                        .attr("height", function(d) {
                            return yScale(d); //height of the new values in the updated dataset
                        })

                    //update the y related aspects of the new dataset as the x does not change (since the number of values in the dataset is still the same)
                    //draw the labels of the bands
                    svg.selectAll("text")
                        .data(dataset) //for each value in the updated dataset
                        .text(function (d){
                            return d; //print the value in the dataset that each bar demonstrate
                        })
                        .attr("y", function(d){
                            return h - yScale(d); //print the text on top of the band
                        });
                });

            //graph rectangular bars
            svg.selectAll("rect")
                .data(dataset) //for each value in the dataset 
                .enter()
                .append("rect")
                .attr("fill", function(d){
                    return "hsl(40, 100%, " + (lightness - d) +  "% )"; //color customisation: the orange's lightness is depended on the value in the dataset: the larger the value, the less light the orange
                })
                .attr("x", function (d, i){
                            return xScale(i); //positionated the x position based on the scaling of xScale
                        })
                .attr("y", function(d){
                    return h - d * yScale.bandwidth(); //positionated the y position by taking: height of the svg - length of a height unit (by transforming from domain to range of y axis using yScale) * value of the item in the dataset
                })
                .attr("width", xScale.bandwidth()) //number of values in the dataset/number of item in database's width considering paddings (all via xScale)
                .attr("height", function(d) {
                    return d * yScale.bandwidth(); //height = value in the dataset * length of a height unit (by transforming from domain to range of y axis using yScale)
                });
    
            //labeling customisation
            svg.selectAll("text")
                .data(dataset) //for each value in the dataset
                .enter()
                .append("text")
                .text(function (d){
                    return d; //print the value in the dataset that each bar demonstrate
                })
                .attr("x", function(d, i){
                    return xScale(i)+ xScale.bandwidth()/2 - 6; //x position of the bar + half of the bar's width - 6 to make the labels at the horizontal center of the bar
                })
                .attr("y", function(d){
                    return h - d * yScale.bandwidth(); //on top of the y position of the bar
                });
    
}

window.onload = init;