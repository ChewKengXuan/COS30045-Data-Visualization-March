const donutWidth = 450;
const donutHeight = 300;
const radius = Math.min(donutWidth, donutHeight) / 2 - 20;

// Bind strictly to #donutChart
const donutSvg = d3.select("#donutChart")
    .append("svg")
    .attr("width", donutWidth)
    .attr("height", donutHeight)
    .append("g")
    .attr("transform", `translate(${donutWidth / 2}, ${donutHeight / 2})`);

d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
    // Target exact string format key matching CSV header literal
    const valKey = "Mean(Labelled energy consumption (kWh/year))";
    data.forEach(d => d.value = +d[valKey]);

    const colorScale = d3.scaleOrdinal(d3.schemePastel1).domain(data.map(d => d.Screen_Tech));
    const pieGenerator = d3.pie().value(d => d.value).sort(null);
    
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.55)
        .outerRadius(radius)
        .padAngle(0.03);

    const labelArc = d3.arc().innerRadius(radius * 0.75).outerRadius(radius * 0.75);

    const arcs = donutSvg.selectAll(".arc")
        .data(pieGenerator(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.Screen_Tech))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px");

    arcs.append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.data.Screen_Tech);
}).catch(err => console.error("Donut chart data error:", err));