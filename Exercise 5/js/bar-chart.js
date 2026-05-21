export function renderBar55(data) {
  const container = d3.select('#bar55Chart');
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

  // Parse data
  const parsed = data.map(d => ({
    tech: d['Screen_Tech'],
    value: +d['Mean(Labelled energy consumption (kWh/year))']
  }));

  const x = d3.scaleBand()
    .domain(parsed.map(d => d.tech))
    .range([margin.left, width - margin.right])
    .padding(0.4);

  const y = d3.scaleLinear()
    .domain([0, d3.max(parsed, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  // X Axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 45)
    .attr('fill', '#555')
    .attr('text-anchor', 'middle')
    .text('Screen Technology');

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
    .attr('class', 'd3-tooltip-bar')
    .style('position', 'absolute')
    .style('background', 'rgba(0,0,0,0.8)')
    .style('color', '#fff')
    .style('padding', '6px 10px')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('display', 'none');

  // Bars
  svg.selectAll('rect')
    .data(parsed)
    .join('rect')
    .attr('x', d => x(d.tech))
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - margin.bottom - y(d.value))
    .attr('fill', '#3498db')
    .on('mouseenter', (event, d) => {
      tooltip.style('display', 'block')
        .html(`<strong>${d.tech}</strong><br/>${d.value.toFixed(1)} kWh/yr`);
    })
    .on('mousemove', (event) => {
      tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY + 10) + 'px');
    })
    .on('mouseleave', () => tooltip.style('display', 'none'));
}
