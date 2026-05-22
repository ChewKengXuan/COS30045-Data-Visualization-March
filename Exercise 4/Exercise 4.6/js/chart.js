//Initialize the SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 1600")
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
    .attr("x", 50)
    .attr("y", (d, i) => i * 35 + 50)
    .attr("width", d => xScale(d.count))
    .attr("height", 25)
    .attr("fill", "blue");
};