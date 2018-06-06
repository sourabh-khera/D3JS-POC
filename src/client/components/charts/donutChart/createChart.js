const createChart = (height, width, margin, d3, revenueCsv, node, radius) => {
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2},${150})`);

  const arc = d3.arc()
    .innerRadius(radius - 40)
    .outerRadius(radius - 10);

  const pie = d3.pie()
    .sort(null)
    .value(d => (d.amount));

  const arcColor = d3.scaleOrdinal()
    .range(['#4676ae', '#c86677']);

  const pieTween = b => {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return t => (arc(i(t)));
  };
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
    .attr('class', 'arc');

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
    .attr('fill', 'black');
};
export default createChart;
