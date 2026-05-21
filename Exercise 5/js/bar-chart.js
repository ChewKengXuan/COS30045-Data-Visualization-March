const barMargin = { top: 20, right: 30, bottom: 50, left: 60 };
const barWidth = 500 - barMargin.left - barMargin.right;
const barHeight = 300 - barMargin.top - barMargin.bottom;

// Bind strictly to #bar55Chart
const barSvg = d3.select("#bar55Chart")
    .append("svg")
    .attr("width", barWidth + barMargin.left + barMargin.right)
    .attr("height", barHeight + barMargin.top + barMargin.bottom)
    .append("g")
    .attr("transform", `translate(${barMargin.left}, ${barMargin.top})`);

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
    const valKey = "Mean(Labelled energy consumption (kWh/year))";
    data.forEach(d => d.value = +d[valKey]);

    // Enforce sorting layout order execution
    data.sort((a, b) => b.value - a.value);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, barWidth])
        .padding(0.4);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.1])
        .range([barHeight, 0]);

    barSvg.append("g")
        .attr("transform", `translate(0, ${barHeight})`)
        .call(d3.axisBottom(xScale));

    barSvg.append("g")
        .call(d3.axisLeft(yScale));

    barSvg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => barHeight - yScale(d.value))
        .attr("fill", "#4e79a7")
        .attr("rx", 2);

    barSvg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 6)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .text(d => `${Math.round(d.value)}`);
}).catch(err => console.error("Bar chart data error:", err));