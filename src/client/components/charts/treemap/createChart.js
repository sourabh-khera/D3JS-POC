const createChart = (height, width, margin, d3, cityRevenues, node) => {
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g');

  const fader = color => d3.interpolateRgb(color, '#fff')(0.2);
  const color = d3.scaleOrdinal(d3.schemeCategory20.map(fader));
  const format = d3.format(',d');

  const treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingInner(1);
  const root = d3.hierarchy(cityRevenues)
    .eachBefore(d => { d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.city; })
    .sum(d => d.grossRevenue)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  treemap(root);

  const cell = svg.selectAll('g')
    .data(root.leaves())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x0} , ${d.y0})`);

  cell.append('rect')
    .attr('id', d => d.data.id)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => color(d.parent.data.id));

  cell.append('clipPath')
    .attr('id', d => `clip-${d.data.id}`)
    .append('use')
    .attr('xlink:href', d => `#${d.data.id}`);

  cell.append('text')
    .attr('clip-path', d => `url(#clip-${d.data.id})`)
    .selectAll('tspan')
    .data(data => {
      if (data.data.grossRevenue > 180000) {
        return [data];
      }
      return [];
    })
    .enter()
    .append('tspan')
    .attr('x', 4)
    .attr('y', (d, i) => 13 + i * 10)
    .attr('fill', 'white')
    .text(d => d.data.city)
    .append('tspan')
    .attr('x', 4)
    .attr('y', (d, i) => 25 + i * 15)
    .attr('fill', 'white')
    .text(d => format(d.value))

  cell.append('title')
    .text(d => d.data.city+ '\n' +format(d.value));
}

export default createChart;
