
const createChart = (height, width, margin, d3, serviceTypeRevenues, node) => {
  const xScale = d3.scaleLinear().rangeRound([0, width]);
  const yScale = d3.scaleBand().rangeRound([0, height]).padding(0.1);
  const color = d3.scaleOrdinal().range(['#1f78b5', '#c86677']);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left} , ${margin.top})`);

  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('display', 'inline-block')
    .style('padding', '10px')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('color', 'white')
    .style('font-size', '11px');


  const stack = d3.stack()
    .keys(['GrossRevenue', 'NetRevenue'])
    .offset(d3.stackOffsetNone);

  const layers = stack(serviceTypeRevenues);
  yScale.domain(serviceTypeRevenues.map(d => (d.ServiceType)));
  xScale.domain([0, d3.max(serviceTypeRevenues, d => (d.GrossRevenue))]).nice();

  const layer = svg.selectAll('.layer')
    .data(layers)
    .enter().append('g')
    .attr('class', 'layer')
    .style('fill', (d, i) => (color(i)));

  layer.selectAll('rect')
    .data(d => (d))
    .enter().append('rect')
    .attr('y', d => (yScale(d.data.ServiceType)))
    .attr('x', d => (xScale(d[0])))
    .attr('height', yScale.bandwidth())
    .attr('width', d => (xScale(d[1]) - xScale(d[0])))
    // .on('mouseover', d => {
    //   tooltip
    //     .style('opacity', 1)
    //     .text(data[]);
    // })
    // .on('mousemove', () => {
    //   tooltip
    //     .style('left', `${d3.event.pageX}px`)
    //     .style('top', `${d3.event.pageY - 40}px`);
    // })
    // .on('mouseout', () => {
    //   tooltip
    //     .style('opacity', 0);
    // });

  svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${height + 5})`)
    .call(xAxis.ticks(null, 's'))
    .selectAll('text')
    .attr('transform', 'rotate(-60)')
    .attr('dx', '-.8em')
    .attr('dy', '.25em')
    .attr('text-anchor', 'end');

  svg.append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(0,0)')
    .call(yAxis);

  const legend = svg.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'end')
    .attr('transform', `translate(0, ${150})`)
    .selectAll('g')
    .data(['Gross Revenue', 'Net Revenue'])
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0,${i * 20})`);

  legend.append('rect')
    .attr('x', width)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', (d, i) => (color(i)));

  legend.append('text')
    .attr('x', width - 4)
    .attr('fill', 'white')
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d);
};

export default createChart;
