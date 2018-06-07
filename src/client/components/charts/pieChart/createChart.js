const createChart = (height, width, margin, d3, channelTypeRevenues, node, radius) => {
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2},${150})`);
  const format = d3.format(',d');

  const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#ff8c00', '#6b486b', '#d0743c']);

  const pie = d3.pie()
    .sort(null)
    .value(d => (d.GrossRevenue));

  const path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const pieTween = b => {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return t => (path(i(t)));
  };
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('display', 'inline-block')
    .style('padding', '10px')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('color', 'white');

  const g = svg.selectAll('.arc')
    .data(pie(channelTypeRevenues))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .on('mouseover', d => {
      tooltip
        .style('opacity', 1)
        .text(`NR = $${format(d.data.NetRevenue)}`);
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


  g.append('path')
    .attr('d', path)
    .attr('fill', d => (color(d.data.ChannelType)))
    .transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .attrTween('d', pieTween);

  const legend = svg.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'end')
    .attr('transform', `translate(${-60},${-70})`)
    .selectAll('g')
    .data(channelTypeRevenues)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  legend.append('rect')
    .attr('x', width)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', d => color(d.ChannelType));

  legend.append('text')
    .attr('x', width - 4)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d.ChannelType);
}
export default createChart;
