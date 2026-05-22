const drawScatterPlot = (data) => {
    // 1. Properly append the SVG canvas container
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // 2. Assign the inner group to your global variable
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. Explicitly compute extents from raw data fields 
    const maxEnergy = d3.max(data, d => d.energyConsumption) || 1800;
    const maxStar = d3.max(data, d => d.star) || 10;

    // 4. Configure your dedicated global scales
    xScaleS
        .domain([0, maxEnergy])
        .range([0, innerWidth]);

    yScaleS
        .domain([0, maxStar])
        .range([innerHeight, 0])
        .nice();

    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    // 5. Render scatter plot marks mapping data entries to circles
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("cx", d => xScaleS(d.energyConsumption))
            .attr("cy", d => yScaleS(d.star))
            .attr("r", 5)
            .attr("fill", d => colorScale(d.screenTech))
            .attr("opacity", 0.7);

    // 6. Draw X-Axis
    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    svg
        .append("text")
        .text("Labeled Energy Consumption (KWh/Year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");
    
    // 7. Draw Y-Axis
    innerChartS
        .append("g")
        .call(d3.axisLeft(yScaleS));

    svg
        .append("text")
        .text("Star Rating")
        .attr("x", 20)
        .attr("y", 20)
        .attr("class", "axis-label")
        .attr("transform", "rotate(0)");
};