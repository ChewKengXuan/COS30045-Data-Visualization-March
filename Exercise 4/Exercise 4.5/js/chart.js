// 1. Initialize the SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid #ccc");

// 2. This function runs AFTER data loads
const createBarChart = data => {
  
  // Create a scale so the longest bar fits comfortably within the 1200px width
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
    // Position each bar vertically based on its index in the array
    .attr("x", 50) // 50px padding from the left edge
    .attr("y", (d, i) => i * 35 + 50) // 35px spacing per bar + 50px top padding
    // Use the scale to convert the numeric 'count' to a pixel width
    .attr("width", d => xScale(d.count))
    .attr("height", 25) // Thickness of the bars
    .attr("fill", "blue");
};