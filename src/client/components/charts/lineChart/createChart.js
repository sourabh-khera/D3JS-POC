const createChart = (height, width, margin, d3, channelTypeRevenues, node) => {
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left} , ${margin.right})`);
  const xScale = d3.scaleBand().rangeRound([0, width]);
  const yScale = d3.scaleLinear().range([height, 0]);
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('display', 'inline-block')
    .style('padding', '10px')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('color', 'white')
    .style('font-size', '9px');
  const format = d3.format(',d');

  yScale.domain([0, d3.max(channelTypeRevenues, d => d.NetRevenue)]);
  xScale.domain(channelTypeRevenues.map(d => d.ChannelType));

  const line = d3.line()
    .x(d => xScale(d.ChannelType))
    .y(d => yScale(d.NetRevenue));

  svg.selectAll('dot')
    .data(channelTypeRevenues)
    .enter()
    .append('circle')
    .attr('r', 3.5)
    .attr('cx', d => xScale(d.ChannelType))
    .attr('cy', d => yScale(d.NetRevenue))
    .on('mouseover', d => {
      tooltip
        .style('opacity', 1)
        .text(`${d.ChannelType} = $${format(d.NetRevenue)}`);
    })
    .on('mousemove', () => {
      tooltip
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY - 40}px`);
    })
    .on('mouseout', () => {
      tooltip
        .style('opacity', 0);
    });

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));
  svg.append('g')
    .call(d3.axisLeft(yScale).ticks(null, 's'))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Net Revenue');

  svg.append('path')
    .datum(channelTypeRevenues)
    .attr('fill', 'none')
    .attr('stroke', '#98abc5')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line);
};

export default createChart;
