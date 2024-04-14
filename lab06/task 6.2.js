
//width and height of svg
var w = 500;
var h = 150;

var dataset = [14, 5, 26, 23, 9, 6, 17]; //a variable that hold the dataset with around 5 values under 30


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

//sort ascending
var sortBars = function() {
    //redraw rectangles in ascending order
    svg.selectAll("rect")
        .sort(function(a, b) {
            return d3.ascending(a, b);
        }) //the bars are reordered in ascending order
        .attr("x", function (d, i) {
            return xScale(i);
        }) //reordered 1st bar is placed at the leftmost position and so on
        .transition()
        .duration(2000);
}

//sort descending
var sortDescending = function() {
    svg.selectAll("rect")
        .sort(function(a, b) {
            return d3.descending(a, b);
        }) //the bars are reordered in descending order
        .attr("x", function (d, i) {
            return xScale(i);
        }) //reordered 1st bar is placed at the leftmost position and so on
        .transition()
        .duration(2000);
}

var timeClickSorting = 0; //count the time clicking the sort button
d3.select("#sort")
    .on("click", function() {
        timeClickSorting += 1; //for each time click, + 1

        //if first time click, sort in ascending order.
        //for the 2nd time clicking, sort in descending order. 
        //after sorting in descending order, if click again, sort in the ascending order, and so on.
        if (timeClickSorting%2 != 0) {
            sortBars();
        }
        else {
            sortDescending();
        }
    })

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
            .attr("fill", "grey")
            .attr("width", xScale.bandwidth()) //update the width value
            .attr("height", function(d) {
                return yScale(d);
            });

        svg.selectAll("rect")
            .on("mouseover", function(event, d) {
                d3.select(this) //when mouse over this bar, change fill color to red
                    .attr("fill", "red")
                    .transition()
                    .duration(1000);
                
                //identify the x and y positions of where the text appear
                    var xPosition = parseFloat(d3.select(this).attr("x")) + 2 * xScale.bandwidth()/5;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 3 * yScale.bandwidth();
        
                //append the text information of the value of the data into position
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .text(d);
            })
            .on("mouseout", function() {
                d3.select(this) //when mouse not over this bar, change back the fill color to grey
                    .attr("fill", "grey")
                    .transition()
                    .duration(1000);
                
                //remove the label of the bar as the mouse is not over it
                svg.selectAll("#tooltip")
                    .remove();
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
            .attr("fill", "grey")
            .attr("width", xScale.bandwidth()) //update the width value
            .attr("height", function(d) {
                return yScale(d);
            });
    });


//graph rectangular bars
svg.selectAll("rect")
    .data(dataset) //for each value in the dataset 
    .enter()
    .append("rect")
    .attr("fill", "grey")
    .on("mouseover", function(event, d) {
        d3.select(this) //when mouse over this bar, change fill color to red
            .attr("fill", "red")
            .transition()
            .duration(1000);
        
        //identify the x and y positions of where the text appear
            var xPosition = parseFloat(d3.select(this).attr("x")) + 2 * xScale.bandwidth()/5;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 3 * yScale.bandwidth();

        //append the text information of the value of the data into position
        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .text(d);
    })
    .on("mouseout", function() {
        d3.select(this) //when mouse not over this bar, change back the fill color to grey
            .attr("fill", "grey")
            .transition()
            .duration(1000);
        
        //remove the label of the bar as the mouse is not over it
        svg.selectAll("#tooltip")
            .remove();
    })
    .attr("x", function (d, i){
                return xScale(i); //positionated the x position based on the scaling of xScale
            })
    .attr("y", function(d){
        return h - yScale(d); //positionated the y position by taking: height of the svg - length of a height unit (by transforming from domain to range of y axis using yScale) * value of the item in the dataset
    })
    .attr("width", xScale.bandwidth()) //number of values in the dataset/number of item in database's width considering paddings (all via xScale)
    .attr("height", function(d) {
        return yScale(d); //height = value in the dataset * length of a height unit (by transforming from domain to range of y axis using yScale)
    });
