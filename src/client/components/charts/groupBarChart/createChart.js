const createChart = (height, width, margin, d3, Transactions, node) => {
  const keys = [];
  Transactions.map(item => {
    for (let key in item) {
      if (key !== 'type') keys.push(key);
    }
  })
  const svgNode = node;
  const svg = d3.select(svgNode)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left} , ${margin.top})`);

  const format = d3.format(',d');

  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('display', 'inline-block')
    .style('padding', '10px')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('color', 'white');

  const x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

  const x1 = d3.scaleBand()
    .padding(0.05);

  const y = d3.scaleLinear()
    .rangeRound([height, 0]);

  const z = d3.scaleOrdinal()
    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  x0.domain(Transactions.map(d => d.type));
  x1.domain(keys).rangeRound([1, x0.bandwidth()]);
  y.domain([0, d3.max(Transactions, d => d3.max(keys, key => d[key]))]).nice();

  svg.append('g')
    .selectAll('g')
    .data(Transactions)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
      if (i === 0) {
        return `translate(${40}, 0)`;
      }
      return `translate(${130}, 0)`;
    })
    .selectAll('rect')
    .data(d => {
      const updatedData = [];
      for (let key in d) {
        if (key !== 'type') updatedData.push({ key: key, value: d[key]});
      }
      return updatedData;
    })
    .enter()
    .append('rect')
    .attr('x', d => x1(d.key))
    .attr('y', d => y(d.value))
    .attr('width', x1.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', d => z(d.key))
    .on('mouseover', d => {
      tooltip
        .style('opacity', 1)
        .text(`Transactions = ${format(d.value)}`);
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
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x0));

  svg.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y).ticks(null, 's'))
    .append('text')
    .attr('x', 20)
    .attr('y', y(y.ticks().pop()) - 15)
    .attr('dy', '0.32em')
    .attr('fill', '#000')
    .attr('font-weight', 'bold')
    .attr('text-anchor', 'start')
    .text('Transactions');

  const legend = svg.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'end')
    .attr('transform', (d, i) => `translate(${10}, ${20})`)
    .selectAll('g')
    .data(keys.slice())
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  legend.append('rect')
    .attr('x', width)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', z);

  legend.append('text')
    .attr('x', width - 4)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d);
};

export default createChart;
