
//width and height of svg
var w = 500;
var h = 150;

var dataset = [14, 5, 26, 23, 9, 6, 17]; //a variable that hold the dataset with around 5 values under 30

var lightness = 70; //the default lightness of the color of the rectangular bars

var maxValue = 27; //the values of the updated dataset must be below 25

//create an ordinal scaleable x-axis based on the range of the data set
var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length)) //from 0 to 7
                .range([0,w]) //from 0 to width of the svg
                .paddingInner(0.05); //adding padding for spacing and make sure every bands are inside the svg

//create an ordinal scaleable y-axis based on the item values in the data set
var yScale = d3.scaleBand()
                .domain(d3.range(0, d3.max(dataset)+1)) //from 0 to the highest value in the dataset
                .range([0,h]) //from 0 to height of the svg
                .paddingInner(0.1); //adding padding for spacing and make sure every bands are inside the svg

//add a new variable svg to create an svg screen with a width and a height
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


//when button add is clicked on call this action
d3.select("#add")
    .on("click", function() {
        //randomise the 1 data added into the dataset
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    
        xScale.domain(d3.range(dataset.length)); //update the xScale as number of elements change 
    
        //select the existing chart to a new var and rebond the existing one to it
        var bars = svg.selectAll("rect")
                        .data(dataset);
    
        var labels = svg.selectAll("text")
                        .data(dataset);

        //add a bar and update the bar chart
        bars.enter() //add extra new elements if required
            .append("rect") //creates the new rectange
            .attr("x", w) //specifying start x and y values before the merge to make the transition smoother
            .attr("y", function(d) {
                return h - yScale(d);
            }) //specifying start x and y values before the merge to make the transition smoother
            .merge(bars) //actually integrate the bars in with the other existing bars
            .transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            }) //update the x value
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("fill", function(d){
                return "hsl(40, 100%, " + (lightness - d) +  "% )"; //color customisation: the orange's lightness is depended on the value in the dataset: the larger the value, the less light the orange
            })
            .attr("width", xScale.bandwidth()) //update the width value
            .attr("height", function(d) {
                return yScale(d);
            });

        //add and update the labels of the bands
        labels.enter() //add extra new elements if required
            .append("text") //creates the new text box
            .attr("x", w) //specifying start x and y values before the merge to make the transition smoother
            .attr("y", function(d) {
                return h - yScale(d);
            }) //specifying start x and y values before the merge to make the transition smoother
            .merge(labels) //actually integrate the labels in with the other existing bars' label
            .transition() //allow transition
            .duration(500)
            .text(function (d){
                return d; //print the value in the dataset that each bar demonstrate
            })
            .attr("x", function(d, i) {
                return xScale(i)+ xScale.bandwidth()/2 - 6; //x position of the bar + half of the bar's width - 6 to make the labels at the horizontal center of the bar
            })
            .attr("y", function(d){
                return h - yScale(d); //print the text on top of the band
            });
});

//when button remove is clicked on call this action
d3.select("#remove")
    .on("click", function() {
        dataset.shift(); //remove the first element of the array

        xScale.domain(d3.range(dataset.length)); //update the xScale as number of elements change  
    
        //select the existing chart to a new var and rebond the existing one to it
        var bars = svg.selectAll("rect")
                        .data(dataset);
    
        var labels = svg.selectAll("text")
                        .data(dataset);

        //remove bars to the right
        bars.exit() //transit the element to the right
            .transition()
            .duration(500)
            .attr("x", w) //transit to .attr("x", w)
            .remove(); //take the element from the DOM

        //scale again removed bars
        bars.transition()
            .attr("x", function(d, i) {
                return xScale(i);
            }) //update the x value
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("fill", function(d){
                return "hsl(40, 100%, " + (lightness - d) +  "% )"; //color customisation: the orange's lightness is depended on the value in the dataset: the larger the value, the less light the orange
            })
            .attr("width", xScale.bandwidth()) //update the width value
            .attr("height", function(d) {
                return yScale(d);
            });

        //remove labels of the removed bars to the right
        labels.exit() //transit the element to the right
            .transition()
            .duration(500)
            .attr("x", w) //transit to .attr("x", w)
            .remove(); //take the element from the DOM

        //scale again removed labels
        labels.transition() //allow transition
            .duration(500)
            .text(function (d){
                return d; //print the value in the dataset that each bar demonstrate
            })
            .attr("x", function(d, i) {
                return xScale(i)+ xScale.bandwidth()/2 - 6; //x position of the bar + half of the bar's width - 6 to make the labels at the horizontal center of the bar
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