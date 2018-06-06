
const createChart = (height, width, margin, d3, serviceTypeRevenues, node) => {
  const xScale = d3.scaleLinear().rangeRound([0, width]);
  const yScale = d3.scaleBand().rangeRound([0, height]).padding(0.1);
  const color = d3.scaleOrdinal().range(['#4676ae', '#c86677']);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left} , ${margin.top})`);

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
    .attr('width', d => (xScale(d[1]) - xScale(d[0])));

  svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${height + 5})`)
    .call(xAxis.ticks(null, 's'));

  svg.append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(0,0)')
    .call(yAxis);
};

export default createChart;
