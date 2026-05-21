export function renderDonut(data) {
  const container = d3.select('#donutChart');
  const containerNode = container.node();
  if (!containerNode) return;

  const width = containerNode.clientWidth;
  const height = 380;
  const radius = Math.min(width, height) / 2 - 40;

  // Clear previous SVG
  container.selectAll('svg').remove();

  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // Parse data
  const parsed = data.map(d => ({
    tech: d['Screen_Tech'],
    value: +d['Mean(Labelled energy consumption (kWh/year))']
  }));

  const color = d3.scaleOrdinal()
    .domain(parsed.map(d => d.tech))
    .range(['#3498db', '#e74c3c', '#2ecc71']);

  const pie = d3.pie().value(d => d.value)(parsed);
  const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'd3-tooltip-donut')
    .style('position', 'absolute')
    .style('background', 'rgba(0,0,0,0.8)')
    .style('color', '#fff')
    .style('padding', '6px 10px')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('display', 'none');

  // Slices
  svg.selectAll('path')
    .data(pie)
    .join('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.tech))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .on('mouseenter', (event, d) => {
      tooltip.style('display', 'block')
        .html(`<strong>${d.data.tech}</strong><br/>${d.data.value.toFixed(1)} kWh/yr<br/>Percentage: ${(d.data.value / d3.sum(parsed, p => p.value) * 100).toFixed(1)}%`);
    })
    .on('mousemove', (event) => {
      tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY + 10) + 'px');
    })
    .on('mouseleave', () => tooltip.style('display', 'none'));

  // Legend
  const legend = svg.append('g')
    .attr('transform', `translate(${-(width / 2) + 20},${-(height / 2) + 20})`);

  parsed.forEach((d, i) => {
    const g = legend.append('g').attr('transform', `translate(0, ${i * 20})`);
    g.append('rect')
      .attr('width', 14)
      .attr('height', 14)
      .attr('fill', color(d.tech));
    g.append('text')
      .attr('x', 18)
      .attr('y', 11)
      .attr('font-size', '13px')
      .attr('fill', '#333')
      .text(d.tech);
  });
}
