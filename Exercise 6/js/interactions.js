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
    // 1. Filter the raw data pool 
    const updatedData = filterId === "all"
        ? data
        : data.filter(d => d.screenTech === filterId);

    // 2. Generate bins using the global generator 
    const updatedBins = binGenerator(updatedData);

    // 3. Recalculate Y scale dynamically based on the filtered maximum frequency
    const binsMaxLength = d3.max(updatedBins, d => d.length) || 0;
    yScale.domain([0, binsMaxLength]).nice();

    // 4. Update Y-axis visual ticks alongside the bars
    d3.select(".y-axis")
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale).ticks(5));

    // 5. Animate the bars smoothly
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
};