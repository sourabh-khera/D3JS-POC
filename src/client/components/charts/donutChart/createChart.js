const createChart = (height, width, margin, d3, revenueCsv, node, radius) => {
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2},${150})`);
  const format = d3.format(',d');

  const arc = d3.arc()
    .innerRadius(radius - 40)
    .outerRadius(radius - 10);

  const pie = d3.pie()
    .sort(null)
    .value(d => (d.amount));

  const arcColor = d3.scaleOrdinal()
    .range(['#1f78b5', '#c86677']);

  const pieTween = b => {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return t => (arc(i(t)));
  };
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('display', 'inline-block')
    .style('padding', '10px')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('color', 'white')
    .style('font-size', '11px');

  const leftArc = d3.arc()
    .innerRadius(radius - -10)
    .outerRadius(radius - -10);

  revenueCsv.forEach(row => {
    row.amount = +row.amount;
    row.revenueType = row.revenueType;
  });
  const g = svg.selectAll('.arc')
    .data(pie(revenueCsv))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .on('mouseover', d => {
      tooltip
        .style('opacity', 1)
        .text(`GrossRevenue = $${format(d.data.amount)}`);
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
    .attr('d', arc)
    .attr('fill', d => (arcColor(d.data.revenueType)))
    .transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .attrTween('d', pieTween);

  g.append('text')
    .attr('transform', d => (`translate(${leftArc.centroid(d)})`))
    .attr('dy', '.35em')
    .style('text-anchor', 'middle')
    .text(d => (d.data.revenueType))
    .attr('fill', 'white');
};
export default createChart;
