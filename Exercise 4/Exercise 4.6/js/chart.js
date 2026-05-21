const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 700")
    .style("border", "1px solid black");

const createBarChart = data => {

svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
     return `bar bar-${d.count}`;
    })
}
const xScale = d3.scaleLinear()
  .domain([0, 1310])
  .range([0, 500]);

const yScale = d3.scaleBand()
 .domain(data.map(d => d.brand))
 .range([0, 500]);
window.createBarChart = createBarChart;
