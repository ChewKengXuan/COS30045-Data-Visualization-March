const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");
    svg.append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 25)
    .attr("width", d => yourScale(d.count))
    .attr("height", 20)
    .attr("fill", "blue");

const createBarChart = data => {
  svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
     return `bar bar-${d.count}`;
    })
};