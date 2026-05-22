//Initialize the SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid #ccc");

const createBarChart = data => {
  
  // Create scale
  const maxCount = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, maxCount])
    .range([0, 1000]); // Leaves a 200px margin on the right

  // Bind data and render the rectangles
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 50) 
    .attr("y", (d, i) => i * 35 + 50) 
    .attr("width", d => xScale(d.count))
    .attr("height", 25)
    .attr("fill", "blue");
};