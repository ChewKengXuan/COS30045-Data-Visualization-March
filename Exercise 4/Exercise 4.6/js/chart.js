//Initialize the SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 700 1600") // Increased width slightly to ensure labels aren't clipped
    .style("border", "1px solid black");

const createBarChart = data => {
  
  const xScale = d3.scaleLinear()
    .domain([0, 1310])
    .range([0, 500]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500]);

  // Bind data and render the rectangles
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 120) // Pushed bars to the right to make room for brand labels on the left
    .attr("y", (d, i) => i * 35 + 50)
    .attr("width", d => xScale(d.count))
    .attr("height", 25)
    .attr("fill", "blue");

//Add x-axis labels
  svg
    .selectAll(".brand-label")
    .data(data)
    .join("text")
    .attr("class", "brand-label")
    .attr("x", 110) // Positioned just to the left of the bars (x = 120)
    .attr("y", (d, i) => i * 35 + 50 + 17) // i * 35 + 50 (bar top) + 17 (halfway down the 25px bar height + font adjustment)
    .attr("text-anchor", "end") // Right-aligns text to the edge of the bar
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .text(d => d.brand);

  //Add y-axis labels
  svg
    .selectAll(".value-label")
    .data(data)
    .join("text")
    .attr("class", "value-label")
    .attr("x", d => 120 + xScale(d.count) + 8) // Bar start position + bar width + 8px spacing
    .attr("y", (d, i) => i * 35 + 50 + 17) // Centered vertically with the bar
    .attr("text-anchor", "start") // Left-aligns the text numbers
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .text(d => d.count);
};