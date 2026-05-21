const lineMargin = { top: 20, right: 40, bottom: 50, left: 60 };
const lineWidth = 500 - lineMargin.left - lineMargin.right;
const lineHeight = 300 - lineMargin.top - lineMargin.bottom;

// Bind strictly to #lineChart
const lineSvg = d3.select("#lineChart")
    .append("svg")
    .attr("width", lineWidth + lineMargin.left + lineMargin.right)
    .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)
    .append("g")
    .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(data => {
    const targetKey = "Average Price (notTas-Snowy)";
    
    data.forEach(d => {
        d.Year = +d.Year;
        d.Price = d[targetKey] === "" || d[targetKey] === undefined ? null : +d[targetKey];
    });

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, lineWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Price) * 1.1])
        .range([lineHeight, 0]);

    const lineGenerator = d3.line()
        .defined(d => d.Price !== null && !isNaN(d.Price))
        .x(d => xScale(d.Year))
        .y(d => yScale(d.Price));

    lineSvg.append("g")
        .attr("transform", `translate(0, ${lineHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    lineSvg.append("g")
        .call(d3.axisLeft(yScale));

    lineSvg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#e15759")
        .attr("stroke-width", 3)
        .attr("d", lineGenerator);
}).catch(err => console.error("Line chart data error:", err));