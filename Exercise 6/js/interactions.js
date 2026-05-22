const populateFilters = data => {
    d3.select("#filter_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", function(e, d) {
            if (!d.isActive) {
                filters_screen.forEach(filter => 
                    filter.isActive = d.id === filter.id ? true : false);
            }

            d3.selectAll("#filter_screen .filter")
                .classed("active", filter => filter.id === d.id);

            updateHistogram(d.id, data);
        });
};

const updateHistogram = (filterId, data) => {
    // Filter the raw data pool
    const updatedData = filterId === "all"
        ? data
        : data.filter(d => d.screenTech === filterId);

    // Generate bins
    const updatedBins = binGenerator(updatedData);

    // Recalculate Y scale
    const binsMaxLength = d3.max(updatedBins, d => d.length) || 0;
    yScale.domain([0, binsMaxLength]).nice();

    // Update Y-axis
    d3.select(".y-axis")
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale).ticks(5));

    // Update Bars
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
};

const createTooltip = (data) => {
    
    const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

    tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

    tooltip.append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

const handleMouseEvents = () => {
    if (!innerChartS) return;
    
    innerChartS.selectAll("circle")
    .on("mouseenter", function(e, d) {
        d3.select(".tooltip text").text(d.screenSize);
        const cx = e.target.getAttribute("cx");
        const cy = e.target.getAttribute("cy");
        
        d3.select(".tooltip")
            .style("opacity", 1)
            .attr("transform", `translate(${cx - tooltipWidth / 2}, ${cy - tooltipHeight - 5})`);
    })
    .on("mouseleave", function() {
        d3.select(".tooltip").style("opacity", 0);
    });
};