// Dimensions & margins
const scatterMargin = { top: 20, right: 30, bottom: 50, left: 60 };
const scatterWidth = 500 - scatterMargin.left - scatterMargin.right;
const scatterHeight = 300 - scatterMargin.top - scatterMargin.bottom;

// Bind strictly to #scatterPlot
const scatterSvg = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .append("g")
    .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`);

// Read CSV
d3.csv("data/Ex5_TV_energy.csv").then(data => {
    data.forEach(d => {
        d.star2 = +d.star2;
        d.energy_consumpt = +d.energy_consumpt;
    });

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2) + 0.5])
        .range([0, scatterWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumpt) * 1.05])
        .range([scatterHeight, 0]);

    const categories = Array.from(new Set(data.map(d => d.screen_tech)));
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(categories);

    scatterSvg.append("g")
        .attr("transform", `translate(0, ${scatterHeight})`)
        .call(d3.axisBottom(xScale).ticks(8));

    scatterSvg.append("g")
        .call(d3.axisLeft(yScale));

    scatterSvg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energy_consumpt))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screen_tech))
        .attr("opacity", 0.7);
}).catch(err => console.error("Scatter chart data error:", err));