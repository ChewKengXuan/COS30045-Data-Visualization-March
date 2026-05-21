export function renderLine(data) {
  const container = d3.select('#lineChart');
  const containerNode = container.node();
  if (!containerNode) return;

  const width = containerNode.clientWidth - 20;
  const height = 380;
  const margin = { top: 20, right: 20, bottom: 60, left: 70 };

  // Clear previous SVG
  container.selectAll('svg').remove();

  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);

  // Parse data - use average price
  const parsed = data
    .map(d => ({
      year: +d.Year,
      avg: +d['Average Price (notTas-Snowy)']
    }))
    .filter(d => !isNaN(d.avg) && d.avg > 0);

  if (parsed.length === 0) {
    container.append('p').text('No valid data to display');
    return;
  }

  const x = d3.scaleLinear()
    .domain(d3.extent(parsed, d => d.year))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(parsed, d => d.avg)]).nice()
    .range([height - margin.bottom, margin.top]);

  // X Axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format('d')))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 45)
    .attr('fill', '#555')
    .attr('text-anchor', 'middle')
    .text('Year');

  // Y Axis
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(height / 2))
    .attr('y', -50)
    .attr('fill', '#555')
    .attr('text-anchor', 'middle')
    .text('Price ($/MWh)');

  // Line function
  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.avg));

  // Line path
  svg.append('path')
    .datum(parsed)
    .attr('fill', 'none')
    .attr('stroke', '#2c3e50')
    .attr('stroke-width', 2.5)
    .attr('d', line);

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'd3-tooltip-line')
    .style('position', 'absolute')
    .style('background', 'rgba(0,0,0,0.8)')
    .style('color', '#fff')
    .style('padding', '6px 10px')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('display', 'none');

  // Points
  svg.selectAll('circle')
    .data(parsed)
    .join('circle')
    .attr('cx', d => x(d.year))
    .attr('cy', d => y(d.avg))
    .attr('r', 3.5)
    .attr('fill', '#2c3e50')
    .on('mouseenter', (event, d) => {
      tooltip.style('display', 'block')
        .html(`<strong>${d.year}</strong><br/>Average: $${d.avg.toFixed(2)}/MWh`);
    })
    .on('mousemove', (event) => {
      tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY + 10) + 'px');
    })
    .on('mouseleave', () => tooltip.style('display', 'none'));
}
