export function renderScatter(data) {
  const container = d3.select('#scatterPlot');
  const containerNode = container.node();
  if (!containerNode) return;

  const width = containerNode.clientWidth - 20;
  const height = 380;
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };

  // Clear previous SVG
  container.selectAll('svg').remove();

  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);

  // Filter valid data points
  const validData = data.filter(d => !isNaN(d.energy) && !isNaN(d.stars) && d.energy > 0 && d.stars > 0);

  if (validData.length === 0) {
    container.append('p').text('No valid data to display');
    return;
  }

  const x = d3.scaleLinear()
    .domain(d3.extent(validData, d => d.stars)).nice()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(validData, d => d.energy)]).nice()
    .range([height - margin.bottom, margin.top]);

  // X Axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('fill', '#555')
    .attr('text-anchor', 'middle')
    .text('Star Rating');

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
    .text('Energy (kWh/year)');

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'd3-tooltip-scatter')
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
    .data(validData)
    .join('circle')
    .attr('cx', d => x(d.stars))
    .attr('cy', d => y(d.energy))
    .attr('r', 3.5)
    .attr('fill', '#e74c3c')
    .attr('opacity', 0.7)
    .on('mouseenter', (event, d) => {
      tooltip.style('display', 'block')
        .html(`<strong>${d.brand}</strong><br/>Stars: ${d.stars}<br/>Energy: ${d.energy.toFixed(1)} kWh/yr`);
    })
    .on('mousemove', (event) => {
      tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY + 10) + 'px');
    })
    .on('mouseleave', () => tooltip.style('display', 'none'));
}
